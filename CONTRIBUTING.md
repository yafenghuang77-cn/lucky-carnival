# 开发约定

## 开发环境

- Node.js 使用 24.x，版本范围由 `package.json` 的 `engines.node` 声明，使用 nvm 时执行 `nvm use`。
- 统一使用 pnpm，依赖变更时同步提交 `package.json` 和 `pnpm-lock.yaml`。
- 不手动编辑锁文件，不同时提交 npm 或 Yarn 的锁文件。
- VS Code 使用项目的 TypeScript 版本；扩展推荐位于 `.vscode/extensions.json`，由开发者自行安装。

前端规范所需依赖已在 `package.json` 声明，首次开发执行：

```sh
pnpm install
pnpm check
```

新增依赖和编辑器扩展由开发者自行安装，依赖变更后同步更新锁文件。`pnpm install` 时的 `prepare` 自动初始化 Husky。

已声明的依赖无需重复添加。现有 Taro 4.3.1 规则包的 peer dependency 限定 ESLint 8，因此 ESLint 主包保留 8.57.x。TypeScript ESLint 的 parser 与 plugin 保持相同版本；当前新版仍支持 ESLint 8.57。不要将 ESLint 主包单独升级到下一大版本。

Stylelint 使用 17.x，CSS 标准配置使用 `stylelint-config-standard` 40.x，Less 使用 `stylelint-config-standard-less` 4.x；三者需要保持兼容，不要只升级其中一个配置包。项目的 Node.js 24.x 满足这套工具的运行要求。

## 格式与编辑器

- 使用 UTF-8、LF 换行、两个空格缩进，文件末尾保留换行。
- TypeScript/JavaScript 使用单引号、不加分号；JSX 属性使用单引号。
- Prettier 行宽为 100，允许尾随逗号，箭头函数参数保留括号。
- Markdown 保留行尾空格，以兼容显式换行。
- 格式以 `.prettierrc` 为准，编辑器保存时使用同一份配置。
- `.prettierrc` 显式加载 `prettier-plugin-packagejson`，统一 `package.json` 顶层字段与依赖键的排序；编辑器、`pnpm format` 和提交前格式化共用此规则。
- `.prettierignore` 排除构建产物、锁文件、个人小程序配置及工具缓存。
- ESLint、Prettier、Stylelint、commitlint、lint-staged 分别使用 `.eslintrc`、`.prettierrc`、`.stylelintrc`、`.commitlintrc`、`.lintstagedrc`，均为 JSON 格式。
- 格式问题由 Prettier 负责，`eslint-config-prettier` 关闭冲突规则。编辑器将这些无扩展名配置识别为 JSON，提交前也会格式化这些文件。
- `babel.config.js` 根据 `TARO_ENV` 为 H5 和小程序选择不同的 `useBuiltIns`，因此保留 JavaScript 配置。

## 目录与命名

| 目录                  | 职责                            |
| --------------------- | ------------------------------- |
| `src/pages`           | 页面配置、页面级状态与组件组装  |
| `src/features/<业务>` | 业务组件、展示映射和业务规则    |
| `src/components`      | 可复用的通用组件                |
| `src/hooks`           | 可复用的 React 状态与副作用逻辑 |
| `src/services`        | 数据访问、存储与适配            |
| `src/types`           | 跨模块复用的领域类型            |
| `src/utils`           | 独立于组件的通用函数            |
| `src/mock`            | 演示数据                        |
| `config`              | Taro 构建配置                   |

- 文件和目录沿用 kebab-case；页面和通用组件入口沿用 `index.tsx`。
- React 组件名称使用 PascalCase；Hook 使用 `use` 前缀；普通变量和函数使用 camelCase。
- 组件专用类型放在组件附近，跨模块复用的类型放入 `src/types`；类型导入优先使用 `import type`。
- 模块内部的组件、样式和类型保留相对路径；跨模块引用共享组件、Hook、服务、工具、数据和类型时统一使用 `@/` 别名（映射到 `src/`），避免多层 `../`。`config/` 等源码目录之外的本地引用保留相对路径。
- 展示组件通过 props 接收数据和事件；存储与接口调用放在 `services`，避免直接写入展示组件。
- 依赖方向以页面组装业务组件、业务组件复用通用组件为主，通用组件不反向依赖业务页面。

## TypeScript

- 开启 `strict`，保留未使用局部变量、未使用参数和文件名大小写检查。
- 不使用隐式 `any`；优先用明确类型，无法确定的外部数据使用 `unknown` 并在边界校验。
- 内部函数按实际调用约定声明明确类型，避免接收宽泛类型后重复判断；存储、接口等外部数据通过 `@/utils/schema` 导出的 Zod 校验结构，跳过错误记录时保留其余有效记录。该入口统一关闭动态代码生成以适配小程序。TypeScript 中用于类型推导的 `typeof` 可以保留。
- 不通过关闭全局检查或添加 `@ts-ignore` 来绕过应用代码错误。
- `skipLibCheck` 仅用于跳过第三方 `.d.ts` 检查，应用代码及 `config` 仍完整参与类型检查。
- `tsc` 仅负责检查，不输出 JavaScript；构建由 Taro 完成。
- 全量类型检查使用 `pnpm typecheck`，不要按暂存文件逐个调用 `tsc`，以免绕过项目配置。

## 日期与时间

- 日期和时间统一通过 `@/utils/date` 中封装的 dayjs 处理，按北京时间（UTC+08:00）解析和展示。
- 页面日期使用 `formatDate(value)`（`YYYY.MM.DD`），日期时间使用 `formatTime(value)`（`YYYY.MM.DD HH:mm`），短日期使用 `formatDate(value, 'MM.DD')`。
- 日期选择器与每日限次的日期键使用 `shanghaiDay()`（`YYYY-MM-DD`）；时间计算、比较及记录生成使用 `shanghaiTime()`。
- 时间记录保存为带时区的 ISO 格式；不使用 `toLocaleString()` 保存时间，也不通过字符串截取或替换来格式化日期。支持 ISO 日期、日期时间及斜杠分隔的旧记录，没有时区的值按北京时间解析。日历日期、时分秒、时区偏移及完整输入格式均需校验，缺失或非法的展示值显示 `—`。

## 样式与跨端代码

- 样式与组件就近存放，使用 Less；CSS 继承 `stylelint-config-standard`，Less 单独继承 `stylelint-config-standard-less` 并由 `postcss-less` 解析，检查无效十六进制颜色、重复变量等 Less 问题。
- Less 配置显式启用 `color-no-invalid-hex` 检查声明中的颜色，配合 `less/color-no-invalid-hex` 检查变量中的颜色，避免 Less 预设关闭通用属性值校验后漏检。
- 类名使用 kebab-case，允许 BEM 的 `__element` 和 `--modifier`，例如 `prize-card__title`、`prize-card--active`。
- Prettier 负责排版，Stylelint 不额外强制空行规则。
- 小程序 `page` 等原生标签加入允许列表；新增平台标签时只补充需要的标签，不整体关闭未知选择器检查。
- 保留传统 `rgb()/rgba()` 和 `min-width`、`max-width` 媒体查询语法，避免自动升级为仅适用于部分浏览器的写法。
- 共享组件优先使用 Taro 组件和 API；DOM、键盘及焦点操作放入明确的 `process.env.TARO_ENV === 'h5'` 分支。
- 页面和组件的 JSX 统一使用 `@tarojs/components`，禁止原生 HTML 标签；`src/index.html` 仅作为 H5 宿主模板保留。跨端动画使用 `Taro.createAnimation`，通过组件的 `animation` 属性驱动。
- 事件、计时器和订阅需要在组件销毁时清理。
- 项目设计宽度为 750，样式尺寸沿用现有 Taro 转换方式，避免混用未经说明的尺寸方案。
- H5 和微信小程序共用 `dist/`，按顺序构建与验证。

## ESLint 与导入顺序

规则参考 [阿里巴巴前端规约](https://github.com/alibaba/f2e-spec) 和 [Umi 规范指南](https://umijs.org/en-US/docs/guides/lint/)，采用质量检查与格式化分工的方式，并针对当前 Taro 和 React 18 调整。这里采用的是项目配置，没有直接安装阿里或 Umi 的整套规则包。

- JavaScript 检查未定义变量、未使用变量、严格相等、危险动态执行、回调返回值等；使用 `const`/`let` 和完整控制流大括号。
- 不保留 `debugger`、`console.log` 等调试输出，允许 `console.warn` 和 `console.error`。
- React 检查列表 key、重复 props、错误 JSX、无用 Fragment、不稳定嵌套组件和原生按钮类型；TS 组件以类型定义约束 props，不额外要求 PropTypes。
- React 18 使用自动 JSX runtime，不要求为了 JSX 单独导入 React。
- Hooks 检查调用顺序和依赖完整性；不通过禁用检查来隐藏闭包和依赖问题。
- 无障碍检查继承 `plugin:jsx-a11y/recommended`，将 Taro 的 `View`、`Text`、`Button`、`Input`、`Textarea`、`Image`、`Label`、`Video` 以及封装的 `ActionButton` 映射到相应 HTML 语义。新增通用组件时按实际行为补充映射；有点击行为的展示元素需要键盘支持及相应语义，纯装饰元素使用 `aria-hidden`。静态检查不能替代 H5 键盘操作和小程序读屏验证。
- 通过 `extends` 引用 Taro 的 JSX、导入和变量子配置，不继承含旧版 TypeScript 解析器的完整配置，以免与项目直接声明的新解析器混用。
- 应用源码禁止引入 Node 内置模块及仅存在于 devDependencies 的运行时依赖，构建配置可以使用开发依赖。
- TypeScript 检查显式 `any`、变量遮蔽、未使用变量，并要求 `import type`；类型错误交给 `tsc`，ESLint 不额外创建一套完整类型检查程序。
- 导入检查重复、无法解析、自引用和最多三层的本地循环依赖；`@/` 通过项目 tsconfig 解析。循环检查限制深度以控制扫描成本，不能视为整个依赖图无环的保证。
- `.d.ts` 允许全局命名空间和类型引用，构建配置允许 CommonJS。
- `eslint-plugin-jest` 的推荐规则只应用于 `*.test.*`、`*.spec.*` 和 `__tests__/` 中的 JS/TS 文件，检查聚焦测试、禁用测试、重复标题与断言用法，测试文件允许引入开发依赖和 Node 内置模块。当前尚未安装 Jest 测试运行器，因此暂不启用依赖 Jest 版本检测的 `jest/no-deprecated-functions`；接入真实 Jest 后移除此覆盖以恢复检查。该插件仅提供静态检查，不会执行测试，也不向业务源码开放 Jest 全局变量。

`eslint-plugin-simple-import-sort` 统一排序导入和可排序的导出，关闭 `import/order` 与内置 `sort-imports` 以避免重复排序；`eslint-plugin-import` 继续负责解析、重复导入和循环依赖等质量检查。导入按以下顺序分组，组间空一行；组内按插件的自然排序排列路径和具名导入成员，`import type` 单独归组：

1. 使用 `node:` 前缀的 Node 内置模块（构建配置和测试文件使用）。
2. 外部依赖，包括 React、Taro。
3. `@/` 内部模块。
4. 父级、同级目录和 index 相对导入。
5. 纯类型导入。
6. 样式和其他副作用导入。

```tsx
import { View } from '@tarojs/components'
import { useState } from 'react'

import ActionButton from '@/components/action-button'
import { formatTime } from '@/utils/date'

import type { Prize } from '@/types/lottery'

import './index.less'
```

样式和其他副作用导入统一放在导入区末尾，排序插件保留这些副作用导入彼此的相对顺序；它们相对其他分组的位置会调整。有必须在其他模块之前执行的初始化逻辑时，应拆分独立入口并明确依赖顺序，单独验证行为。

## 检查命令

| 命令                  | 用途                                                       |
| --------------------- | ---------------------------------------------------------- |
| `pnpm format`         | 按 Prettier 配置格式化文件                                 |
| `pnpm format:check`   | 检查格式，不修改文件                                       |
| `pnpm lint`           | 检查 JS/JSX/TS/TSX 和构建配置，任何警告均视为失败          |
| `pnpm lint:fix`       | 自动修复可修复的 ESLint 问题                               |
| `pnpm lint:style`     | 检查 CSS/Less，任何警告均视为失败                          |
| `pnpm lint:style:fix` | 自动修复可修复的样式问题                                   |
| `pnpm typecheck`      | 全量 TypeScript 类型检查                                   |
| `pnpm check`          | 顺序执行格式、ESLint、样式、类型检查，任一失败即停止       |
| `pnpm check:staged`   | 对暂存文件执行 ESLint/样式修复和格式化，会更新对应暂存内容 |

提交前还需按改动范围顺序执行 `pnpm build:h5`、`pnpm build:weapp`，并检查对应平台的主要交互。

## Git 提交

- `pre-commit` 先运行 lint-staged：JS/TS 顺序执行 ESLint 修复和 Prettier 格式化；CSS/Less 顺序执行 Stylelint 修复和 Prettier 格式化；其他支持的文档与数据文件执行 Prettier 格式化。
- 暂存检查通过后执行全量类型检查，任何步骤失败都会阻止提交。
- lint-staged 会处理暂存文件，并默认暂存其修复结果。检查未暂存的部分改动时，保留工具默认的备份与恢复机制。
- `commit-msg` 使用已有的 Conventional Commits 配置，提交信息形式为 `type(scope): description`。
- 常用类型包括 `feat`、`fix`、`refactor`、`style`、`docs`、`test`、`build`、`ci`、`chore`，scope 可省略。
- 示例：`chore(tooling): configure frontend checks`。
- 一个提交聚焦一件事，提交前检查 diff，避免将构建产物和个人配置混入提交。
