import { Link, useParams, type MetaFunction } from "react-router";
import { SiteShell } from "~/components/site-shell";
import { skills, toolNames, type ToolId } from "~/data/catalog";

const guides: Record<ToolId, { intro: string; steps: string[]; path: string; official: string }> = {
	codex: {
		intro: "适合愿意让 AI 直接处理本地文件、代码和交付物的用户。技能通常以文件夹形式放入个人 Skills 目录。",
		steps: ["在评测页打开固定版本的 GitHub 源文件", "下载完整技能文件夹，保留 SKILL.md 与其依赖文件", "放入 ~/.agents/skills/，然后新建任务", "第一次明确说“使用某某 skill”，并给一个边界清晰的小任务"],
		path: "~/.agents/skills/<skill-name>/SKILL.md",
		official: "https://developers.openai.com/codex/skills",
	},
	claude: {
		intro: "适合已经在 Claude Code 中工作的用户。个人技能与项目技能可以分开管理，先从个人目录开始最省事。",
		steps: ["从评测页打开 Skill 的固定版本", "下载完整文件夹，不要只复制 SKILL.md", "放入 ~/.claude/skills/ 后开启新会话", "提供真实素材并点名调用，观察它是否遵循技能流程"],
		path: "~/.claude/skills/<skill-name>/SKILL.md",
		official: "https://docs.anthropic.com/en/docs/claude-code",
	},
	workbuddy: {
		intro: "对非开发者最友好：不需要操作终端，可以直接上传本地技能包。安装第三方 Skill 前仍要查看来源和权限。",
		steps: ["在评测页打开固定版本源文件并下载完整文件夹", "把单个 Skill 文件夹压缩为 ZIP", "打开“技能 → 添加技能 → 上传技能”并选择 ZIP", "新建任务，手动选择已安装技能，再粘贴第一次提问"],
		path: "技能 → 添加技能 → 上传技能",
		official: "https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market",
	},
};

export const meta: MetaFunction = ({ params }) => {
	const tool = params.tool as ToolId;
	return [{ title: `${toolNames[tool] ?? "工具"} 安装 Skills｜Jungle 的 Skills 清单` }];
};

export default function ToolGuide() {
	const { tool: rawTool } = useParams();
	const tool = rawTool as ToolId;
	const guide = guides[tool];

	if (!guide) return <SiteShell><section className="empty-state"><h1>暂时没有这个工具的指南</h1><Link to="/">返回首页</Link></section></SiteShell>;

	return (
		<SiteShell>
			<section className="guide-hero section-shell">
				<div className="breadcrumb"><Link to="/">首页</Link><span>/</span><span>安装指南</span></div>
				<div className="section-kicker">给第一次安装 Skill 的你</div>
				<h1>{toolNames[tool]} 怎么安装 Skills？</h1>
				<p>{guide.intro}</p>
			</section>
			<section className="section-shell guide-layout">
				<ol className="guide-steps">
					{guide.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
				</ol>
				<aside className="guide-aside">
					<span>常用位置 / 入口</span><code>{guide.path}</code>
					<a href={guide.official} target="_blank" rel="noreferrer">查看官方说明 ↗</a>
					<p>路径和界面可能随版本变化。若与你的客户端不同，以官方最新说明为准。</p>
				</aside>
			</section>
			<section className="section-shell guide-recommendations">
				<div className="section-kicker">装好以后从这里开始</div>
				<div>{skills.filter((skill) => skill.tools.includes(tool)).slice(0, 3).map((skill) => <Link to={`/skills/${skill.slug}`} key={skill.slug}><code>{skill.name}</code><strong>{skill.cnName}</strong><span>查看第一次提问 →</span></Link>)}</div>
			</section>
		</SiteShell>
	);
}
