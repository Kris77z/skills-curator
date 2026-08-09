import { useEffect, useState } from "react";
import { toolNames, type ToolId } from "~/data/catalog";
import { getPreferredTool, savePreferredTool } from "~/lib/feedback";

export function ToolPicker({
	value,
	onChange,
}: {
	value?: ToolId;
	onChange?: (tool: ToolId) => void;
}) {
	const [tool, setTool] = useState<ToolId>(value ?? "workbuddy");

	useEffect(() => {
		if (value) {
			setTool(value);
			return;
		}
		setTool(getPreferredTool());
	}, [value]);

	function choose(next: ToolId) {
		setTool(next);
		savePreferredTool(next);
		onChange?.(next);
	}

	return (
		<div className="tool-picker" role="group" aria-label="选择你使用的 AI 工具">
		{(Object.keys(toolNames) as ToolId[]).map((id) => (
			<button
				key={id}
				type="button"
				className={tool === id ? "active" : ""}
				aria-pressed={tool === id}
				onClick={() => choose(id)}
			>
				{toolNames[id]}
			</button>
		))}
		</div>
	);
}
