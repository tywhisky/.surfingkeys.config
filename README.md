# Surfingkeys config

Personal keybindings, Bilibili and Xiaohongshu search aliases, and three themes
for [Surfingkeys](https://github.com/brookhong/Surfingkeys).

## Install

Open Surfingkeys settings, enable **Advanced mode**, and set the configuration
URL to:

```text
https://raw.githubusercontent.com/tywhisky/.surfingkeys.config/master/dist/assets/config.js
```

Save the settings and reload a normal web page. You can also paste the contents
of `dist/assets/config.js` into the advanced configuration editor.

## Edit and build

Use Node.js 22+ and pnpm 9.12.2 (pinned in `package.json`).

```sh
git clone https://github.com/tywhisky/.surfingkeys.config.git
cd .surfingkeys.config
pnpm install --frozen-lockfile
pnpm test
```

Edit `config.js` for mappings and search engines, or `themes/` for styles.
`pnpm run build` bundles the selected theme and config into one standalone
script at `dist/assets/config.js`. No server or runtime dependencies are needed.
Do not edit the generated file directly.

`pnpm test` rebuilds and runs Node's built-in tests for bundle loading, shortcuts,
search registration, query URLs, and malformed suggestion responses.
GitHub Actions runs these checks and rejects stale generated output.

Commit the source changes **and** rebuilt `dist/assets/config.js` together;
the generated file is tracked because the installation URL points to it.
For a fork, replace the owner and branch in the URL with your own.

## Shortcuts

| Key | Action |
| --- | --- |
| `gt` | Choose a tab |
| `H` / `L` | Back / forward in history |
| `J` / `K` | Previous / next tab |
| `F` | Open a link in a new tab |
| `Ctrl-[` | Escape |
| `Ctrl-n` / `Ctrl-p` | Scroll down / up |
| `ob` / `os` | Open Bilibili / Xiaohongshu search |
| `sb` / `ss` | Search selected text on Bilibili / Xiaohongshu |

In the omnibar, type `b` or `s`, then Space, to select the search engine.
These aliases replace Surfingkeys' existing `b` and `s` search aliases.
Suggestion services may reject requests or change their responses; malformed
responses produce no suggestions, while direct search remains available.
Xiaohongshu returned HTTP 406 during verification, so its live suggestions
have not been confirmed.

## Themes

Tomorrow Night is selected by default. To use Default or Rosé Pine, switch the
active import at the top of `config.js`, keeping exactly one theme imported as
`theme`, then rebuild. Theme modules also apply their own hint and visual styles.

After loading a changed config, check `gt`, `F`, `ob`, and `os` on a normal web
page. Automated tests mock the extension API; they do not replace this browser
check.

API reference: [Surfingkeys configuration API](https://github.com/brookhong/Surfingkeys/blob/master/docs/API.md).

## License

[MIT](LICENSE). The Rosé Pine theme retains its upstream Unlicense attribution
in `themes/rose-pine.js`.
