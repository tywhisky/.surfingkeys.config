// import { DefaultTheme } from './themes/default.js';
// import { RosePineTheme } from './themes/rose-pine.js';
import { TomorrowNightTheme } from "./themes/tomorrow-night.js";

// Choose Tabs
api.map('gt', 'T');

// Back and forward in history
api.map('H', 'S');
api.map('L', 'D');
// Switch Tab to left and right
api.map('J', 'E');
api.map('K', 'R');
// Open a link in a new tab
api.map('F', 'C');
// ESC
api.map("<ctrl-[>", "esc");

// Set theme
settings.theme = TomorrowNightTheme;

// Add Search for Bilibili
api.removeSearchAlias('b');
api.addSearchAlias('b', 'bilibili', 'https://search.bilibili.com/all?keyword=', 's', 'https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&upuser_num=3&term=?', function (response) {
  var res = JSON.parse(response.text).result.tag;
  return res.map(function (r) {
    return r.value;
  });
},
  { favicon_url: 'https://www.bilibili.com/favicon.ico' }
);

// Add search for Xiaohongshu
api.removeSearchAlias('s');
api.addSearchAlias('s', 'Xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=', 's', 'https://edith.xiaohongshu.com/api/sns/web/v1/search/recommend?keyword=', function (response) {
  var res = JSON.parse(response.text).result.data.sug_items;
  return res.map(function (r) {
    return r.text;
  });
},
  { favicon_url: 'https://www.xiaohongshu.com/favicon.ico' }
);
