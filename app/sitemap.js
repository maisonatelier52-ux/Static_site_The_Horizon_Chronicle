import { articles, authors, categories } from "@/lib/content";
import { policies } from "@/lib/policies";
import { absoluteUrl, slugify } from "@/lib/site";

export default function sitemap(){
  const base = ["", "about", "contact", "search", ...Object.keys(policies)].map((path) => ({ url: absoluteUrl(path), lastModified: new Date("2026-08-13"), changeFrequency: path ? "monthly" : "daily", priority: path ? 0.6 : 1 }));
  const categoryUrls = categories.map((category) => ({ url: absoluteUrl(slugify(category)), lastModified: new Date("2026-08-13"), changeFrequency: "daily", priority: 0.8 }));
  const authorUrls = authors.map((author) => ({ url: absoluteUrl(`author/${author.slug}`), lastModified: new Date("2026-08-13"), changeFrequency: "weekly", priority: 0.7 }));
  const articleUrls = articles.map((article) => ({ url: absoluteUrl(`${slugify(article.category)}/${article.slug}`), lastModified: new Date(article.publishedAt), changeFrequency: "weekly", priority: 0.75 }));
  return [...base, ...categoryUrls, ...authorUrls, ...articleUrls];
}
