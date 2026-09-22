// Import exactly one theme; theme modules also style hints and visual mode.
// import { DefaultTheme as theme } from './themes/default.js';
// import { RosePineTheme as theme } from './themes/rose-pine.js';
import { TomorrowNightTheme as theme } from './themes/tomorrow-night.js';

// Choose Tabs
api.map('gt', 'T');

// Back and forward in history
api.map('H', 'S');
api.map('L', 'D');

// Switch Tab to left and right
api.map('K', 'R');
api.map('J', 'E');

// Open a link in a new tab
api.map('F', 'C');

// ESC
api.map('<Ctrl-[>', 'esc');

// Scroll Up and Scroll Down
api.map('<Ctrl-n>', 'd');
api.map('<Ctrl-p>', 'u');

// Set theme
settings.theme = theme;

function parseSuggestions(response, selectItems, key) {
  try {
    const items = selectItems(JSON.parse(response.text));
    return Array.isArray(items)
      ? items.map(item => item?.[key]).filter(value => typeof value === 'string' && value.trim())
      : [];
  } catch {
    // Suggestion services can return HTML, error payloads, or no response.
    return [];
  }
}

// Add Search for Bilibili
api.removeSearchAlias('b');
api.addSearchAlias(
  'b', 'bilibili', 'https://search.bilibili.com/all?keyword=', 's',
  'https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&upuser_num=3&term=',
  response => parseSuggestions(response, data => data?.result?.tag, 'value'),
  'o',
  { favicon_url: 'https://www.bilibili.com/favicon.ico' }
);

// Add search for Xiaohongshu
api.removeSearchAlias('s');
api.addSearchAlias(
  's', 'Xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=', 's',
  'https://edith.xiaohongshu.com/api/sns/web/v1/search/recommend?keyword=',
  response => parseSuggestions(response, data => data?.result?.data?.sug_items, 'text'),
  'o',
  { favicon_url: 'https://www.xiaohongshu.com/favicon.ico' }
);
