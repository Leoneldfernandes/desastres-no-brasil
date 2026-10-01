const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/welcome.js'), 'utf8');
const key = 'desastres-visit-choice-v1';

class Element {
  constructor() { this.handlers = {}; this.hidden = false; this.open = false; }
  addEventListener(name, fn) { (this.handlers[name] ||= []).push(fn); }
  emit(name, event = {}) { for (const fn of this.handlers[name] || []) fn(event); }
  showModal() { this.open = true; }
  close() { this.open = false; this.emit('close'); }
  focus() { this.focused = true; }
}

function setup(options = {}) {
  const storage = new Map(Object.entries(options.storage || {}));
  const ids = ['welcomeDialog', 'openWelcome', 'acceptVisit', 'declineVisit', 'continueWelcome', 'welcomeConsent', 'welcomeNoCounter'];
  const elements = Object.fromEntries(ids.map(id => [id, new Element()]));
  const document = new Element();
  document.getElementById = id => elements[id];
  document.dispatchEvent = event => document.emit(event.type, event);
  document.visibilityState = options.visibility || 'visible';
  document.prerendering = options.prerendering || false;
  const requests = [];
  const window = new Element();
  window.VISITOR_METRICS = options.config === undefined
    ? { endpoint: 'https://example-test.goatcounter.com/count', privacySettingsVerified: true }
    : options.config;
  window.location = { hostname: options.hostname || 'leoneldfernandes.github.io' };
  window.navigator = { webdriver: options.webdriver || false };
  window.localStorage = {
    getItem: name => { if (options.brokenStorage) throw Error('unavailable'); return storage.get(name) || null; },
    setItem: (name, value) => { if (options.brokenStorage) throw Error('unavailable'); storage.set(name, value); },
  };
  window.fetch = (url, init) => {
    requests.push({ url, init });
    return options.fetchFails ? Promise.reject(Error('offline')) : Promise.resolve();
  };
  vm.runInNewContext(source, { window, document, URL, AbortController, CustomEvent: class { constructor(type, init) { this.type = type; Object.assign(this, init); } } });
  return { elements, document, window, requests, storage };
}

test('no requests before consent; accepting sends exactly one minimal request', () => {
  const s = setup();
  assert.equal(s.elements.welcomeDialog.open, true);
  assert.equal(s.requests.length, 0);
  assert.equal(s.elements.declineVisit.focused, true);
  s.elements.acceptVisit.emit('click');
  assert.equal(s.elements.welcomeDialog.open, false);
  assert.equal(s.requests.length, 1);
  const request = s.requests[0];
  const url = new URL(request.url);
  assert.deepEqual([...url.searchParams.keys()], ['p', 't', 'r', 'rnd']);
  assert.equal(url.searchParams.get('p'), '/mapa');
  assert.equal(url.searchParams.get('r'), '');
  assert.equal(request.init.credentials, 'omit');
  assert.equal(request.init.referrerPolicy, 'no-referrer');
  s.elements.openWelcome.emit('click');
  s.elements.acceptVisit.emit('click');
  s.document.emit('visibilitychange');
  assert.equal(s.requests.length, 1);
});

test('refusing and Escape allow access without counting, including subsequent visits', () => {
  const s = setup();
  s.elements.declineVisit.emit('click');
  assert.equal(s.requests.length, 0);
  const next = setup({ storage: Object.fromEntries(s.storage) });
  assert.equal(next.elements.welcomeDialog.open, false);
  assert.equal(next.requests.length, 0);
  const escaped = setup();
  let prevented = false;
  escaped.elements.welcomeDialog.emit('cancel', { preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(escaped.requests.length, 0);
  assert.equal(escaped.elements.welcomeDialog.open, false);
  assert.equal(JSON.parse(escaped.storage.get(key)).value, 'declined');
});

test('a returning accepted visitor counts once without a repeated popup', () => {
  const storage = { [key]: JSON.stringify({ value: 'accepted', at: Date.now() }), 'desastres-welcome-seen-v1': 'yes' };
  const s = setup({ storage });
  assert.equal(s.elements.welcomeDialog.open, false);
  assert.equal(s.requests.length, 1);
});

test('revoking persists refusal and aborts a pending request; reaccepting does not duplicate', () => {
  const s = setup();
  s.elements.acceptVisit.emit('click');
  s.elements.openWelcome.emit('click');
  s.elements.declineVisit.emit('click');
  assert.equal(s.requests[0].init.signal.aborted, true);
  assert.equal(JSON.parse(s.storage.get(key)).value, 'declined');
  s.elements.openWelcome.emit('click');
  s.elements.acceptVisit.emit('click');
  assert.equal(s.requests.length, 1);
});

test('missing, invalid or unverified configuration never asks consent or sends data', () => {
  for (const config of [{}, { endpoint: 'https://example-test.goatcounter.com/count', privacySettingsVerified: false }, { endpoint: 'https://attacker.test/count', privacySettingsVerified: true }]) {
    const s = setup({ config });
    assert.equal(s.elements.welcomeConsent.hidden, true);
    assert.equal(s.elements.acceptVisit.hidden, true);
    assert.equal(s.elements.continueWelcome.hidden, false);
    s.elements.continueWelcome.emit('click');
    assert.equal(s.elements.welcomeDialog.open, false);
    assert.equal(s.requests.length, 0);
    assert.equal(s.storage.has(key), false);
  }
});

test('activating metrics after the informational popup requests a new decision', () => {
  const s = setup({ storage: { 'desastres-welcome-seen-v1': 'yes' } });
  assert.equal(s.elements.welcomeDialog.open, true);
  assert.equal(s.requests.length, 0);
});

test('expired, corrupt and future choices never silently authorize', () => {
  for (const value of ['not-json', JSON.stringify({ value: 'accepted', at: Date.now() - 181 * 86400000 }), JSON.stringify({ value: 'accepted', at: Date.now() + 86400000 })]) {
    const s = setup({ storage: { [key]: value } });
    assert.equal(s.elements.welcomeDialog.open, true);
    assert.equal(s.requests.length, 0);
  }
});

test('storage failures and network failures never prevent continuing', async () => {
  const s = setup({ brokenStorage: true, fetchFails: true });
  s.elements.acceptVisit.emit('click');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(s.elements.welcomeDialog.open, false);
  assert.equal(s.requests.length, 1);
});

test('local, automated and hidden loads are not counted', () => {
  for (const options of [{ hostname: 'localhost' }, { webdriver: true }]) {
    const s = setup(options);
    s.elements.acceptVisit.emit('click');
    assert.equal(s.requests.length, 0);
  }
  const s = setup({ visibility: 'hidden', prerendering: true });
  s.elements.acceptVisit.emit('click');
  assert.equal(s.requests.length, 0);
  s.document.visibilityState = 'visible';
  s.document.prerendering = false;
  s.document.emit('prerenderingchange');
  assert.equal(s.requests.length, 1);
});

test('revocation in another tab aborts this tab; background shortcuts stop inside the dialog', () => {
  const s = setup();
  let stopped = false;
  s.document.emit('keydown', { stopPropagation: () => { stopped = true; } });
  assert.equal(stopped, true);
  s.elements.acceptVisit.emit('click');
  s.storage.set(key, JSON.stringify({ value: 'declined', at: Date.now() }));
  s.window.emit('storage', { key });
  assert.equal(s.requests[0].init.signal.aborted, true);
  s.document.emit('visibilitychange');
  assert.equal(s.requests.length, 1);
});
