import { useMemo, useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { AppShell } from "~/components/app-shell";
import { getSkill } from "~/data/catalog";
import { removeFromLibrary, setLibraryStatus, toggleLibraryFavorite, useLibrary, type LibraryStatus } from "~/lib/library";

export const meta: MetaFunction = () => [
	{ title: "我的 Skills｜Jungle 的 Skills 清单" },
	{ name: "description", content: "整理你想尝试、已经使用和收藏的 AI Skills 资源。" },
];

const tabs = [
	{ id: "all", label: "全部" },
	{ id: "trying", label: "想尝试" },
	{ id: "used", label: "已使用" },
	{ id: "favorite", label: "收藏" },
] as const;

const statusNames: Record<LibraryStatus, string> = { saved: "已收录", trying: "想尝试", used: "已使用" };

export default function Library() {
	const library = useLibrary();
	const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
	const rows = useMemo(() => library.flatMap((record) => {
		const skill = getSkill(record.skillSlug);
		if (!skill) return [];
		if (tab === "trying" && record.status !== "trying") return [];
		if (tab === "used" && record.status !== "used") return [];
		if (tab === "favorite" && !record.favorite) return [];
		return [{ record, skill }];
	}), [library, tab]);

	return (
		<AppShell>
			<section className="resource-page library-page">
				<header className="resource-page-header">
					<div><span className="resource-eyebrow">Your resource library</span><h1>我的 Skills</h1><p>这是你的资源清单，不代表网站读取了本机安装状态。</p></div>
					<div className="resource-count"><strong>{library.length}</strong><span>已管理资源</span></div>
				</header>

				<div className="library-notice"><span>i</span><p><strong>Web 资源管理模式</strong>：状态由你手动维护，只保存在这个浏览器；不会扫描 Codex、Claude 或 WorkBuddy 的本地目录。</p></div>

				<div className="library-tabs" role="tablist" aria-label="资源状态">
					{tabs.map((item) => <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}>{item.label}</button>)}
				</div>

				{rows.length > 0 ? (
					<div className="library-table">
						<div className="library-table-head"><span>Skill</span><span>状态</span><span>收藏</span><span>操作</span></div>
						{rows.map(({ record, skill }) => (
							<article key={skill.slug}>
								<div className="library-skill-cell"><div className="library-skill-mark">{skill.cnName.slice(0, 1)}</div><div><Link to={`/skills/${skill.slug}`}><strong>{skill.cnName}</strong></Link><code>{skill.name}</code><p>{skill.tagline}</p></div></div>
								<label className="library-status-cell"><span className="sr-only">资源状态</span><select value={record.status} onChange={(event) => setLibraryStatus(skill.slug, event.target.value as LibraryStatus)}>{Object.entries(statusNames).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
								<button className={record.favorite ? "library-star active" : "library-star"} type="button" aria-label={record.favorite ? "取消收藏" : "收藏"} aria-pressed={record.favorite} onClick={() => toggleLibraryFavorite(skill.slug)}>{record.favorite ? "★" : "☆"}</button>
								<div className="library-row-links"><Link to={`/skills/${skill.slug}`}>查看</Link><button type="button" onClick={() => removeFromLibrary(skill.slug)}>移除</button></div>
							</article>
						))}
					</div>
				) : (
					<div className="library-empty">
						<div className="empty-folder">＋</div>
						<h2>{library.length === 0 ? "你的资源库还是空的" : "这个分类里还没有 Skill"}</h2>
						<p>{library.length === 0 ? "从发现页选择“想尝试”或点击收藏，资源就会出现在这里。" : "可以切换到“全部”，或者继续发现新的资源。"}</p>
						<Link className="primary-button" to="/discover">去发现 Skills</Link>
					</div>
				)}
			</section>
		</AppShell>
	);
}
