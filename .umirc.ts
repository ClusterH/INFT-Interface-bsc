import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: 'bsc.inft.io/',
  alias: {
    // inft: '@/components',
  },

  locale: {
    default: 'en-US',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
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
    {
      path: '/idolbox',
      component: '@/pages/idolbox',
    },
    {
      path: '/',
      component: '@/layouts/assets',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          component: '@/pages/home',
          title: 'title_home',
        },
        {
          path: '/market',
          component: '@/pages/market',
          title: 'title_market',
        },
        {
          path: '/market/:contract/:tokenId/:orderId',
          component: '@/pages/market/[contract][token-id][order-id]',
          title: 'title_detail',
        },
        {
          path: '/market/:contract/:tokenId/',
          component: '@/pages/market/[contract][token-id][order-id]',
          title: 'title_detail',
        },
        {
          path: '/account',
          component: '@/pages/account',
          title: 'title_account',
        },
        {
          path: '/create',
          component: '@/pages/create',
          title: 'title_create',
        },
        {
          path: '/create-preview',
          component: '@/pages/create/create-preview',
          title: 'title_create_preview',
        },
        {
          path: '/auction',
          component: '@/pages/auction',
          title: 'title_auction',
        },
        {
          path: '/auction/:contract/:tokenContract/:id',
          component: '@/pages/auction/[id]',
          title: 'title_auction_info',
        },
      ],
    },
  ],
  fastRefresh: {},
});
