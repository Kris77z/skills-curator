import { useMemo, useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { AppShell } from "~/components/app-shell";
import { LibraryActions } from "~/components/library-actions";
import { collections, skills } from "~/data/catalog";

export const meta: MetaFunction = () => [
	{ title: "发现 Skills｜Jungle 的 Skills 清单" },
	{ name: "description", content: "按任务和角色发现经过中文解释的 AI Skills。" },
];

const filters = ["全部", "设计", "产品", "写作", "测试"] as const;

export default function Discover() {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState<(typeof filters)[number]>("全部");
	const visibleSkills = useMemo(() => {
		const normalized = query.trim().toLocaleLowerCase("zh-CN");
		return skills.filter((skill) => {
			const categoryMatches = category === "全部" || skill.category === category;
			const queryMatches = !normalized || [skill.name, skill.cnName, skill.tagline, ...skill.tags]
				.join(" ")
				.toLocaleLowerCase("zh-CN")
				.includes(normalized);
			return categoryMatches && queryMatches;
		});
	}, [category, query]);

	return (
		<AppShell>
			<section className="resource-page">
				<header className="resource-page-header">
					<div><span className="resource-eyebrow">Curated by Jungle</span><h1>发现值得尝试的 Skills</h1><p>不是抓取来的大目录，而是读过来源、讲清用途和边界的小清单。</p></div>
					<div className="resource-count"><strong>{skills.length}</strong><span>已收录资源</span></div>
				</header>

				<div className="resource-toolbar">
					<label className="resource-search">
						<span aria-hidden="true">⌕</span>
						<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索任务、Skill 或标签" />
					</label>
					<div className="resource-filters" role="group" aria-label="按分类筛选">
						{filters.map((filter) => <button type="button" key={filter} className={category === filter ? "active" : ""} aria-pressed={category === filter} onClick={() => setCategory(filter)}>{filter}</button>)}
					</div>
				</div>

				<div className="resource-layout">
					<div className="resource-list">
						<div className="resource-list-label"><span>{visibleSkills.length} 个结果</span><span>中文解释 · 来源可追溯</span></div>
						{visibleSkills.map((skill) => (
							<article className="resource-row" key={skill.slug}>
								<div className="resource-row-main">
									<div className="resource-row-meta"><span className={skill.level === "完整评测" ? "full" : "quick"}>{skill.level}</span><span>{skill.category}</span><code>{skill.name}</code></div>
									<Link to={`/skills/${skill.slug}`}><h2>{skill.cnName}</h2></Link>
									<p>{skill.tagline}</p>
									<div className="resource-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
								</div>
								<div className="resource-row-actions">
									<LibraryActions skill={skill} compact />
									<Link className="row-detail-link" to={`/skills/${skill.slug}`}>查看解释与使用方法 →</Link>
								</div>
							</article>
						))}
						{visibleSkills.length === 0 ? <div className="resource-empty"><strong>没有匹配的 Skill</strong><p>换个任务词试试，或清除分类筛选。</p></div> : null}
					</div>

					<aside className="collection-rail">
						<div className="resource-eyebrow">按任务找</div>
						<h2>组合清单</h2>
						{collections.map((collection, index) => (
							<Link to={`/collections/${collection.slug}`} key={collection.slug}>
								<span>0{index + 1}</span><strong>{collection.title}</strong><small>{collection.steps.length} 个步骤</small>
							</Link>
						))}
					</aside>
				</div>
			</section>
		</AppShell>
	);
}
