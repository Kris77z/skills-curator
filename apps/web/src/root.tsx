import type { LinksFunction, MetaFunction } from "react-router";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import "./globals.css";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600;700;800&family=Noto+Serif+SC:wght@600;700;900&display=swap",
	},
	{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export const meta: MetaFunction = () => [
	{ title: "Jungle 的 Skills 清单" },
	{
		name: "description",
		content: "给设计师和产品经理的中文 AI Skills 亲测清单。",
	},
	{ property: "og:title", content: "别再猜该装哪个 Skill" },
	{ property: "og:description", content: "Jungle 亲测、解释并持续维护的 AI Skills 清单。" },
	{ property: "og:site_name", content: "Jungle 的 Skills 清单" },
	{ property: "og:type", content: "website" },
	{ property: "og:image", content: "/skills-curator-og.png" },
	{ property: "og:image:width", content: "1729" },
	{ property: "og:image:height", content: "910" },
	{ property: "og:image:alt", content: "从许多选项中筛出五个值得尝试的 AI Skills" },
	{ name: "twitter:card", content: "summary_large_image" },
	{ name: "twitter:title", content: "别再猜该装哪个 Skill" },
	{ name: "twitter:description", content: "给设计师和产品经理的中文 AI Skills 亲测清单。" },
	{ name: "twitter:image", content: "/skills-curator-og.png" },
];

export default function Root() {
	return (
		<html lang="zh-CN">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
