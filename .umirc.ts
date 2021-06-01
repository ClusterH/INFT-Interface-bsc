import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    // inft: '@/components',
  },
  title: 'iNFT',
  favicon: '/favicon.ico',
  mode: 'site',
  logo: '/favicon.ico',
  description: '组件、工具等说明文档',
  theme: {
    '@primary-color': '#FED835',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layouts/assets',
      routes: [
        {
          path: '/',
          redirect: '/market',
        },
        {
          path: '/market',
          component: '@/pages/market',
        },
        {
          path: '/market/:contract/:tokenId/:orderId',
          component: '@/pages/market/[contract][token-id][order-id]',
        },
        {
          path: '/market/:contract/:tokenId/',
          component: '@/pages/market/[contract][token-id][order-id]',
        },
        {
          path: '/account',
          component: '@/pages/account',
        },
      ],
    },
  ],
  fastRefresh: {},
});
