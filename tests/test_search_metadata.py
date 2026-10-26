import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://leoneldfernandes.github.io/desastres-no-brasil/"


class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.in_title = False
        self.title = ""
        self.canonical = []
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "head":
            self.in_head = True
        if not self.in_head:
            return
        if tag == "title":
            self.in_title = True
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonical.append(attrs.get("href"))
        if tag == "meta" and attrs.get("name"):
            self.meta.setdefault(attrs["name"].lower(), []).append(attrs.get("content", ""))

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "head":
            self.in_head = False

    def handle_data(self, data):
        if self.in_head and self.in_title:
            self.title += data


def read_head(path):
    parser = HeadParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class SearchMetadataTests(unittest.TestCase):
    def test_canonical_and_sitemap_use_only_the_main_public_address(self):
        head = read_head(ROOT / "index.html")
        self.assertEqual(head.canonical, [SITE_URL])
        tree = ElementTree.parse(ROOT / "sitemap.xml")
        namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        self.assertEqual(tree.getroot().tag, namespace + "urlset")
        urls = tree.findall(namespace + "url")
        self.assertEqual(len(urls), 1)
        locations = tree.findall(".//" + namespace + "loc")
        self.assertEqual([loc.text for loc in locations], head.canonical)
        for loc in locations:
            parsed = urlsplit(loc.text)
            self.assertEqual(parsed.scheme, "https")
            self.assertFalse(parsed.query or parsed.fragment)
        self.assertFalse(tree.findall(".//" + namespace + "lastmod"))

    def test_search_snippet_has_one_description_and_unambiguous_robots_rule(self):
        head = read_head(ROOT / "index.html")
        self.assertTrue(head.title.startswith("Desastres no Brasil | "))
        self.assertEqual(len(head.meta.get("description", [])), 1)
        description = head.meta["description"][0]
        for subject in ("Atlas Digital", "ocorrências", "danos humanos", "prejuízos econômicos", "município"):
            self.assertIn(subject, description)
        self.assertEqual(len(head.meta.get("google-site-verification", [])), 1)
        self.assertRegex(head.meta["google-site-verification"][0], r"^[A-Za-z0-9_-]{20,}$")
        self.assertEqual(len(head.meta.get("robots", [])), 1)
        # A liberação autorizada troca somente noindex por index; regras conflitantes falham.
        self.assertIn(head.meta["robots"][0], ("noindex, follow", "index, follow"))

    def test_layout_preview_stays_out_of_search_results(self):
        preview = read_head(ROOT / "docs" / "preview-layout.html")
        self.assertEqual(len(preview.meta.get("robots", [])), 1)
        self.assertIn("noindex", preview.meta["robots"][0].split(", "))


if __name__ == "__main__":
    unittest.main()
