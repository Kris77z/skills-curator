import { Link } from "react-router";
import type { SkillEntry } from "~/data/catalog";
import {
	setLibraryStatus,
	toggleLibraryFavorite,
	useLibrary,
	type LibraryStatus,
} from "~/lib/library";

const statusNames: Record<LibraryStatus, string> = {
	saved: "已收录",
	trying: "想尝试",
	used: "已使用",
};

export function LibraryActions({ skill, compact = false }: { skill: SkillEntry; compact?: boolean }) {
	const library = useLibrary();
	const record = library.find((item) => item.skillSlug === skill.slug);

	return (
		<div className={`library-actions ${compact ? "compact" : ""}`}>
			<label>
				<span className="sr-only">{skill.cnName}的资源状态</span>
				<select
					value={record?.status ?? ""}
					onChange={(event) => setLibraryStatus(skill.slug, event.target.value as LibraryStatus)}
				>
					<option value="" disabled>加入我的 Skills</option>
					{Object.entries(statusNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
				</select>
			</label>
			<button
				type="button"
				className={record?.favorite ? "favorite active" : "favorite"}
				aria-pressed={record?.favorite ?? false}
				onClick={() => toggleLibraryFavorite(skill.slug)}
			>
				{record?.favorite ? "★ 已收藏" : "☆ 收藏"}
			</button>
			{compact ? null : <Link to="/library">打开我的 Skills →</Link>}
		</div>
	);
}
