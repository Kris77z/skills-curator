import { useMemo, useState } from "react";
import { Link, type MetaFunction } from "react-router";
import { SiteShell } from "~/components/site-shell";
import { SkillCard } from "~/components/skill-card";
import { collections, skills } from "~/data/catalog";

export const meta: MetaFunction = () => [
	{ title: "Jungle 的 Skills 清单｜给设计师和产品经理的亲测推荐" },
	{
		name: "description",
		content: "不追求最多，只解释这个 AI Skill 能帮你什么、适不适合你，以及我真实使用后的判断。",
	},
];

const categories = ["全部", "设计", "产品", "写作", "测试"] as const;

export default function Home() {
	const [category, setCategory] = useState<(typeof categories)[number]>("全部");
	const visibleSkills = useMemo(
		() => category === "全部" ? skills : skills.filter((skill) => skill.category === category),
		[category],
	);

	return (
		<SiteShell>
			<section className="hero section-shell">
				<div className="hero-copy">
					<div className="eyebrow">Jungle 亲测 · 面向非开发者</div>
					<h1>别再猜<br />该装哪个 Skill。</h1>
					<p className="hero-lede">
						我把 GitHub 上值得看的 AI Skills 翻成你能判断的中文：它能帮什么、适合谁、有什么坑，以及第一次怎么用。
					</p>
					<div className="hero-actions">
						<a className="primary-button" href="#collections">按任务开始</a>
						<a className="secondary-button" href="#skills">直接看 Skills</a>
					</div>
				</div>
				<aside className="curator-note">
					<div className="note-label">本期策展手记 · 01</div>
					<p>“Skill 不是装得越多越好。真正值得装的，是它能不能让一次具体任务更稳定。”</p>
					<div className="signature">Jungle</div>
					<dl>
						<div><dt>6</dt><dd>首批收录</dd></div>
						<div><dt>5</dt><dd>完整解释</dd></div>
						<div><dt>1</dt><dd>独立维护者</dd></div>
					</dl>
				</aside>
			</section>

			<section className="promise-strip" aria-label="内容承诺">
				<span>每个来源可追溯</span>
				<span>不把收藏数当效果</span>
				<span>明确写不适合谁</span>
				<span>体验结论与原文分开</span>
			</section>

			<section className="section-shell section-block" id="collections">
				<div className="section-heading">
					<div><div className="section-kicker">先选任务，不用懂术语</div><h2>你今天想完成什么？</h2></div>
					<p>单个 Skill 很抽象，真实工作通常是一条流程。这三份清单把它们串成可执行的顺序。</p>
				</div>
				<div className="collection-grid">
					{collections.map((collection, index) => (
						<Link className="collection-card" to={`/collections/${collection.slug}`} key={collection.slug}>
							<span className="collection-index">0{index + 1}</span>
							<h3>{collection.title}</h3>
							<p>{collection.description}</p>
							<small>{collection.forWho}</small>
							<strong>打开任务清单 →</strong>
						</Link>
					))}
				</div>
			</section>

			<section className="section-shell section-block" id="skills">
				<div className="section-heading skill-heading">
					<div><div className="section-kicker">首批亲测清单</div><h2>知道它为什么值得装</h2></div>
					<div className="filter-row" role="group" aria-label="按场景筛选">
						{categories.map((item) => (
							<button
								key={item}
								type="button"
								aria-pressed={category === item}
								className={category === item ? "active" : ""}
								onClick={() => setCategory(item)}
							>{item}</button>
						))}
					</div>
				</div>
				<div className="skill-grid">
					{visibleSkills.map((skill) => <SkillCard skill={skill} key={skill.slug} />)}
				</div>
			</section>

			<section className="method-section">
				<div className="section-shell method-grid">
					<div>
						<div className="section-kicker light">我的评测方法</div>
						<h2>证据比热度重要。</h2>
						<p>我不会给一个刚看到的 Skill 打五星。完整评测至少回答四件事：真实任务、结果变化、失败边界、来源与许可。</p>
					</div>
					<ol className="method-list">
						<li><span>01</span><div><strong>读原始文件</strong><p>检查 Skill 会要求 AI 做什么，有没有脚本或外部权限。</p></div></li>
						<li><span>02</span><div><strong>跑一个真实任务</strong><p>不是演示题，而是设计师或产品经理真的会遇到的工作。</p></div></li>
						<li><span>03</span><div><strong>记录哪里没用</strong><p>把适用边界写出来，比一句“强烈推荐”更值得信任。</p></div></li>
					</ol>
				</div>
			</section>
		</SiteShell>
	);
}
