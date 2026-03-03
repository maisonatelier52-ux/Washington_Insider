// utils/slugify.js
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // spaces → hyphen
    .replace(/[^\w\-]+/g, "")       // remove non-word chars
    .replace(/\-\-+/g, "-")         // multiple hyphens → one
    .replace(/^-+/, "")             // remove leading hyphens
    .replace(/-+$/, "");            // remove trailing hyphens
}