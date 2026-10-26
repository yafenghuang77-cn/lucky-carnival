# 幸运嘉年华 · Lucky Carnival

Taro 4.3.1 + React 18 + TypeScript + Less，面向微信小程序和 H5，使用 750 设计宽度。当前交付用户端和管理端 UI，不包含后端、真实登录、发奖或门店核销。

## 架构与组件边界

```text
src/
  pages/
    index/                     活动入口、我的奖品和管理员入口
    lottery/                   组装抽奖页面
    prizes/                    用户奖品列表、演示兑奖码
    admin/                     管理登录与每日领奖统计预览
  features/
    lottery/components/        ActivityHero、LotteryBoard、ChanceBar、LotteryFooter
    lottery/presentation.ts    奖品展示映射
    lottery/rules.ts           统一的活动规则说明
    prizes/components/         VoucherCard 奖券卡片
    admin/components/          AdminLogin、SummaryCards、RecordsList、PrizeBreakdown
  components/
    motion-view/               跨端内容入场过渡
    action-button/             统一 Taro 按钮，包含 H5 键盘支持
    prize-art/                 可复用 CSS 奖品插画
    prize-card/                九宫格奖品卡片
    win-modal/                 中奖与未中奖结果展示，无确认按钮
  hooks/use-lottery.ts          抽奖状态、计时器、每日机会重置
  hooks/use-taro-animation.ts   Taro 动画实例与导出、H5 减少动态效果偏好
  services/
    lottery-demo.ts            本机每日机会与演示奖券存储
    admin-demo.ts              虚构统计数据适配器
  types/                       奖品、奖券、每日领奖统计类型
  utils/date.ts                北京时间日期与展示格式
  mock/lottery.json             活动和奖品池
config/                        Taro 与 Webpack 环境配置
```

页面只负责页面级状态与组件组装；业务展示组件、通用组件、状态 Hook 和数据适配器分开。后续可以替换 `services/` 中的数据来源，避免把真实接口或权限判断写入展示组件。

## UI 设计

采用红金节日配色：朱红 `#B52630`、深红 `#851E2B`、奶油白 `#FFF8E9`、金色 `#F8D995`。首页以福字印章、奖券卡片和金色主按钮突出活动；我的奖品、玩法为次级入口，门店管理收纳在页尾。九宫格采用金色框架和统一的 CSS 奖品插画；中央 GO 是主操作。标题使用系统宋体，正文使用系统无衬线字体，无需加载远程字体。

中奖弹窗展示对应奖品、中奖文案、虚线票券装饰，只保留关闭图标。未中奖使用独立的四叶草画面和文案。H5 支持 Escape 关闭、焦点约束、减少动态效果偏好。

页面和组件统一使用 `@tarojs/components`，ESLint 禁止 JSX 中的原生 HTML 标签。`src/index.html` 是 H5 构建所需的宿主模板，保留 HTML 文档结构和挂载节点。

页面内容采用 280ms 淡入上移，奖品筛选采用 180ms 内容过渡；中奖弹窗支持入场及 180ms 退场，关闭后恢复焦点。页面入场、弹窗出入场、奖品格缩放和按钮按压反馈统一使用 `Taro.createAnimation` 与组件的 `animation` 属性，H5 和微信小程序共用实现，无需安装动画插件。抽奖格子的顺时针顺序与减速节奏由抽奖 Hook 的计时器控制；奖品背景和边框通过激活态类名切换。

## 每日抽奖规则

每位用户每天限抽 1 次，没有签到、任务加次数或其他加次入口。体验版按本机存储记录北京时间日期，点击抽奖时即消耗当天机会，刷新不恢复；次日 00:00 重置，页面再次显示时也会同步。

演示奖券保存在本机，「我的奖品」可查看奖品卡片、演示兑奖码、中奖时间与有效期。中奖弹窗预览不会消耗机会或添加奖券。

当前没有真实用户身份，同一设备的演示限次不能代替服务端按用户限次。后续应由服务端决定抽奖结果、校验真实身份、按用户和北京时间日期设唯一约束，并管理库存和奖券。

## 管理统计 UI

首页的「门店管理」先进入管理员登录界面。尚未接入登录服务，登录表单不会验证密码或授予权限；可点击「查看示例统计页面」进入明确标识的 UI 预览。预览状态仅在页面内保存，直接打开或刷新会回到登录界面。

统计页包含按日期切换的领奖人数、已领取份数、待领取份数、涉及奖品种类，以及用户明细、奖品分布、状态筛选、关键词搜索。示例日期为 2026-10-23 至 2026-10-25，其他日期展示空状态。数据完全虚构，与本机抽奖结果分开。

统计口径：已领取按领奖日期统计；待领取按中奖日期展示；领奖人数对已领奖用户去重。当前不包含核销操作。

真实的管理员访问限制和数据读取权限须随后端实现：前端入口或路由本身不是权限边界。正式接口应校验管理员会话，普通用户不应获得统计数据。

## 开发与预览

Node.js 使用 24.x（`package.json#engines` 与 `.nvmrc`），包管理器统一使用 pnpm。完整的格式、目录、跨端开发和提交约定见 [开发约定](CONTRIBUTING.md)。

```sh
pnpm install
pnpm dev:h5
pnpm dev:weapp
```

按环境启动时使用对应命令：

| 环境         | H5 启动            | 微信小程序监听编译    | 环境文件           | 配置文件         |
| ------------ | ------------------ | --------------------- | ------------------ | ---------------- |
| 开发         | `pnpm dev:h5`      | `pnpm dev:weapp`      | `.env.development` | `config/dev.ts`  |
| 测试         | `pnpm dev:h5:test` | `pnpm dev:weapp:test` | `.env.test`        | `config/dev.ts`  |
| 生产配置预览 | `pnpm dev:h5:prod` | `pnpm dev:weapp:prod` | `.env.production`  | `config/prod.ts` |

H5 启动命令提供本地预览服务，小程序命令持续监听编译并配合微信开发者工具预览。测试环境启动使用开发构建以便调试，加载测试环境变量；生产配置预览使用生产压缩配置。切换环境时先停止当前进程，再执行对应命令；生产发布仍执行下面的 `build` 命令。

H5 本地预览通常为 `http://localhost:10086/lucky-carnival/#/lucky-carnival/index`：

- `/lucky-carnival/#/lucky-carnival/index`：活动入口
- `/lucky-carnival/#/lucky-carnival/lottery`：抽奖页，可直接预览中奖弹窗
- `/lucky-carnival/#/lucky-carnival/prizes`：我的奖品及奖券样式示例
- `/lucky-carnival/#/lucky-carnival/admin`：管理登录与统计 UI 预览

`h5.router.customRoutes` 为四个页面配置了上述短路径，数组中的第一项作为默认跳转地址，同时保留 `/pages/index/index` 等原路径用于兼容已有链接。业务代码的 `Taro.navigateTo` 等调用继续使用 `src/app.config.ts` 中的原始页面路径，H5 自动映射为短路径，小程序路径保持一致。

局域网访问时将 `localhost` 替换为开发机 IP，例如 `http://192.168.31.54:10086/lucky-carnival/#/lucky-carnival/index`。修改 `config/` 或 `.env` 后需重启 `pnpm dev:h5` 才会加载新配置。Taro 启动日志显示的是服务器根地址，请访问 `/lucky-carnival/` 目录；页面路由前缀在浏览器进入页面后体现在 `#` 后。

```sh
pnpm build:h5
pnpm build:weapp
pnpm typecheck
pnpm check
```

微信开发者工具上传前，先停止 `pnpm dev:weapp` 等小程序监听进程，再运行 `pnpm build:weapp`，最后在开发者工具中重新编译并上传。开发监听产物包含未压缩的预编译依赖和调试文件，可能超过主包 2MB 限制；不要直接上传开发产物，也不要通过忽略 `prebundle/` 来缩包，该目录在开发构建中属于运行依赖。开发与发布构建共用输出目录，上传前不要重新启动开发监听，以免生产包被覆盖。

各平台保留独立目录，并在里面按 `TARO_APP_ROUTER_BASENAME` 创建产物子目录。当前值为 `/lucky-carnival`，H5 输出到 `dist/h5/lucky-carnival/`，微信小程序输出到 `dist/weapp/lucky-carnival/`，其他平台同样输出到 `dist/<平台>/lucky-carnival/`。小程序用微信开发者工具打开项目根目录，`project.config.json` 已指向 `dist/weapp/lucky-carnival/`。新增页面后需重启 H5 预览以更新路由。

TypeScript 开启严格模式、未使用变量和参数检查；`skipLibCheck` 跳过 Taro/Webpack 的第三方声明检查，应用代码与构建配置仍参与检查。H5 生产构建存在框架的动态依赖与包体积提示。

H5 发布构建通过 `config/prod.ts` 的 `webpackChain` 提取 `react-vendor`（React、React DOM、scheduler）、`taro-components-vendor`（Taro 组件和 Stencil）及 `common-vendor`，Webpack runtime 也单独输出；保留 Taro 默认分组和页面按需加载。第三方转译排除规则同时识别普通和 pnpm 嵌套路径，跳过已有产物的运行时及补丁包。浏览器兼容范围与 Babel 补丁策略保持原样。

本机同一测试环境构建对比：`app.js` 约从 365 KiB 降至 8.8 KiB，HTML 入口引用的 JS/CSS 总量约从 457.2 KiB 降至 452.7 KiB，逐文件 gzip 后的合计约从 147.2 KiB 降至 145.9 KiB。主要收益是依赖缓存复用，不能把 `app.js` 的减少量当成首屏总下载量的减少；页面异步资源不计入上述入口统计。生产服务器需开启 gzip/Brotli，并为带内容哈希的 JS/CSS 设置长期缓存，HTML 保持可更新。

规范工具依赖已在 `package.json` 声明，执行 `pnpm install` 即可安装。ESLint 覆盖 React、Taro、Hooks、TypeScript/JavaScript、导入与导出排序、Taro 组件无障碍检查及测试文件中的 Jest 规范；Prettier 统一格式与 `package.json` 排序；Stylelint 17 分别检查 CSS 和 Less。以上均接入 `pnpm check` 与提交前检查，Jest 插件仅检查测试代码，不执行测试。详细规则见 [开发约定](CONTRIBUTING.md)。编辑器扩展仅提供推荐列表，由开发者自行安装。

## 环境与部署配置

`config/index.ts` 保留共用的打包、样式和路径别名配置。H5 的 `publicPath`、`router.mode`、`router.basename` 和 `router.customRoutes` 分别在 `config/dev.ts`、`config/prod.ts` 中配置，开发与生产环境可以独立调整；默认访问路径保持一致。

| 命令                                           | 环境文件           | 构建方式                   |
| ---------------------------------------------- | ------------------ | -------------------------- |
| `pnpm dev:h5` / `pnpm dev:weapp`               | `.env.development` | 开发模式，监听文件变化     |
| `pnpm dev:h5:test` / `pnpm dev:weapp:test`     | `.env.test`        | 开发模式，监听文件变化     |
| `pnpm dev:h5:prod` / `pnpm dev:weapp:prod`     | `.env.production`  | 生产模式，监听文件变化     |
| `pnpm build:h5:test` / `pnpm build:weapp:test` | `.env.test`        | 生产模式，使用测试环境变量 |
| `pnpm build:h5` / `pnpm build:weapp`           | `.env.production`  | 生产模式，使用生产环境变量 |

命令通过 `--env` 指定构建方式，通过 `--mode` 选择环境变量文件；`NODE_ENV` 保持为 `development` 或 `production`。`dev:*:test` 使用 `config/dev.ts` 调试测试环境，`build:*:test` 使用 `config/prod.ts` 生成测试环境的发布产物。不同环境的同平台构建共用输出目录，切换环境后会覆盖该平台的产物。

Source Map 在 `config/dev.ts` 的 H5、小程序配置中显式开启，方便本地调试；在 `config/prod.ts` 中显式关闭。因此 `build:h5`、`build:weapp` 及其 `:test` 构建均不生成 Source Map，`dev:*:prod` 的生产配置预览也不生成。微信开发者工具配置同时关闭 `uploadWithSourceMap`。

- `TARO_APP_PUBLIC_PATH`：H5 资源部署路径，开发、测试、生产环境均已设为 `/lucky-carnival/`。将 `dist/h5/lucky-carnival/` 的内容部署到站点的 `/lucky-carnival/` 目录，也可将 `dist/h5/` 作为站点根目录；部署到其他目录时修改此变量，部署到域名根目录时设为 `/`。
- `TARO_APP_ROUTER_BASENAME`：H5 页面路由前缀，同时决定各平台产物的子目录，开发、测试、生产环境均已设为 `/lucky-carnival`。构建时去掉首尾斜杠，例如 `/campaign/` 对应 `dist/h5/campaign/`、`dist/weapp/campaign/`；多层路径保留对应目录层级，值为 `/` 时子目录回退为 `lucky-carnival`。当前使用 hash 路由，配合默认资源部署路径和 `customRoutes`，首页地址为 `/lucky-carnival/#/lucky-carnival/index`。修改该变量后，根目录小程序配置的 `miniprogramRoot` 也需同步，或直接导入对应的生成目录。
- `TARO_APP_ID`：可按环境覆盖小程序 AppID；不设置时使用根目录 `project.config.json` 中的值。使用环境覆盖的 AppID 时，请在微信开发者工具中导入 `dist/weapp/lucky-carnival/`（或修改路由前缀后的对应产物目录），以使用生成配置中的 AppID。
- 个人环境覆盖可写入 `.env.development.local`、`.env.test.local` 或 `.env.production.local`，这些文件已被 Git 忽略。`TARO_APP_` 变量会进入前端构建产物，只配置公开参数，密钥保留在服务端。

例如在 `.env.production.local` 中配置子目录部署：

```dotenv
TARO_APP_PUBLIC_PATH="/carnival/"
```

Webpack 已开启持久化缓存，并按构建方式、平台和环境模式隔离；构建配置、环境文件、Babel 配置和 TypeScript 配置变更会使对应缓存失效。需要手动重建缓存时，删除 `node_modules/.cache/webpack/` 后重新构建。

当前 Taro H5 组件中的一个模块存在 `NullDependency` 无法序列化的缓存提示，该模块会重新编译，其他模块仍正常缓存；此提示不影响构建产物。
