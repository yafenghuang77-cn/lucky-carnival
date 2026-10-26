// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
        compiler: 'webpack5',
        // 小程序使用 Taro 默认兼容目标，避免开发环境的 Browserslist 保留新语法。
        targets: process.env.TARO_ENV === 'weapp' ? { ios: '9', android: '5' } : undefined,
        useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false,
      },
    ],
  ],
}
