
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/yubas-frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/yubas-frontend"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/about"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/campaign"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/business"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/blog/fleet"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/blog/trip"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/faq"
  },
  {
    "renderMode": 2,
    "route": "/yubas-frontend/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1993, hash: '8392529d441b6edd56b73cfd3de506ca79e09a05806b1b95070a4752be09ed6f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1562, hash: '95df015a173a43020e1305a69efe708c8add3e73b5b583fa473ef07d95fc1d66', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'blog/trip/index.html': {size: 7731, hash: 'b5755e94c57228e5da580f515dae4382b58d173ddfc7fefb84eac070dbb8374c', text: () => import('./assets-chunks/blog_trip_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 7734, hash: 'ae7e5a960c3f7a8d06ae5cad8d4311d2e72894a6b2767a06ed0affe663549596', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'faq/index.html': {size: 7728, hash: '8285e482721e6220b03afd3a2ca453443db6dc9de243f88098e2bb3049d0e2a5', text: () => import('./assets-chunks/faq_index_html.mjs').then(m => m.default)},
    'index.html': {size: 22038, hash: '9a3b2dc0943e3e2b91a36cb4bf9d300c7da5e1223bdac2a8e29a7dee3ab23d5a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'blog/fleet/index.html': {size: 7734, hash: '4bbe0b2f413ce35fb3f970be36a85cc510873fe3d6f94c934a45c3a0807cdb78', text: () => import('./assets-chunks/blog_fleet_index_html.mjs').then(m => m.default)},
    'business/index.html': {size: 7743, hash: 'ccfb58924d358bd26d61126621f3e82e18721017ad04be9b1cd7a552f3d14783', text: () => import('./assets-chunks/business_index_html.mjs').then(m => m.default)},
    'campaign/index.html': {size: 7742, hash: 'a34673da607c969a7bc8d8bebf684e95c80921cd52629fb831b2f810c7f40a13', text: () => import('./assets-chunks/campaign_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 7734, hash: 'bf43c969c3c351483ce0f2a45eaa9646acbf8f4bc1754831202ff2b2f5ed7065', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-7L2QZE5Q.css': {size: 1511, hash: '0ON383mPLNY', text: () => import('./assets-chunks/styles-7L2QZE5Q_css.mjs').then(m => m.default)}
  },
};
