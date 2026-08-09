import { NavLink } from "react-router";
import type { ReactNode } from "react";

const navigation = [
	{ to: "/discover", label: "发现", mark: "⌕" },
	{ to: "/library", label: "我的 Skills", mark: "▦" },
];

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<div className="resource-app">
			<aside className="resource-sidebar">
				<NavLink to="/" className="resource-brand">
					<span>J</span>
					<div><strong>Skills 清单</strong><small>by Jungle</small></div>
				</NavLink>
				<nav aria-label="资源管理">
					<div className="nav-label">资源</div>
					{navigation.map((item) => (
						<NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "active" : ""}>
							<span aria-hidden="true">{item.mark}</span>{item.label}
						</NavLink>
					))}
					<div className="nav-label">指南</div>
					<NavLink to="/guides/codex"><span aria-hidden="true">C</span>Codex</NavLink>
					<NavLink to="/guides/claude"><span aria-hidden="true">A</span>Claude Code</NavLink>
					<NavLink to="/guides/workbuddy"><span aria-hidden="true">W</span>WorkBuddy</NavLink>
				</nav>
				<div className="resource-mode-note">
					<span>Web v0.1</span>
					<strong>资源管理模式</strong>
					<p>不读取本机目录，所有状态由你手动维护。</p>
				</div>
			</aside>
			<div className="resource-main">
				<header className="resource-topbar">
					<NavLink to="/" className="back-to-site">← 落地页</NavLink>
					<div><span className="status-dot" />本地资源库</div>
				</header>
				<main>{children}</main>
			</div>
		</div>
	);
}
