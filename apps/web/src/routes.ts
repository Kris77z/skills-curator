import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/_index.tsx"),
	route("skills/:slug", "routes/skill-detail.tsx"),
	route("collections/:slug", "routes/collection-detail.tsx"),
	route("guides/:tool", "routes/tool-guide.tsx"),
] satisfies RouteConfig;
