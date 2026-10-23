# Eternal Pose

The home page at [eternalpose.io](https://eternalpose.io): Looneth's projects.

GitHub Pages publishes the `docs/` folder (`docs/CNAME` sets the domain). Projects with their own sites use subdomains:
[linemark.eternalpose.io](https://linemark.eternalpose.io) (from [EY4O/linemark](https://github.com/EY4O/linemark)'s `docs/`) and
[voyage.eternalpose.io](https://voyage.eternalpose.io) (from [EY4O/One-Piece-Voyage-Tracker](https://github.com/EY4O/One-Piece-Voyage-Tracker)).

## Layout

- `docs/index.html`: the page.
- `docs/ascii.js`: the ASCII drawings (the eye that turns into a compass, and each project's window). Each project's scene is a function in that file.
- `docs/images/`: project screenshots (WebP), taken from each project's README or store images, or captured from its live site.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: design notes; not published.

## Adding a project back

Hidden for now: Prompto and ComfyUI-Prompto, Glass Dashboard, Bagcheck and RePlate (FFXIV plugins), DanChro English Patch.

To add one, copy an `<article class="project">` in `docs/index.html` (alternate `flip` so the sides keep switching), add an entry to the hero's Projects window with a `data-compass` word, and give it a scene in `docs/ascii.js` (or reuse one).

## Fonts

[Anybody](https://github.com/Etcetera-Type-Co/Anybody) and [Departure Mono](https://departuremono.com), both under the SIL Open Font License (`docs/fonts/DEPARTURE-MONO-LICENSE.txt`; `docs/fonts/ANYBODY-OFL.txt`).
