import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toolNames, type SkillEntry, type ToolId } from "~/data/catalog";
import { getPreferredTool, saveEvent, savePreferredTool, type TrialResult } from "~/lib/feedback";
import { setLibraryStatus } from "~/lib/library";
import { ToolPicker } from "./tool-picker";

export function TrialPanel({ skill }: { skill: SkillEntry }) {
	const [tool, setTool] = useState<ToolId>("workbuddy");
	const [copied, setCopied] = useState(false);
	const [started, setStarted] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [note, setNote] = useState("");

	useEffect(() => setTool(getPreferredTool()), []);

	function chooseTool(next: ToolId) {
		setTool(next);
		savePreferredTool(next);
		setCopied(false);
	}

	async function copyPrompt() {
		await navigator.clipboard.writeText(skill.prompts[tool]);
		setCopied(true);
	}

	function startTrial() {
		saveEvent({ skillSlug: skill.slug, tool, type: "started", at: new Date().toISOString() });
		setLibraryStatus(skill.slug, "trying");
		setStarted(true);
	}

	function submitResult(result: TrialResult) {
		saveEvent({
			skillSlug: skill.slug,
			tool,
			type: "result",
			result,
			note: note.trim() || undefined,
			at: new Date().toISOString(),
		});
		setLibraryStatus(skill.slug, "used");
		setSubmitted(true);
	}

	return (
		<section className="trial-panel" id="try">
			<div className="section-kicker">现在就试一次</div>
			<h2>别只收藏，先跑一个真实任务</h2>
			<p>选择你正在用的工具，我只给对应步骤和第一句提示词。</p>
			<ToolPicker value={tool} onChange={chooseTool} />

			<div className="install-box">
				<div>
					<span className="step-number">01</span>
					<h3>安装 / 导入</h3>
					<p>{skill.installNote[tool]}</p>
					<a href={skill.sourceUrl} target="_blank" rel="noreferrer">打开固定版本源文件 ↗</a>
				</div>
				<div>
					<span className="step-number">02</span>
					<h3>复制第一次提问</h3>
					<pre>{skill.prompts[tool]}</pre>
					<button className="secondary-button" type="button" onClick={copyPrompt}>
						{copied ? "已复制" : "复制提示词"}
					</button>
				</div>
			</div>

			<div className="trial-actions">
				<button className="primary-button" type="button" onClick={startTrial}>
					{started ? "已记录开始使用" : `我准备用 ${toolNames[tool]} 试试`}
				</button>
				<Link className="text-link" to={`/guides/${tool}`}>查看 {toolNames[tool]} 完整指南 →</Link>
			</div>

			{started ? (
				<div className="feedback-box" aria-live="polite">
					{submitted ? (
						<p className="success-message">收到。你的反馈只保存在这个浏览器中；正式版接入后台后才会公开聚合。</p>
					) : (
						<>
							<h3>回来告诉我：这次真的有用吗？</h3>
							<label htmlFor="feedback-note">一句话补充（可选）</label>
							<textarea
								id="feedback-note"
								value={note}
								onChange={(event) => setNote(event.target.value)}
								placeholder="比如：方向有帮助，但中文字体选得一般"
							/>
							<div className="result-buttons">
								{(["有效", "部分有效", "没效果"] as TrialResult[]).map((result) => (
									<button type="button" key={result} onClick={() => submitResult(result)}>{result}</button>
								))}
							</div>
						</>
					)}
				</div>
			) : null}
		</section>
	);
}
