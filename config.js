import { DefaultTheme } from './themes/default.js';
import { RosePineTheme } from './themes/rose-pine.js';

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
settings.theme = RosePineTheme;

// Add Search for Bilibili
api.removeSearchAlias('b');
api.addSearchAlias('b', 'bilibili', 'https://search.bilibili.com/all?keyword=', 's', 'https://s.search.bilibili.com/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&upuser_num=3&term=?', function(response) {
    var res = JSON.parse(response.text).result.tag;
    return res.map(function(r){
        return r.value;
    });
   },
   {favicon_url: 'https://www.bilibili.com/favicon.ico'}
);
