import { Link, useParams, type MetaFunction } from "react-router";
import { SiteShell } from "~/components/site-shell";
import { getCollection, getSkill } from "~/data/catalog";

export const meta: MetaFunction = ({ params }) => {
	const collection = getCollection(params.slug);
	return [{ title: collection ? `${collection.title}｜Jungle 的 Skills 清单` : "清单未找到" }];
};

export default function CollectionDetail() {
	const { slug } = useParams();
	const collection = getCollection(slug);

	if (!collection) return <SiteShell><section className="empty-state"><h1>这份清单不存在</h1><Link to="/">返回首页</Link></section></SiteShell>;

	return (
		<SiteShell>
			<section className="collection-hero section-shell">
				<div className="breadcrumb"><Link to="/">首页</Link><span>/</span><span>任务清单</span></div>
				<div className="section-kicker">三步完成一个真实任务</div>
				<h1>{collection.title}</h1>
				<p>{collection.description}</p>
				<span className="audience-label">{collection.forWho}</span>
			</section>

			<section className="section-shell workflow-list">
				{collection.steps.map((step, index) => {
					const skill = getSkill(step.skillSlug);
					if (!skill) return null;
					return (
						<article key={step.skillSlug}>
							<div className="workflow-number">0{index + 1}</div>
							<div className="workflow-copy"><span>{skill.category}</span><h2>{step.title}</h2><p>{step.detail}</p></div>
							<div className="workflow-skill"><code>{skill.name}</code><strong>{skill.cnName}</strong><p>{skill.tagline}</p><Link to={`/skills/${skill.slug}`}>看评测与使用方法 →</Link></div>
						</article>
					);
				})}
			</section>

			<section className="section-shell collection-cta">
				<div><div className="section-kicker">第一次使用建议</div><h2>一次只启用一个新 Skill。</h2><p>先用第一个步骤跑完一件小事，确认结果变化后再继续。这样你才知道效果来自哪里。</p></div>
				<Link className="primary-button" to={`/skills/${collection.steps[0].skillSlug}`}>从第 1 步开始</Link>
			</section>
		</SiteShell>
	);
}
