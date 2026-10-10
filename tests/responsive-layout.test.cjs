const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const script = fs.readFileSync(path.join(__dirname, '../assets/js/app.js'), 'utf8');
function functionSource(name) {
  const start = script.indexOf(`function ${name}(`);
  const end = script.indexOf('\nfunction ', start + 1);
  assert.ok(start >= 0, `${name} exists`);
  return script.slice(start, end);
}
function harness(layout = 'compact') {
  const elements = new Map();
  const document = { activeElement: null, getElementById: id => elements.get(id) };
  function element(id) {
    const classes = new Set();
    const node = { id, attrs: {}, hidden: false, inert: false, dataset: {},
      classList: { toggle(name, active) { if (active) classes.add(name); else classes.delete(name); }, contains: name => classes.has(name) },
      setAttribute(name, value) { this.attrs[name] = value; },
      contains(other) { return other === this || other?.parent === this; },
      focus() { document.activeElement = this; },
    };
    elements.set(id, node);
    return node;
  }
  const shell = element('section-mapa');
  const mapStage = element('mapStage');
  const mapElement = element('map');
  mapStage.contains = node => node?.id.startsWith('toggle');
  mapStage.querySelector = () => mapElement;
  for (const name of ['filters', 'results']) {
    const panel = element(`${name}Sidebar`);
    const close = element(`${name}Close`);
    close.parent = panel;
    panel.close = close;
    element(`toggle${name === 'filters' ? 'Filters' : 'Results'}Panel`);
  }
  document.querySelector = selector => elements.get(selector.split(' ')[0].slice(1)).close;
  const state = { layoutStyle: layout, openMapPanel: null, activeTypes: new Set([1, 4]), currentPeriod: 27 };
  const context = vm.createContext({ document, state, dom: { 'section-mapa': shell, mapStage }, window: { requestAnimationFrame: fn => fn() }, renderVirtualRows() {}, mapIsFullscreen: () => false });
  vm.runInContext(['layoutStyleForViewport', 'syncMapPanels', 'setMapPanel'].map(functionSource).join('\n'), context);
  return { context, state, elements, document };
}

test('width and height both select usable layouts, including browser zoom equivalents', () => {
  const { context } = harness();
  for (const [width, height, expected] of [
    [1920,1080,'wide'], [1600,900,'wide'],
    [1366,768,'intermediate'], [1280,720,'intermediate'],
    [1536,864,'intermediate'], [1920,800,'intermediate'],
    [1024,768,'compact'], [1366,620,'compact'], [960,540,'compact'], [390,844,'compact'],
  ]) assert.equal(context.layoutStyleForViewport(width, height), expected, `${width}x${height}`);
});
test('compact panels open individually and remain inaccessible while closed', () => {
  const h = harness();
  h.context.syncMapPanels();
  assert.equal(h.elements.get('filtersSidebar').hidden, true);
  assert.equal(h.elements.get('resultsSidebar').inert, true);
  h.context.setMapPanel('filters');
  assert.equal(h.elements.get('filtersSidebar').hidden, false);
  assert.equal(h.elements.get('toggleFiltersPanel').attrs['aria-expanded'], 'true');
  assert.equal(h.document.activeElement.id, 'filtersClose');
  h.context.setMapPanel('results');
  assert.equal(h.elements.get('filtersSidebar').inert, true);
  assert.equal(h.elements.get('resultsSidebar').hidden, false);
  assert.equal(h.document.activeElement.id, 'resultsClose');
});
test('closing a drawer restores focus without losing filter or period state', () => {
  const h = harness();
  const selection = h.state.activeTypes;
  h.context.setMapPanel('filters');
  h.context.setMapPanel(null, true);
  assert.equal(h.document.activeElement.id, 'toggleFiltersPanel');
  assert.equal(h.state.activeTypes, selection);
  assert.equal(h.state.currentPeriod, 27);
  assert.equal(h.elements.get('filtersSidebar').hidden, true);
});
test('returning to wide layout exposes the same panels and selections', () => {
  const h = harness('intermediate');
  h.context.syncMapPanels();
  assert.equal(h.elements.get('filtersSidebar').hidden, false);
  assert.equal(h.elements.get('resultsSidebar').hidden, true);
  h.state.layoutStyle = 'wide';
  h.context.syncMapPanels();
  assert.equal(h.elements.get('resultsSidebar').hidden, false);
  assert.equal(h.elements.get('resultsSidebar').inert, false);
  assert.equal(h.elements.get('filtersSidebar').classList.contains('is-drawer'), false);
  assert.deepEqual([...h.state.activeTypes], [1,4]);
});
test('map buttons and wheel use quarter zoom increments', () => {
  const start = script.indexOf('const map = L.map(');
  const end = script.indexOf('\n});', start) + 4;
  let options;
  vm.runInNewContext(script.slice(start, end), { L: { map: (id, config) => { options = config; } }, mapRenderer: {} });
  assert.equal(options.zoomDelta, .25);
  assert.equal(options.zoomSnap, .25);
  assert.equal(options.wheelPxPerZoomLevel, 240);
});
