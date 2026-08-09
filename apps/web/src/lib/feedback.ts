import type { ToolId } from "~/data/catalog";

const STORAGE_KEY = "skills-curator-feedback-v1";
const TOOL_KEY = "skills-curator-tool-v1";

export type TrialResult = "有效" | "部分有效" | "没效果";

export type TrialEvent = {
	skillSlug: string;
	tool: ToolId;
	type: "started" | "result";
	result?: TrialResult;
	note?: string;
	at: string;
};

function readEvents(): TrialEvent[] {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as TrialEvent[];
	} catch {
		return [];
	}
}

export function saveEvent(event: TrialEvent) {
	if (typeof window === "undefined") return;
	const events = readEvents();
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...events.slice(-49), event]));
}

export function getPreferredTool(): ToolId {
	if (typeof window === "undefined") return "workbuddy";
	const value = window.localStorage.getItem(TOOL_KEY);
	return value === "codex" || value === "claude" || value === "workbuddy"
		? value
		: "workbuddy";
}

export function savePreferredTool(tool: ToolId) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(TOOL_KEY, tool);
}
