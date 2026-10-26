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
    action-button/             H5 原生按钮 / 小程序 Taro 按钮
    prize-art/                 可复用 CSS 奖品插画
    prize-card/                九宫格奖品卡片
    win-modal/                 中奖与未中奖结果展示，无确认按钮
  hooks/use-lottery.ts          抽奖状态、计时器、每日机会重置
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

参考 KFC 红白黑配色：红 `#E4002B`、奶油白 `#FFFAF2`、炭黑 `#252223`、金色 `#FFDF91`。九宫格采用票券式框架和统一的 CSS 奖品插画；中央 GO 是主操作。

中奖弹窗展示对应奖品、中奖文案、虚线票券装饰，只保留关闭图标。未中奖使用独立的四叶草画面和文案。H5 支持 Escape 关闭、焦点约束、减少动态效果偏好。

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

H5 本地预览通常为 `http://localhost:10086`：

- `/#/pages/index/index`：活动入口
- `/#/pages/lottery/index`：抽奖页，可直接预览中奖弹窗
- `/#/pages/prizes/index`：我的奖品及奖券样式示例
- `/#/pages/admin/index`：管理登录与统计 UI 预览

```sh
pnpm build:h5
pnpm build:weapp
pnpm typecheck
pnpm check
```

两个平台默认输出到 `dist/`，请顺序构建。小程序用微信开发者工具打开项目根目录。新增页面后需重启 H5 预览以更新路由。

TypeScript 开启严格模式、未使用变量和参数检查；`skipLibCheck` 跳过 Taro/Webpack 的第三方声明检查，应用代码与构建配置仍参与检查。H5 生产构建存在框架的动态依赖与包体积提示。

规范工具所需的完整依赖清单见 [开发约定](CONTRIBUTING.md#开发环境)，由开发者手动安装。ESLint 覆盖 React、Taro、Hooks、TypeScript/JavaScript 和导入顺序，已纳入 `pnpm check` 与提交前检查。编辑器扩展仅提供推荐列表，由开发者自行安装。
