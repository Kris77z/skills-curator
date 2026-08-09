import { Link, useParams, type MetaFunction } from "react-router";
import { SiteShell } from "~/components/site-shell";
import { TrialPanel } from "~/components/trial-panel";
import { getSkill, skills } from "~/data/catalog";

export const meta: MetaFunction = ({ params }) => {
	const skill = getSkill(params.slug);
	return [{ title: skill ? `${skill.cnName}｜Jungle 的 Skills 清单` : "Skill 未找到" }];
};

export default function SkillDetail() {
	const { slug } = useParams();
	const skill = getSkill(slug);

	if (!skill) {
		return <SiteShell><section className="empty-state"><h1>这个 Skill 还没收录</h1><Link to="/">返回清单</Link></section></SiteShell>;
	}

	const related = skills.filter((entry) => entry.slug !== skill.slug && entry.category === skill.category).slice(0, 2);

	return (
		<SiteShell>
			<section className="detail-hero section-shell">
				<div className="breadcrumb"><Link to="/">首页</Link><span>/</span><span>{skill.level}</span></div>
				<div className="detail-title-grid">
					<div>
						<div className="eyebrow">{skill.category} · {skill.level}</div>
						<h1>{skill.cnName}</h1>
						<code>{skill.name}</code>
						<p className="detail-tagline">{skill.tagline}</p>
					</div>
					<aside className="verdict-card">
						<span>Jungle 的判断</span>
						<p>“{skill.verdict}”</p>
						<a href="#try">跳到第一次使用 →</a>
					</aside>
				</div>
			</section>

			<section className="section-shell detail-content">
				<div className="detail-main">
					<section className="content-section">
						<div className="section-kicker">一句人话解释</div>
						<h2>它到底改变什么？</h2>
						<p className="lead-paragraph">{skill.summary}</p>
						<ul className="outcome-list">
							{skill.outcomes.map((outcome, index) => <li key={outcome}><span>0{index + 1}</span>{outcome}</li>)}
						</ul>
					</section>

					<section className="fit-grid content-section">
						<div className="fit-card yes"><h2>适合你，如果</h2><ul>{skill.fit.map((item) => <li key={item}>{item}</li>)}</ul></div>
						<div className="fit-card no"><h2>先别装，如果</h2><ul>{skill.notFit.map((item) => <li key={item}>{item}</li>)}</ul></div>
					</section>

					<TrialPanel skill={skill} />
				</div>

				<aside className="source-panel">
					<div className="section-kicker">可追溯信息</div>
					<dl>
						<div><dt>来源</dt><dd><a href={skill.sourceUrl} target="_blank" rel="noreferrer">anthropics/skills ↗</a></dd></div>
						<div><dt>许可</dt><dd><a href={skill.licenseUrl} target="_blank" rel="noreferrer">{skill.license} ↗</a></dd></div>
						<div><dt>评测版本</dt><dd><code>{skill.commit.slice(0, 8)}</code></dd></div>
						<div><dt>最近检查</dt><dd>{skill.reviewedAt}</dd></div>
					</dl>
					<p>中文说明是独立策展内容，不替代原作者文档。安装第三方 Skill 前，请自行检查脚本、权限与数据外发范围。</p>
				</aside>
			</section>

			{related.length > 0 ? (
				<section className="section-shell related-section"><div className="section-kicker">同类继续看</div><div className="related-grid">{related.map((entry) => <Link to={`/skills/${entry.slug}`} key={entry.slug}><span>{entry.level}</span><strong>{entry.cnName}</strong><p>{entry.tagline}</p></Link>)}</div></section>
			) : null}
		</SiteShell>
	);
}
