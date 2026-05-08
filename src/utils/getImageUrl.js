import { API_BASE } from "../_api";

export function getImageCandidates(path) {
  if (!path || typeof path !== "string") return [];

  const raw = path.trim();
  if (!raw) return [];

  // Normalize Windows-style paths and common Laravel storage prefixes.
  const normalized = raw
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .replace(/^storage\/app\/public\//i, "")
    .replace(/^public\//i, "");

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return [normalized];
  }

  const withoutLeadingSlash = normalized.replace(/^\/+/, "");
  const candidates = new Set();

  const add = (p) => {
    if (!p) return;
    candidates.add(`${API_BASE}/${String(p).replace(/^\/+/, "")}`);
  };

  if (normalized.startsWith("/")) {
    candidates.add(`${API_BASE}${normalized}`);
  }

  add(withoutLeadingSlash);
  add(`storage/${withoutLeadingSlash}`);

  if (!withoutLeadingSlash.startsWith("covers/")) {
    add(`covers/${withoutLeadingSlash}`);
    add(`storage/covers/${withoutLeadingSlash}`);
  } else {
    add(`storage/${withoutLeadingSlash}`);
  }

  return Array.from(candidates);
}

export default function getImageUrl(path) {
  const candidates = getImageCandidates(path);
  return candidates[0] || null;
}
