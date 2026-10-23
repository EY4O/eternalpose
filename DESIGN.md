---
name: Eternal Pose
description: Looneth's project hub, drawn as a retro-OS desktop under a cathode screen where an ASCII eye turns into a compass.
colors:
  ground: "#e6e7eb"
  paper: "#f4f4f6"
  ink: "#141519"
  ink-2: "#474a53"
  ink-3: "#5c5f68"
  accent: "#ff4f00"
typography:
  display:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(4.75rem, 15.5vw, 16.5rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 52"
  headline:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 11vw, 11rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 52"
  title:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 750
    lineHeight: 1.08
    fontVariation: "\"wdth\" 75"
  title-index:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 2.6vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    fontVariation: "\"wdth\" 62"
  subtitle:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 750
    lineHeight: 1.15
    fontVariation: "\"wdth\" 80"
  lead:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "\"wdth\" 100"
  label:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.05em"
  chrome:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.06em"
  display-compact:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 24vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.8
    fontVariation: "\"wdth\" 52"
  maker:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  body-small:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  label-compact:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.02em"
spacing:
  gutter: "clamp(16px, 3vw, 40px)"
  column-gap: "clamp(12px, 2vw, 28px)"
  spread-gap: "clamp(80px, 11vw, 168px)"
  visual-gap: "clamp(36px, 5vw, 72px)"
components:
  button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0 16px"
    height: "44px"
  button-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  button-default:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0 16px"
    height: "44px"
  button-default-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  window:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  window-title-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.chrome}"
    padding: "0 8px"
    height: "1.625rem"
  index-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "16px 18px 18px"
  index-row-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  ticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "11px 0"
---

# Design System: Eternal Pose

## Overview

**Creative North Star: "The Compass on the Desktop"**

Eternal Pose is a cool grey retro-OS desktop seen through a cathode screen. Everything that holds content is a window: a paper-white pane, a 1px ink frame, a pinstriped title bar with a close box. Behind and inside those windows, living ASCII drawings in Departure Mono spell their own names: an eye in the hero that becomes a compass when a project is chosen, and one animated scene per project. Display type is Anybody squeezed to its narrowest, heaviest cut, shouting in uppercase at sizes that crowd the viewport.

The page is light, near-monochrome and dense with texture rather than color. Ink on grey does all the work; a single international orange marks the one thing that moves with intent, whether that is the compass needle, the train, the arriving book or the hat band. Layout is editorial, not a card grid. Big names, an offset reading column, and windows that overlap each other like a working desktop.

The One Piece reference stays a nod. The name and the compass carry it; the only One Piece artwork is the Straw Hat Jolly Roger in the Voyage Tracker's ASCII window, a user-approved exception.

**Key Characteristics:**
- Cool grey ground under fixed scanlines and a soft vignette.
- Retro-OS windows: square corners, 1px ink frame, pinstriped title bar, close box, optional [+] link.
- Anybody at 52% width and weight 900 for display; Departure Mono for every piece of chrome.
- ASCII canvases whose glyphs spell a per-scene word, with density choosing the glyph.
- One orange accent, reserved in the drawings for the subject that moves.
- Overlapping, alternating project spreads on a 12-column grid.

## Colors

A cool, slightly blue-grey neutral family with a single hot international-orange accent.

### Primary
- **International Orange** (accent): the compass needle's north half, Linemark's train, Model Librarian's arriving book, and the Straw Hat's band in the ASCII scenes. Outside the canvases it appears only as a fill or a stroke: button hover fill, link underlines (2px, 4px offset), the ticker's `+` separators, text selection, and the favicon needle.

### Neutral
- **Instrument Grey** (ground): the page itself, the desktop the windows sit on, and the gap ring around the default button.
- **Window Paper** (paper): window panes, title bars, the secondary button fill, the ASCII canvas background.
- **Cathode Ink** (ink): all type, every 1px frame and divider, pinstripes, the ticker band, the default button, inverted hover rows, the striped monogram, and the focus outline.
- **Graphite** (ink-2): body copy in descriptions, index one-liners and the contact note.
- **Slate** (ink-3): metadata in mono: project kind, facts lines, contact handles, the colophon. Measured 5.2:1 on ground and 5.8:1 on paper.

### Named Rules
**The Needle Rule.** In the ASCII drawings, orange marks only the subject in motion or arrival (needle north, train, arriving book, hat band, the moogle's pom-pom), and accent cells always draw at full opacity. Every other glyph is ink.

**The Orange Is Never Text Rule.** Orange on paper is 3.0:1, so orange never sets running text or labels on light grounds. It fills (with ink text on top, 5.5:1), underlines, or sits on the ink ticker.

## Typography

**Display Font:** Anybody, variable 100–900 weight and 50–150% width, self-hosted (with system-ui, sans-serif)
**Body Font:** Anybody at normal width (with system-ui, sans-serif)
**Label/Mono Font:** Departure Mono, self-hosted (with ui-monospace, monospace)

**Character:** One variable family stretched from shouting condensed caps to an ordinary reading width, paired with a pixel mono that sounds like an operating system. The width axis sets the voice: the narrower the cut, the louder the role.

### Hierarchy
- **Display** (900, clamp(4.75rem, 15.5vw, 16.5rem), 0.8, 52% width, uppercase, -0.01em): the hero name only, split into two words pinned to opposite corners (top-left, bottom-right).
- **Headline** (900, clamp(3.75rem, 11vw, 11rem), 0.8, 52% width, uppercase, -0.01em): project names that open each spread; may break anywhere.
- **Title** (750, clamp(1.5rem, 2.2vw, 2rem), 1.08, 75% width, balanced wrap): each project's one-line pitch.
- **Title, index** (800, clamp(1.625rem, 2.6vw, 2.5rem), 0.95, 62% width, uppercase): project names in the Projects window.
- **Subtitle** (750, 1.25rem, 1.15, 80% width): sub-product headings within a spread.
- **Lead** (500, clamp(1.125rem, 1.6vw, 1.375rem), 1.35, max 25ch): the hero introduction.
- **Body** (400, 1.0625rem, 1.55, 100% width): descriptions, max 46ch, pretty wrap.
- **Label** (Departure Mono, 0.8125rem, 1.3, 0.05em, uppercase): buttons, top-bar links, project kind, facts lines, ticker, contact list, colophon. Below 860px the top bar's four controls drop to 0.75rem and 0.02em so they fit one line at normal text size; they wrap to a second row when text is enlarged.
- **Maker line** (Anybody 600, 1rem): "Projects by Looneth" in the centre of the top bar, desktop only.
- **Small body** (400, 0.9375rem, 1.4–1.45): project one-liners in the Projects strip and the Contact window's note.
- **Chrome** (Departure Mono, 0.6875rem, 1, 0.06em, uppercase): window titles and the [+] control. Set in rem so it grows with the visitor's text size.

### Named Rules
**The Width Is Volume Rule.** Display and headline sit at 52% width and weight 900; titles open out to 62–80%; reading text returns to 100%. Never set a display line at normal width, and never set body condensed.

**The Mono Is Machinery Rule.** Departure Mono is for chrome, labels, buttons and ASCII glyphs only, always uppercase. Prose is never mono.

**The Bracket Rule.** Standalone navigation links and controls in the chrome are bracketed: [eternalpose.io], [GitHub], [Ko-fi], [Email], [Pause motion], [+].

## Layout

The page has four movements. The hero fills the viewport (100svh) over a full-bleed ASCII canvas. A full-width ink ticker follows, then three project spreads, then the end with the monogram.

**Hero.** A three-column top bar (wordmark left, maker centre, bracketed links and the motion toggle right) over a stage where "ETERNAL" holds the top-left and "POSE" the bottom-right, with the lead line bottom-left. The Projects window runs the full width along the bottom as a strip of three columns (the user's choice), so the needle swings far left, straight down or far right to point at each project. The eye is centred.

**Project spreads.** A 12-column grid (column gap clamp(12px, 2vw, 28px)) inside the page gutter (clamp(16px, 3vw, 40px)), separated by clamp(80px, 11vw, 168px). The headline takes columns 1–7, bottom-aligned against a side column (8–12) holding pitch, description, buttons and a facts line. Below, on a subgrid, the ASCII window spans columns 1–8 at 16:10, and a screenshot window spans 7–12, bottom-aligned, overlapping it and hanging 9% below it. Spreads alternate: the flipped spread mirrors everything (headline 5–12 right-aligned, side 1–5, ASCII 5–12, screenshot 1–6). A second, portrait screenshot drops to a new row at columns 9–12, pulled up 14% into the first.

**End.** The striped EP monogram spans the full content width, with the Contact window laid over its upper right (top 8%, width min(360px, 80vw)), then a mono colophon.

**Responsive (max-width 860px).** The top bar drops the wordmark and maker line, and its four bracketed controls spread edge to edge on one line (0.75rem, 0.02em). The Projects strip becomes stacked rows. The name grows to clamp(4.5rem, 24vw, 9rem) (the phone size of Display), and the two words are held 66vw apart so the eye sits between them; the eye recentres there with a larger radius. The lead and Projects window return to normal flow. Spreads go to one column, and the overlap is kept by offsets instead of columns: ASCII window inset 6% on the right, screenshot pulled up 9% and inset 16% on the left, portrait shot pulled up 6% and narrowed (6% left, 34% right). The Contact window rises 12% into the monogram.

### Named Rules
**The Overlap Rule.** A project's visuals are never side by side in tidy cells. The real screenshot window always overlaps its ASCII window, on the side away from the headline, and alternates spread to spread. Mobile keeps the overlap.

## Elevation & Depth

Depth is a desktop's: windows lie on the grey ground and on each other, and every window casts the same soft drop shadow. The screen overlay sits above everything. Nothing else is lifted, and no element gets a shadow on hover.

### Shadow Vocabulary
- **Window** (`box-shadow: 0 22px 44px -22px rgb(20 21 25 / 0.5), 0 3px 10px -4px rgb(20 21 25 / 0.2)`): every window, whether index, ASCII, screenshot or contact. Overlap order comes from source order and z-index 1 on screenshots.

### Named Rules
**The One Shadow Rule.** There is one shadow and it belongs to windows. Buttons, rows and text never cast one.

**The Cathode Rule.** One fixed overlay covers the viewport at z-index 40 and never takes pointer input. It carries 1px ink scanlines at 4.5% opacity every 3px and a radial vignette darkening to 10% at the edges. Scanlines are never added per component.

## Shapes

Every corner is square. The language is the 1px ink line, used for window frames, title-bar rules, close boxes, button borders, row dividers in the Projects window and the rule between sub-products. Texture comes from stripes. The title-bar pinstripes are 1px ink every 3px across a 12px band. The monogram's stripes are 7px ink and 4px gap, horizontal, on a 10×11 pattern. The only circles on the page are drawn in ASCII: eye, compass dial and stations.

### Named Rules
**The Square Corner Rule.** No radius anywhere. Windows, buttons, canvases and images all meet at right angles.

## Components

### Buttons
Classic system buttons, flat and labelled in mono.
- **Shape:** square, 1px ink border, minimum height 44px, 16px side padding.
- **Secondary:** paper fill, ink label. Hover fills with orange behind the ink label; press nudges down 1px. Colors transition over 0.12s, with no transition under reduced motion.
- **Default:** the one recommended action per product (Add to Chrome, Open the tracker, Comfy Registry). Ink fill with paper label, wrapped in the old default-button ring: a 3px ground gap and then a 1px ink line (`box-shadow: 0 0 0 3px var(--ground), 0 0 0 4px var(--ink)`), with a margin that leaves room for the ring. Hover turns it orange with an ink label. Use at most one per product block.
- **Focus:** the global 2px ink outline, offset 3px.

### Links
Inherit the text color, with a 2px orange underline offset 4px. Top-bar links have no underline at rest and gain the orange one on hover.

### Retro-OS Window (signature)
- **Frame:** paper pane, 1px ink border, square, with the window shadow.
- **Title bar:** at least 1.625rem tall, with a 1px ink rule beneath. Pinstripes run behind it, and a paper-backed title is centred over them in chrome type, ellipsised when cramped.
- **Close box:** a 0.75rem square with a 1px ink border and paper fill at the left. It is decorative.
- **[+]:** a chrome-type link at the right, with paper backing, that opens the project's home. It inverts to ink on hover. A plain counter such as "3 items" uses the same backing but never inverts, since it is not a link. Only windows that represent a project carry it; screenshot windows do not.
- **Uses:** the Projects index, each project's ASCII window, each screenshot window (title names the view and says "sample data" where applicable), and Contact.

### Projects Index (window)
On desktop, a full-width strip of three columns divided by 1px ink rules, each with an index-title name, the mono kind and a graphite one-liner. Below 860px, three stacked rows with the kind right-aligned. Hover and focus invert the row to ink with paper text, using an inset paper focus outline (offset -5px). Each row also aims the hero compass at itself (see the ASCII renderer).

### Ticker
A full-bleed ink band in paper mono, uppercase, padded 11px. It lists only the project names, seven rounds per copy so the loop never shows a gap on wide screens, and scrolls left continuously over 150s in a linear loop, with orange `+` separators spaced 1.25em. It is hidden from assistive tech and stops while motion is paused.

### ASCII Renderer (signature)
Each canvas is a grid of Departure Mono cells (hero 13px, or 10px under 700px wide; project scenes 11px, or 9px under 500px; the Voyage scene 9px, or 7px). A scene returns a density per cell, and density chooses the glyph:
- below 0.05: empty
- below 0.14: `.`
- below 0.24: `:`
- below 0.34: `+`
- above that: a letter of the scene's word, picked by `(column + 3 × row) mod length`, so solid areas read as the word repeated (ETERNALPOSE, LINEMARK, VOYAGE, LIBRARIAN).

A scene may instead name the exact glyph for a cell (`out.ch`), from the letters, `. : +`, or the line set `| _ = # \ -`; the bookcase draws this way, because shapes made of edges read better as line glyphs than as density.

Opacity is `alpha × (0.3 + 0.7 × density)`, quantised to twelfths (alpha 0.78 for the hero, 0.8 for scenes). Accent cells draw at full opacity in orange; everything else is ink. The renderer reads ink, accent and paper from the page's CSS tokens when it starts, so a palette change is made once, in `:root`. Backgrounds use a sparse dotted field (every other 14px block). Scenes animate only while visible (hero 30fps, scenes 24fps), and each frame redraws only the cells whose glyph, opacity or colour changed. The hero works out its fixed geometry (distances, angles, lid curves) once per resize. While motion is paused they draw one still frame and redraw only on change. The hero is the one exception: while paused it shows the compass, needle held north and gaze fixed, whether or not a project is chosen (choosing one only changes the word). Pausing or playing eases between eye and compass, so the only movement is the shape changing; a visit that starts paused opens on the compass.

- **Hero, eye to compass:** a dim field of turning rays surrounds an almond eye whose iris follows the pointer (and drifts on its own after 6s idle) and blinks every 3.5–7.5s. When a project row is hovered or focused, the lids open into a circle, the iris becomes a dial with 32 ticks and 4 major marks, a needle grows (orange north, ink south) and swings to point at that row, and the glyphs switch to the project's word. All of these ease exponentially (rate 7/s). Leaving the row releases it back to the eye. After 9s without input, the compass tours the projects, aiming 2.6s and resting 2.2s.
- **Linemark:** three transit lines with ring stations; an orange train runs along the middle line.
- **Voyage Tracker:** the Straw Hat Jolly Roger in outline, with crossed bones, rippling like cloth. The hat band is orange.
- **Model Librarian:** a bookcase drawn in line glyphs: a `#` case, `=` shelf planks, and books as classic ASCII spines (`_` caps, `|` sides, `=` bands) with base-model titles running down them (FLUX, PONY, SDXL, QWEN, WAN and so on), and a book leaning at the end of the bottom shelf. The orange LORA book drops into the gap on the middle shelf every 7s, sits, then lifts out. Three shelves, or two when the window is under 30 rows; above the page breakpoint the case keeps to the left 60% of the canvas, clear of the screenshot window.
- **XIV Plugins:** Y'shtola and a moogle from the FINAL FANTASY XIV Fan Kit, drawn from `images/xiv-portrait.png` (200px wide) and `images/xiv-moogle.png` (80px wide): red brightness, green linework, blue the moogle's pom-pom, alpha the figure. This one window is inverted: paper glyphs on an ink canvas, density following brightness with linework left dark, at a 7px cell so her face has about 75 rows (square on phones for the same reason). A bright white capture line sweeps down the portrait every 6.5s (RePlate saving a portrait). The moogle bobs beside her head with a crisp outline and a dark one-cell gap that keeps it apart from her white hair; its pom-pom is the window's orange. Above the 860px breakpoint the portrait sits from 34% of the canvas width, clear of the screenshot window; below it the windows stack, so the portrait and moogle centre. Scenes that move their subject aside for the screenshot window test that breakpoint (`sideBySide` in ascii.js), never the canvas width, because a single-column canvas can be wider than a desktop one.

### Striped EP Monogram
"EP" in Anybody 900 at 60% width, stretched to the full content width and filled with horizontal ink stripes (7px bar, 4px gap). It closes the page and serves as the ground for the Contact window.

### Social Card
`images/og.png`, 1200×630: the hero alone (name and compass, needle north, with the intro, Projects window and links hidden), captured from the page itself. Referenced by `og:image` with `twitter:card` set to `summary_large_image`. Regenerate it whenever the hero changes.

## Do's and Don'ts

### Do:
- **Do** put every content group in a retro-OS window: paper, 1px ink frame, 1.625rem pinstriped title bar, 0.75rem close box, square corners, the one window shadow.
- **Do** give a window a [+] only when it opens that project's home.
- **Do** set display and headline in Anybody 900 at 52% width, uppercase, line-height 0.8.
- **Do** set every label, button and window title in uppercase Departure Mono, and bracket standalone chrome links.
- **Do** make a new ASCII scene spell its own word with the density ramp (`.` `:` `+` then letters), ink by default, with orange only for the subject that moves or arrives.
- **Do** overlap each spread's real-screenshot window onto its ASCII window, and alternate the side from spread to spread.
- **Do** mark one default button per product with the ring (3px ground gap, 1px ink line).
- **Do** stop every animation (ticker, scenes, morph easing) and draw still frames while motion is paused. Paused follows prefers-reduced-motion until the visitor uses the [Pause motion] / [Play motion] toggle in the top bar, which is remembered (localStorage `ep-motion`). The toggle owns everything, the ticker included: the page carries `.still` when paused and `.motion-on` when playing, and the reduced-motion CSS stops the ticker only without `.motion-on`.
- **Do** give small chrome links (top bar, [+], colophon) a 44px hit area with the `.hit` class, an invisible `::after` that extends 14px above and below and 8px to each side, so they keep their small look. Contact rows are 44px links in their own right (14px padding).

### Don't:
- **Don't** round any corner.
- **Don't** set orange text on paper or ground (3.0:1); use orange as a fill, an underline or on ink.
- **Don't** add a second accent color or tint the greys.
- **Don't** add shadows to anything but windows, or scanlines to anything but the single fixed overlay.
- **Don't** set prose in Departure Mono or headlines at normal width.
- **Don't** lay the project spreads out as a grid of equal cards. The hero's Projects strip is the one equal row, kept so the compass can point at each project.
- **Don't** add One Piece artwork, characters or screenshots of its art. The Straw Hat Jolly Roger in the Voyage Tracker's ASCII window is the only exception.
