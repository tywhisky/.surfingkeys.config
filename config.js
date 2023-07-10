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
