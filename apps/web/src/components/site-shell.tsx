import { Link } from "react-router";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
	return (
		<div className="site-frame">
			<header className="site-header">
				<Link className="brand" to="/" aria-label="返回首页">
					<span className="brand-mark">J</span>
					<span>
						<strong>Jungle 的 Skills 清单</strong>
						<small>亲测、解释、持续维护</small>
					</span>
				</Link>
				<nav aria-label="主导航">
					<Link to="/discover">发现</Link>
					<Link to="/library">我的 Skills</Link>
					<Link to="/guides/workbuddy">怎么安装</Link>
					<a href="https://github.com/Kris77z/skills-curator" target="_blank" rel="noreferrer">
						GitHub ↗
					</a>
				</nav>
			</header>
			<main>{children}</main>
			<footer className="site-footer">
				<div>
					<strong>不是最多，而是我愿意推荐给朋友的。</strong>
					<p>独立中文解释与体验判断；Skill 原始版权归各自作者。</p>
				</div>
				<div className="footer-links">
					<Link to="/discover">发现</Link>
					<Link to="/library">我的 Skills</Link>
					<Link to="/guides/workbuddy">使用指南</Link>
				</div>
			</footer>
		</div>
	);
}
