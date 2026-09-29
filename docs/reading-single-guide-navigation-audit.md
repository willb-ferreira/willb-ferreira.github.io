# Reading guides — single-topic navigation audit

Date: 2026-09-29. Scope: only navigation and presentation on `reading.html`; **no research prose, bibliographic records, project filters, personal academic metadata, student/course data or guide ordering is modified**. All six already-merged three-route guides and their original IDs and selected source lists remain in place.

## Design and behaviour

The former page rendered six full guides vertically in one continuous document. The sidebar was only a scrolling index, so reading guides 05–06 required moving far from the page's introduction. The updated page keeps the same heading, note, articles, titles, `NN / 06 · Research library` indicator, reference lists and cross-guide links. It presents exactly **one active article at a time**:

- Desktop: a narrow, sticky `reading-index` rail with six area names and an accessible current-location marker. The rail can scroll internally on short screens; the **article itself uses normal page scrolling**, with no nested reading scrollbars or forced viewport-height panels.
- Mobile and tablet at ≤840px: the rail becomes a labelled native `select` above the article. The select reflects the active guide across language changes, direct links and history navigation.
- A compact previous/next bar follows the active guide. On the first/last guide, the unavailable direction is omitted rather than being a fake link. The guide's pre-existing top-left `NN / 06 · Research library` indicator remains the sole section counter.
- The currently selected guide is the only visible and accessibility-exposed `article.reading-area`; the other five retain their complete DOM/source records behind the native `hidden` attribute. A visually hidden live status announces area changes to assistive technologies.

## URL and keyboard semantics

All original anchors remain stable: `#spatial-models`, `#theory`, `#sar`, `#regression`, `#geometry`, `#causal`; legacy `#time-series`; and deep links such as `#inference-ref-pardo-2006` or `#geometry-ref-menendez-morales-pardo-salicru-1995`. Selecting an area changes `location.hash`, so browser back/forward works. A direct URL to a reference or track reveals its parent guide and scrolls to the named element after it becomes visible. A link between guides performs the same operation without page reload. Ordinary `#main` skip navigation and the existing `#top` back-to-guide-start link retain their native meaning.

The sidebar uses actual links, `aria-current="location"` and per-guide `aria-controls`; the mobile control is a labelled native select; pagination uses links. When a cross-guide link is activated *inside* a guide that will become hidden, focus transfers to the newly active guide's heading without creating a focus trap. When the user activates the sidebar or the mobile selector, those controls retain focus. These are navigation changes only; the selected guide's reference links and three internal study routes remain unchanged.

## Implementation and testing

- `assets/app.js` owns the selected-guide state and changes to `hashchange`. It uses the same guide renderers and applies `hidden` to non-selected articles. Language switches rebuild the existing page while retaining selection; no new browser storage or dependency is added.
- `assets/site.css` adds scoped rail, native mobile picker and pager styles at the end of the stylesheet. The previous general guide styles still render articles. No extra animations, third-party libraries or image assets are introduced.
- `scripts/test_site.py` verifies one visible article out of six, current nav marker, all 18 research tracks and 45 reference records preserved, active sidebar links, previous/next endpoints, two-way guide links, deep-link source selection, legacy `#time-series`, browser history, language switching, 390px and 320px mobile widths with no horizontal overflow, and unchanged publication/directory regressions.
- `scripts/prerender.py` remains the existing static renderer and captures the current first guide as its default page. JavaScript activates all six sections and navigates among them on the published website. At prerender time, the other guides' markup remains in the HTML document, but is marked `hidden` until selected.

**Publishing gate:** merge only after the pull-request validation succeeds. Verify the deployed GitHub Pages workflow before announcing that the live page is updated. Do not merge unrelated branches or change private scientific records as part of this UI-only change.
