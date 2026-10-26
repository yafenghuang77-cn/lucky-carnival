/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production'
    /** 当前构建的平台 */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'qq' | 'jd' | 'harmony' | 'jdrn'
    /**
     * 当前构建的小程序 appid
     * @description 不同环境可通过 env 文件配置，覆盖 dist/weapp/project.config.json 中的 appid
     * @see https://taro-docs.jd.com/docs/next/env-mode-config#特殊环境变量-taro_app_id
     */
    TARO_APP_ID?: string
    /** H5 资源部署路径，默认为 /lucky-carnival/ */
    TARO_APP_PUBLIC_PATH?: string
    /** H5 页面路由前缀，默认为 /lucky-carnival；hash 模式下位于 # 后 */
    TARO_APP_ROUTER_BASENAME?: string
  }
}
