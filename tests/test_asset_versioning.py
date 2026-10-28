import hashlib
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


ROOT = Path(__file__).resolve().parents[1]
VERSIONED_ASSETS = (
    "assets/js/theme.js",
    "assets/css/app.css",
    "assets/js/export.js",
    "assets/js/export-worker.js",
    "assets/js/app.js",
    "assets/js/mobile-ui.js",
    "assets/js/playback-view.js",
    "assets/js/layout-shortcuts.js",
    "assets/js/navigation.js",
    "assets/js/visitor-config.js",
    "assets/js/welcome.js",
)


class AssetReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = dict(attrs)
        if tag == "link" and attributes.get("href"):
            self.references.append(str(attributes["href"]))
        if tag == "script" and attributes.get("src"):
            self.references.append(str(attributes["src"]))
        if tag == "script" and attributes.get("data-export-worker"):
            self.references.append(str(attributes["data-export-worker"]))


class AssetVersioningTests(unittest.TestCase):
    def test_consent_actions_keep_equal_primary_choices_and_full_width_save(self) -> None:
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        actions = html.split('<div class="welcome-actions">', 1)[1].split("</div>", 1)[0]
        self.assertLess(actions.index('id="declineVisit"'), actions.index('id="acceptVisit"'))
        self.assertLess(actions.index('id="acceptVisit"'), actions.index('id="saveVisitChoice"'))
        css = (ROOT / "assets/css/app.css").read_text(encoding="utf-8")
        self.assertIn(".welcome-actions #saveVisitChoice { flex-basis: 100%; }", css)

    def test_interface_assets_use_their_content_hash(self) -> None:
        parser = AssetReferenceParser()
        parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))

        for asset in VERSIONED_ASSETS:
            with self.subTest(asset=asset):
                references = [
                    reference
                    for reference in parser.references
                    if urlsplit(reference).path == asset
                ]
                self.assertEqual(len(references), 1)

                version = parse_qs(urlsplit(references[0]).query).get("v")
                expected = hashlib.sha256((ROOT / asset).read_bytes()).hexdigest()[:12]
                self.assertEqual(version, [expected])


if __name__ == "__main__":
    unittest.main()
