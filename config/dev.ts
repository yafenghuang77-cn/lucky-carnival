import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    publicPath: process.env.TARO_APP_PUBLIC_PATH || '/lucky-carnival/',
    router: {
      mode: 'hash',
      basename: process.env.TARO_APP_ROUTER_BASENAME || '/lucky-carnival',
      customRoutes: {
        '/pages/index/index': ['/index', '/pages/index/index'],
        '/pages/lottery/index': ['/lottery', '/pages/lottery/index'],
        '/pages/prizes/index': ['/prizes', '/pages/prizes/index'],
        '/pages/admin/index': ['/admin', '/pages/admin/index'],
      },
    },
  },
} satisfies UserConfigExport<'webpack5'>
