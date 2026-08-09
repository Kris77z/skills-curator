# Jungle 的 Skills 清单

面向设计师、产品经理和其他非开发者的中文 AI Skills 策展网站。

它不追求收录最多，而是回答四个更实际的问题：

- 这个 Skill 能帮我完成什么？
- 它适不适合我现在的任务？
- 第一次应该怎么使用？
- 有人真实用过以后，结果到底怎么样？

## v0.1 范围

- 任务优先的首页与 3 份组合清单
- 5 个完整中文评测 + 1 个快速收录
- Codex、Claude Code、WorkBuddy 三套使用指南
- 可追溯的 GitHub 来源、固定 Commit 与 License
- 本地匿名“开始使用 / 有效 / 部分有效 / 没效果”反馈闭环

完整的定位、内容模型、验证方案与风险边界见 [`docs/product-concept-v0.2.docx`](./docs/product-concept-v0.2.docx)。

首批示例内容来自 [`anthropics/skills`](https://github.com/anthropics/skills)，每个 Skill 都单独核对并展示其许可。中文解释和体验判断为本项目的独立策展内容。

## 本地开发

```bash
npm install --ignore-scripts
npm run dev -w apps/web
```

生产构建：

```bash
npm run build
```

网站位于 `apps/web`，使用 React Router 7、React 19、Tailwind CSS 4 和 Cloudflare Workers。策展数据集中在 `apps/web/src/data/catalog.ts`，方便后续替换为真实内容或后台数据。

## 部署

`apps/web/wrangler.jsonc` 已移除上游项目的域名、数据库和限流绑定，只保留此 Fork 所需的最小 Cloudflare Workers 配置。

```bash
npm run deploy
```

## Fork 说明

本仓库 Fork 自 [skillsgate/skillsgate](https://github.com/skillsgate/skillsgate)。目前复用其 Monorepo、React Router Web 应用和 Cloudflare Workers 基础；上游 Electron/TUI 代码仍保留，首版产品只开发 Website。

## License

仓库代码沿用上游 [MIT License](./LICENSE)。第三方 Skills 以各自目录中声明的许可为准。
