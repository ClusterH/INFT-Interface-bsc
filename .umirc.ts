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
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/market',
      component: '@/pages/market',
    },
    {
      path: '/market/:id',
      component: '@/pages/market-detail',
    },
  ],
  fastRefresh: {},
});
