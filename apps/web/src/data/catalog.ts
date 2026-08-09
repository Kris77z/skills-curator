export type ToolId = "codex" | "claude" | "workbuddy";

export type SkillEntry = {
	slug: string;
	name: string;
	cnName: string;
	level: "完整评测" | "快速收录";
	category: "设计" | "产品" | "写作" | "测试";
	tagline: string;
	verdict: string;
	summary: string;
	fit: string[];
	notFit: string[];
	outcomes: string[];
	tags: string[];
	tools: ToolId[];
	prompts: Record<ToolId, string>;
	installNote: Record<ToolId, string>;
	sourceUrl: string;
	licenseUrl: string;
	license: string;
	commit: string;
	reviewedAt: string;
};

export type CollectionEntry = {
	slug: string;
	title: string;
	description: string;
	forWho: string;
	steps: { title: string; detail: string; skillSlug: string }[];
};

export const toolNames: Record<ToolId, string> = {
	codex: "Codex",
	claude: "Claude Code",
	workbuddy: "WorkBuddy",
};

const SOURCE_COMMIT = "f17010c9bb483898c1d9c9f42dde2b3a98889434";
const source = (slug: string) =>
	`https://github.com/anthropics/skills/tree/${SOURCE_COMMIT}/skills/${slug}`;
const license = (slug: string) =>
	`https://github.com/anthropics/skills/blob/${SOURCE_COMMIT}/skills/${slug}/LICENSE.txt`;

export const skills: SkillEntry[] = [
	{
		slug: "frontend-design",
		name: "frontend-design",
		cnName: "前端视觉主理人",
		level: "完整评测",
		category: "设计",
		tagline: "让 AI 做出来的界面少一点模板味，多一点明确的视觉主张。",
		verdict:
			"我会在方向已经明确、准备进入高保真时启用它；做信息架构时先别用，容易过早沉迷视觉。",
		summary:
			"它会要求 AI 先建立视觉方向，再处理字体、色彩、层级和动效。真正的价值不是“变好看”，而是逼 AI 解释每个设计选择。",
		fit: ["要做官网、活动页或产品原型", "讨厌千篇一律的 AI 风格", "能说清品牌或受众"],
		notFit: ["还没想清楚页面解决什么问题", "只想快速套一套组件", "需要严格复刻现有设计稿"],
		outcomes: ["先给出视觉方向再写代码", "页面层级更有对比", "减少默认渐变与模板卡片"],
		tags: ["网页设计", "视觉方向", "高保真"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "使用 frontend-design skill，把这个落地页做成面向独立设计师的中文产品。先说明视觉方向，再实现首页；不要改动后端。",
			claude: "请使用 frontend-design skill 重做这个页面。先给我 2 个视觉方向并推荐一个，确认后再进入实现。",
			workbuddy: "调用 frontend-design skill，为这个产品页面建立一套有明确受众感的视觉方案，并输出可预览的网页。",
		},
		installNote: {
			codex: "把完整技能文件夹放进 ~/.agents/skills/，重启或新建任务后使用。",
			claude: "把完整技能文件夹放进 ~/.claude/skills/，在新会话中明确点名使用。",
			workbuddy: "下载技能文件夹并压缩，在“技能 → 添加技能 → 上传技能”中导入。",
		},
		sourceUrl: source("frontend-design"),
		licenseUrl: license("frontend-design"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
	{
		slug: "brand-guidelines",
		name: "brand-guidelines",
		cnName: "品牌规范执行器",
		level: "完整评测",
		category: "设计",
		tagline: "把“像我们品牌”从一句感觉，变成 AI 能执行的颜色与字体约束。",
		verdict:
			"适合拿来理解 Skill 如何固化品牌规范，但原版是 Anthropic 品牌；真正使用前应替换成你自己的规范。",
		summary:
			"这是一个很典型的“组织专属 Skill”：让 AI 在做文档、页面和视觉物料时持续遵循同一套品牌规则。",
		fit: ["团队经常产出对外材料", "已有基本品牌规范", "想减少人工检查"],
		notFit: ["还没有品牌视觉体系", "希望直接套用 Anthropic 风格", "一次性的个人作品"],
		outcomes: ["颜色与字体更统一", "新人也能遵循规范", "评审从感觉转向规则"],
		tags: ["品牌", "设计系统", "团队协作"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "参考 brand-guidelines skill 的结构，把 docs/brand.md 改造成我们团队专用的品牌 skill，并列出仍缺失的规范。",
			claude: "使用 brand-guidelines skill 检查这份发布材料，列出不符合品牌颜色、字体和语气的地方，再给出修改稿。",
			workbuddy: "调用 brand-guidelines skill 检查这份活动海报是否符合品牌规范，并输出修改后的版本。",
		},
		installNote: {
			codex: "放入 ~/.agents/skills/ 后，先让 Codex 根据你的品牌文档完成本地化改写。",
			claude: "放入 ~/.claude/skills/；原版是 Anthropic 规范，建议复制后再替换内容。",
			workbuddy: "将改写后的技能文件夹压缩，再通过“上传技能”导入。",
		},
		sourceUrl: source("brand-guidelines"),
		licenseUrl: license("brand-guidelines"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
	{
		slug: "canvas-design",
		name: "canvas-design",
		cnName: "平面视觉画布",
		level: "完整评测",
		category: "设计",
		tagline: "把海报、封面和静态视觉从“生成一张图”升级成完整设计过程。",
		verdict:
			"对需要快速做概念稿的设计师很有启发；但它不是专业排版软件的替代品，中文字形与印刷规范仍要人工收尾。",
		summary:
			"它先建立设计哲学，再把方向落到 PNG 或 PDF。这个顺序能让成品更一致，也便于你判断 AI 为什么这么设计。",
		fit: ["做活动主视觉或文章封面", "需要快速探索方向", "愿意进行人工精修"],
		notFit: ["直接交付印刷厂", "像素级复刻现有作品", "复杂多页版式"],
		outcomes: ["先有概念再出图", "视觉元素更统一", "方便比较多个方向"],
		tags: ["海报", "封面", "视觉探索"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "使用 canvas-design skill，为“AI 产品经理周报”设计一张中文封面。先输出设计哲学，再生成 16:9 PNG。",
			claude: "请调用 canvas-design skill，为这次线下分享做一张克制、编辑感强的海报，避免模仿任何在世艺术家。",
			workbuddy: "使用 canvas-design skill 生成一张中文活动海报，主题是 AI Skills 入门，输出可分享的 PNG。",
		},
		installNote: {
			codex: "放入 ~/.agents/skills/；确认运行环境允许生成图片或 PDF 文件。",
			claude: "放入 ~/.claude/skills/；最好同时提供尺寸、用途与必须出现的文案。",
			workbuddy: "压缩技能文件夹后上传；导入前查看其脚本与文件写入权限。",
		},
		sourceUrl: source("canvas-design"),
		licenseUrl: license("canvas-design"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
	{
		slug: "webapp-testing",
		name: "webapp-testing",
		cnName: "网页验收搭档",
		level: "完整评测",
		category: "测试",
		tagline: "让 AI 真正打开网页、点击关键流程，而不是只看代码猜它能不能用。",
		verdict:
			"这是产品经理最容易低估、实际回报很高的 Skill。最适合发布前验证 3—5 条关键路径，不适合代替完整测试体系。",
		summary:
			"它使用 Playwright 操作本地网页、读取浏览器日志并截图。你可以把验收清单直接交给 AI，获得可复现的问题而不是模糊反馈。",
		fit: ["产品原型已能运行", "要验收注册、提交、支付等流程", "需要截图留证"],
		notFit: ["网页还没启动", "测试原生 App", "需要大规模性能压测"],
		outcomes: ["关键流程被真实点击", "错误附带复现步骤", "上线前更早发现阻断问题"],
		tags: ["网页测试", "验收", "Playwright"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "使用 webapp-testing skill 验收本地网站。重点测试：首页进入详情、切换工具、复制提示词、提交匿名反馈。记录失败步骤。",
			claude: "调用 webapp-testing skill 跑通这份 PRD 的 4 条核心用户路径，截图并按阻断程度整理问题。",
			workbuddy: "使用 webapp-testing skill 打开本地网页，检查表单提交与移动端布局；不要修改代码，只输出验收报告。",
		},
		installNote: {
			codex: "放入 ~/.agents/skills/；首次运行可能需要安装 Playwright 浏览器依赖。",
			claude: "放入 ~/.claude/skills/；先告诉 Claude 本地服务地址和允许测试的范围。",
			workbuddy: "上传技能包后，首次执行时只授权测试目录与本地浏览器。",
		},
		sourceUrl: source("webapp-testing"),
		licenseUrl: license("webapp-testing"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
	{
		slug: "internal-comms",
		name: "internal-comms",
		cnName: "内部沟通整理器",
		level: "完整评测",
		category: "写作",
		tagline: "把散乱进展整理成团队读得懂、能继续行动的周报和同步稿。",
		verdict:
			"最适合固定格式、高频重复的内部写作。原版格式偏作者组织习惯，第一次用要先告诉它你的模板和禁用表达。",
		summary:
			"它覆盖状态更新、领导同步、FAQ、事故报告等常见内部沟通。比通用写作提示更稳定，因为它把文体和结构变成了长期规则。",
		fit: ["每周都要写进展同步", "团队有固定汇报格式", "输入是零散笔记"],
		notFit: ["对外公关声明", "需要法律审阅的正式文件", "没有事实素材只想让 AI 编"],
		outcomes: ["信息更容易扫描", "问题与下一步更明确", "同类文档结构一致"],
		tags: ["周报", "项目同步", "FAQ"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "使用 internal-comms skill，把 notes/weekly.md 整理为本周项目同步。保留事实，不补写不存在的数据，并单列风险。",
			claude: "调用 internal-comms skill，把下面的会议笔记整理成发给跨部门同事的更新：先结论，后进展、问题和下一步。",
			workbuddy: "使用 internal-comms skill 汇总本周资料，生成一份中文周报；不确定的信息标记“待确认”。",
		},
		installNote: {
			codex: "放入 ~/.agents/skills/ 后，建议把团队模板一并加入技能目录。",
			claude: "放入 ~/.claude/skills/，第一次调用时提供一份你认可的历史范例。",
			workbuddy: "上传技能包后，可在对话中附上原始笔记并手动选择该技能。",
		},
		sourceUrl: source("internal-comms"),
		licenseUrl: license("internal-comms"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
	{
		slug: "theme-factory",
		name: "theme-factory",
		cnName: "主题样式工厂",
		level: "快速收录",
		category: "设计",
		tagline: "给文档、网页和演示快速套一套成体系的字体与配色。",
		verdict: "适合前期找方向，正式品牌项目仍应回到自己的设计系统。",
		summary: "内置多套字体与色彩主题，也能按任务生成新主题。尚未完成我的完整案例测试。",
		fit: ["快速统一多种产物", "没有现成视觉规范"],
		notFit: ["成熟品牌的正式交付", "要求独一无二的视觉系统"],
		outcomes: ["跨文件风格更一致", "降低配色选择成本"],
		tags: ["主题", "配色", "字体"],
		tools: ["codex", "claude", "workbuddy"],
		prompts: {
			codex: "使用 theme-factory skill，为这份产品报告选择一套克制、专业的主题并统一样式。",
			claude: "调用 theme-factory skill，为这套演示选择适合中文阅读的字体和配色。",
			workbuddy: "使用 theme-factory skill 统一这份文档和演示的视觉主题。",
		},
		installNote: {
			codex: "把技能文件夹放进 ~/.agents/skills/。",
			claude: "把技能文件夹放进 ~/.claude/skills/。",
			workbuddy: "下载并压缩技能文件夹，通过“上传技能”导入。",
		},
		sourceUrl: source("theme-factory"),
		licenseUrl: license("theme-factory"),
		license: "Apache-2.0",
		commit: SOURCE_COMMIT,
		reviewedAt: "2026-08-09",
	},
];

export const collections: CollectionEntry[] = [
	{
		slug: "idea-to-interface",
		title: "从模糊需求到可评审界面",
		description: "先统一品牌与视觉方向，再进入高保真实现，减少“做出来才发现方向不对”。",
		forWho: "适合设计师、产品经理和独立创作者",
		steps: [
			{ title: "把品牌规则说清楚", detail: "先确定不能被随意改变的颜色、字体和表达边界。", skillSlug: "brand-guidelines" },
			{ title: "建立视觉主张", detail: "把受众与任务翻译成页面的视觉方向。", skillSlug: "frontend-design" },
			{ title: "补一张主视觉", detail: "为发布或汇报生成同一方向的静态视觉。", skillSlug: "canvas-design" },
		],
	},
	{
		slug: "launch-check",
		title: "设计交付前的质量检查",
		description: "让 AI 真正跑一遍关键路径，并把结果变成团队能判断的问题清单。",
		forWho: "适合要发版的产品经理与设计师",
		steps: [
			{ title: "统一页面表现", detail: "先处理明显的视觉模板感与层级问题。", skillSlug: "frontend-design" },
			{ title: "真实点击关键流程", detail: "用浏览器完成任务而不是只审代码。", skillSlug: "webapp-testing" },
			{ title: "整理发布同步", detail: "把通过项、风险和下一步写成可发送的更新。", skillSlug: "internal-comms" },
		],
	},
	{
		slug: "clear-team-update",
		title: "让内部表达更清晰",
		description: "把零散记录变成一致、有结论、能推进工作的团队材料。",
		forWho: "适合产品、运营和团队负责人",
		steps: [
			{ title: "确定固定结构", detail: "把你认可的汇报格式变成长期规则。", skillSlug: "internal-comms" },
			{ title: "统一品牌呈现", detail: "让内部文档也使用一致的视觉规范。", skillSlug: "brand-guidelines" },
			{ title: "快速配一套主题", detail: "需要演示或网页时快速获得一致样式。", skillSlug: "theme-factory" },
		],
	},
];

export function getSkill(slug: string | undefined) {
	return skills.find((skill) => skill.slug === slug);
}

export function getCollection(slug: string | undefined) {
	return collections.find((collection) => collection.slug === slug);
}
