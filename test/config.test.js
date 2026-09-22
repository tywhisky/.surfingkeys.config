import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { createContext, Script } from 'node:vm';

const mappings = [];
const aliases = new Map();
const removed = [];
const hints = [];
const visual = [];
const context = createContext({
  settings: {},
  api: {
    map: (...args) => mappings.push(args),
    removeSearchAlias: alias => removed.push(alias),
    addSearchAlias: (alias, ...args) => aliases.set(alias, args),
    Hints: { style: (...args) => hints.push(args) },
    Visual: { style: (...args) => visual.push(args) },
  },
});
const bundle = new Script(readFileSync(new URL('../dist/assets/config.js', import.meta.url), 'utf8'));
bundle.runInContext(context);

test('bundle loads as a standalone script and preserves shortcuts and theme', () => {
  assert.deepEqual(mappings, [
    ['gt', 'T'], ['H', 'S'], ['L', 'D'], ['K', 'R'], ['J', 'E'],
    ['F', 'C'], ['<Ctrl-[>', 'esc'], ['<Ctrl-n>', 'd'], ['<Ctrl-p>', 'u'],
  ]);
  assert.match(context.settings.theme, /\.sk_theme/);
  assert.ok(hints.length > 0);
  assert.ok(visual.length > 0);
  // Reloading the config must not redeclare top-level lexical bindings.
  bundle.runInContext(context);
});

test('search aliases use the Surfingkeys argument order and clean query URLs', () => {
  assert.deepEqual([...aliases.keys()], ['b', 's']);
  for (const [alias, args] of aliases) {
    const [, searchURL, leader, suggestionURL, parse, siteKey, options] = args;
    assert.ok(removed.includes(alias));
    assert.equal(leader, 's');
    assert.equal(siteKey, 'o');
    assert.equal(typeof parse, 'function');
    assert.equal(new URL(options.favicon_url).protocol, 'https:');
    for (const url of [searchURL, suggestionURL]) {
      const query = '中文 & surfingkeys?';
      const params = new URL(url + encodeURIComponent(query)).searchParams;
      assert.equal(params.get('keyword') ?? params.get('term'), query);
    }
  }
});

test('suggestions keep valid strings and tolerate malformed service responses', () => {
  for (const [alias, wrap, key] of [
    ['b', items => ({ result: { tag: items } }), 'value'],
    ['s', items => ({ result: { data: { sug_items: items } } }), 'text'],
  ]) {
    const parse = aliases.get(alias)[4];
    const valid = wrap([{ [key]: '中文' }, null, {}, { [key]: 42 }, { [key]: '' }, { [key]: '  ' }]);
    assert.deepEqual(Array.from(parse({ text: JSON.stringify(valid) })), ['中文']);
    for (const payload of [null, {}, { result: null }, wrap(null), wrap({}), wrap([])]) {
      assert.deepEqual(Array.from(parse({ text: JSON.stringify(payload) })), []);
    }
    for (const response of [undefined, null, {}, { text: '' }, { text: '<html>Blocked</html>' }]) {
      assert.deepEqual(Array.from(parse(response)), []);
    }
  }
});
