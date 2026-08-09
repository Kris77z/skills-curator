import { Link } from "react-router";
import type { SkillEntry } from "~/data/catalog";

export function SkillCard({ skill }: { skill: SkillEntry }) {
	return (
		<article className="skill-card">
			<div className="card-topline">
				<span className={`review-level ${skill.level === "完整评测" ? "full" : "quick"}`}>
					{skill.level}
				</span>
				<span>{skill.category}</span>
			</div>
			<h3>{skill.cnName}</h3>
			<code>{skill.name}</code>
			<p className="skill-tagline">{skill.tagline}</p>
			<blockquote>“{skill.verdict}”</blockquote>
			<div className="tag-row" aria-label="标签">
				{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
			</div>
			<Link className="text-link" to={`/skills/${skill.slug}`}>
				看它到底有没有用 <span aria-hidden="true">→</span>
			</Link>
		</article>
	);
}
