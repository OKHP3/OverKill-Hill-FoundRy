# FoundRy brand and sharing assets

The README and deployed workbench use the same forge artwork and a coordinated
set of browser and shortcut icons. The deployment asset directory is
[`artifacts/custom-gpt-creator/public/`](../artifacts/custom-gpt-creator/public/).
Vite copies it into the Pages build.

## Artwork and provenance

- `assets/foundry-social-preview.jpg` is a byte-for-byte copy of the existing
  `artifacts/mockup-sandbox/public/assets/github-social-preview.jpg`. It shows a
  hammer, glowing anvil, and circuit traces without the older GPT-only tagline.
  Its actual dimensions are 1024 × 1024; the Open Graph tags declare that size.
- PNG icons are unchanged copies of the existing files in
  `artifacts/mockup-sandbox/public/assets/icons/`. They retain the hammer-and-sparks
  artwork at its original sizes. Historical preview assets remain untouched.
- `favicon.svg` and `safari-pinned-tab.svg` are native vector anvil-and-spark marks.
  The SVG favicon uses the OverKill Hill profile's teal `#1c3a34`, paper `#f6f2ee`,
  and amber `#e6a03c`. The monochrome Safari mask uses the declared rust-orange
  `#c46a2c` tint. Brand profile: `okhp3-overkill-hill-brand`, version 1.1.0.

The README links to the repository image so a branch preview can render before
deployment. Application metadata uses absolute URLs at the verified Pages address,
`https://okhp3.github.io/overkill-hill-foundry/`, for social crawlers. Platforms
choose their own crop for the square illustration; its subject has no essential
embedded text. A tag declaration is not evidence of a fresh card in every service.

## Browser and shortcut support

The [HTML entry](../artifacts/custom-gpt-creator/index.html) connects the SVG and
PNG favicons, Apple touch icon, Safari pinned-tab mask, Windows tile image, and
web manifest. It also provides the canonical URL, description, theme color,
Open Graph tags, X card tags, and `WebApplication` structured data.

The [manifest](../artifacts/custom-gpt-creator/public/manifest.webmanifest) uses
relative `id`, `start_url`, `scope`, and icon paths. This keeps shortcuts within
the workbench's deployment path on GitHub Pages or a local preview. Its 192 px
and 512 px icons are marked `any`; maskable safe-area support is not asserted.
Browser support determines how adding or pinning a shortcut is presented. No
service worker, offline cache, or cross-device project synchronization is added.

The mockup sandbox's older manifest is historical preview configuration; it is
not the manifest deployed by `custom-gpt-creator`.

## GitHub repository cards are a separate setting

Embedding an image in the README and setting application Open Graph tags do not
set GitHub's repository social-preview image. That lives in the repository's
**Settings → General → Social preview**. This change does not alter that setting
or claim its current value. The supplied forge image is available for an owner
to select there; GitHub may crop it independently.

## Verification and maintenance

1. Run `pnpm --filter @workspace/custom-gpt-creator run test:pages-base-path`.
   CI supplies the actual Pages base path; for local verification, set `BASE_PATH`
   to `/overkill-hill-foundry/` to match the current live URL.
2. Inspect `dist/public/index.html` under that artifact. Confirm each local icon
   and manifest URL resolves inside the built site and that every manifest icon
   exists with the declared dimensions.
3. Preview the README on GitHub and open both the workbench and `#creator` links.
4. After deployment, verify the live image and metadata. Refresh a platform's
   cached preview separately if it continues showing older artwork.

If the public domain or repository path changes, update the canonical, Open Graph,
X image, structured-data, and README launch URLs together. Keep the original
artwork and deployment copies aligned when intentionally replacing an asset.
