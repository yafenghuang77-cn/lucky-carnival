import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

import type { UserConfigExport } from '@tarojs/cli'

export default {
  mini: {
    enableSourceMap: false,
  },
  h5: {
    enableSourceMap: false,
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
    compile: {
      include: [
        // 转译第三方业务依赖，跳过已编译的运行时和补丁；同时适配 pnpm 的嵌套路径。
        (filename: string) =>
          /[\\/]node_modules[\\/]/.test(filename) &&
          !/[\\/]node_modules[\\/](@babel[\\/]|(?:core-js(?:-pure)?|style-loader|css-loader|react|react-dom)[\\/])/.test(
            filename,
          ),
      ],
    },
    webpackChain(chain) {
      // 环境钩子会覆盖公共钩子，因此保留路径别名解析。
      chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      chain.optimization.runtimeChunk('single')

      const splitChunks = chain.optimization.get('splitChunks')
      chain.optimization.splitChunks({
        ...splitChunks,
        cacheGroups: {
          // 保留 Taro 默认分组，只提取首屏依赖，避免提前加载异步页面组件。
          ...splitChunks.cacheGroups,
          commonVendor: {
            name: 'common-vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 20,
            enforce: true,
            reuseExistingChunk: true,
          },
          reactVendor: {
            name: 'react-vendor',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            chunks: 'initial',
            priority: 300,
            enforce: true,
            reuseExistingChunk: true,
          },
          taroComponentsVendor: {
            name: 'taro-components-vendor',
            test: /[\\/]node_modules[\\/](@tarojs[\\/]components|@stencil[\\/]core)[\\/]/,
            chunks: 'initial',
            priority: 300,
            enforce: true,
            reuseExistingChunk: true,
          },
        },
      })
    },
  },
} satisfies UserConfigExport<'webpack5'>
