import { slugify } from "./site";
import authorsData from "../public/data/authors.json";
import articlesData from "../public/data/articles.json";

// Content now lives on disk as JSON, matching the public/data/articles.json
// and public/data/authors.json shape: articles grouped by category slug,
// authors as a flat list plus a category → author lookup table.
export const authors = authorsData.authors;

export const articles = Object.values(articlesData)
  .flat()
  .sort((a, b) => a.id - b.id);

export const categories = [
  "World",
  "Politics",
  "Business",
  "Finance",
  "U.S",
  "Technology",
  "Science",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Opinion",
  "Culture",
];

export const categoryDescriptions = {
  World: "Diplomacy, conflict, migration, climate, and the decisions connecting communities across borders.",
  Politics: "Elections, institutions, public policy, and the people responsible for turning promises into government.",
  Business: "Markets, companies, work, trade, and the forces shaping household and global economies.",
  Finance: "Markets, investing, personal finance, central banks, and the money decisions shaping households and institutions.",
  Technology: "Artificial intelligence, cybersecurity, platforms, devices, and the rules emerging around innovation.",
  Science: "Space, medicine, climate research, discovery, and careful explanations of evidence and uncertainty.",
  Sports: "Competition, athlete welfare, sports business, and the culture shared by teams and supporters.",
  Entertainment: "Film, television, music, performance, and the changing business of global attention.",
  Lifestyle: "Health, travel, food, design, and practical ideas for living with greater intention.",
  Opinion: "Evidence-led arguments, sharp perspectives, and constructive disagreement from across the newsroom.",
  Culture: "Art, books, heritage, memory, and the creators reshaping how societies understand themselves.",
};

export const getAuthor = (slug) => authors.find((author) => author.slug === slug);
export const getArticle = (category, slug) =>
  articles.find(
    (article) => slugify(article.category) === category && article.slug === slug,
  );
export const getArticleBySlug = (slug) =>
  articles.find((article) => article.slug === slug);
export const getCategoryArticles = (category) =>
  articles.filter((article) => slugify(article.category) === slugify(category));
export const getAuthorArticles = (authorSlug) =>
  articles.filter((article) => article.authorSlug === authorSlug);

// Article dates in the JSON are stored as "DD/MM/YYYY" (e.g. "28/08/2026").
// `new Date("28/08/2026")` cannot be trusted to parse that correctly across
// environments (V8 in particular reads slash-separated dates as
// MM/DD/YYYY, which would silently produce the wrong date or an Invalid
// Date for any day > 12). So we parse it manually instead of handing the
// raw string to the Date constructor.
function parseArticleDate(value) {
  if (!value || typeof value !== "string") return null;

  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  // Guard against values like 31/02/2026 that match the pattern but aren't
  // real calendar dates (JS Date will roll them into the next month).
  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

export const formatDate = (value, short = false) => {
  const date = parseArticleDate(value);

  if (!date) {
    console.warn(`formatDate: invalid date value "${value}"`);
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: short ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export const searchArticles = (query = "") => {
  const needle = query.trim().toLowerCase();
  if (!needle) return articles;
  return articles.filter((article) => {
    const author = getAuthor(article.authorSlug);
    return [article.title, article.excerpt, article.category, author?.name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
};

export const getAdjacentArticles = (article) => {
  const categoryArticles = getCategoryArticles(article.category);
  const index = categoryArticles.findIndex((item) => item.slug === article.slug);
  return {
    previous: index > 0 ? categoryArticles[index - 1] : null,
    next: index < categoryArticles.length - 1 ? categoryArticles[index + 1] : null,
  };
};

// Article bodies now live directly on each article as a `content` array of
// typed blocks (heading / paragraph / image / quote), matching
// public/data/articles.json. articleSections() groups that flat block list
// into per-heading sections so the article page can render scroll-anchored
// sections and build an "In this story" table of contents from them.
export function articleSections(article) {
  const blocks = article.content || [];
  const sections = [];
  let current = null;

  blocks.forEach((block) => {
    if (block.type === "heading") {
      current = { id: slugify(block.text), title: block.text, blocks: [] };
      sections.push(current);
      return;
    }
    if (!current) {
      current = { id: "overview", title: "", blocks: [] };
      sections.push(current);
    }
    current.blocks.push(block);
  });

  return sections;
}

export function articleWordCount(article) {
  return [
    article.title,
    article.excerpt,
    article.metaDescription,
    ...article.keyTakeaways,
    article.quote,
    ...(article.content || []).flatMap((block) => (block.text ? [block.text] : [])),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length;
}

export function getArticleImages(article) {
  const inline = (article.content || []).find((block) => block.type === "image");
  return [article.image, inline?.src].filter(Boolean);
}