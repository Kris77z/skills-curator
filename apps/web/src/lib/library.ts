import { useSyncExternalStore } from "react";

export type LibraryStatus = "saved" | "trying" | "used";

export type LibraryRecord = {
	skillSlug: string;
	status: LibraryStatus;
	favorite: boolean;
	addedAt: string;
};

const STORAGE_KEY = "skills-curator-library-v1";
const EMPTY_LIBRARY: LibraryRecord[] = [];
const listeners = new Set<() => void>();
let cache: LibraryRecord[] | null = null;
let storageListenerBound = false;

function readLibrary(): LibraryRecord[] {
	if (typeof window === "undefined") return EMPTY_LIBRARY;
	if (cache) return cache;
	try {
		const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as LibraryRecord[];
		cache = Array.isArray(value) ? value : [];
	} catch {
		cache = [];
	}
	return cache;
}

function emit() {
	for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	if (typeof window !== "undefined" && !storageListenerBound) {
		window.addEventListener("storage", (event) => {
			if (event.key !== STORAGE_KEY) return;
			cache = null;
			emit();
		});
		storageListenerBound = true;
	}
	return () => listeners.delete(listener);
}

function writeLibrary(records: LibraryRecord[]) {
	cache = records;
	if (typeof window !== "undefined") {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
	}
	emit();
}

export function useLibrary() {
	return useSyncExternalStore(subscribe, readLibrary, () => EMPTY_LIBRARY);
}

export function setLibraryStatus(skillSlug: string, status: LibraryStatus) {
	const records = readLibrary();
	const existing = records.find((record) => record.skillSlug === skillSlug);
	const next = existing
		? records.map((record) => record.skillSlug === skillSlug ? { ...record, status } : record)
		: [...records, { skillSlug, status, favorite: false, addedAt: new Date().toISOString() }];
	writeLibrary(next);
}

export function toggleLibraryFavorite(skillSlug: string) {
	const records = readLibrary();
	const existing = records.find((record) => record.skillSlug === skillSlug);
	const next = existing
		? records.map((record) => record.skillSlug === skillSlug ? { ...record, favorite: !record.favorite } : record)
		: [...records, { skillSlug, status: "saved" as const, favorite: true, addedAt: new Date().toISOString() }];
	writeLibrary(next);
}

export function removeFromLibrary(skillSlug: string) {
	writeLibrary(readLibrary().filter((record) => record.skillSlug !== skillSlug));
}
