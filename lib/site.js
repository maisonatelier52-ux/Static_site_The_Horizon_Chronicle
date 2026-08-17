export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Horizon Chronicle",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://horizon-chronicle.example").replace(/\/$/, ""),
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Independent. Insightful. Informed.",
  edition: process.env.NEXT_PUBLIC_SITE_EDITION || "International",
  city: process.env.NEXT_PUBLIC_SITE_CITY || "New York, USA",
  weather: process.env.NEXT_PUBLIC_SITE_WEATHER || "18°C",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "newsroom@horizon-chronicle.example",
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "",
  socials: {
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/horizonchronicle",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://facebook.com/horizonchronicle",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://instagram.com/horizonchronicle",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL ||
      "https://youtube.com/@horizonchronicle",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/company/horizonchronicle",
  },
};

export const navigation = [
  "Home",
  "World",
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Opinion",
  "Culture",
];

export const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const absoluteUrl = (path = "") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const categoryHref = (category) =>
  category === "Home" ? "/" : `/${slugify(category)}`;
