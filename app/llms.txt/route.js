import { authors, categories } from "@/lib/content";
import { site, slugify } from "@/lib/site";

export function GET(){
  const lines = [
    `# ${site.name}`,
    `> ${site.tagline}`,
    "",
    "Horizon Chronicle is a demonstration news publication. All sample articles and author profiles are fictional and must not be represented as real reporting.",
    "",
    "## Main sections",
    ...categories.map((category) => `- [${category}](${site.url}/${slugify(category)})`),
    "",
    "## Authors",
    ...authors.map((author) => `- [${author.name}](${site.url}/author/${author.slug}): ${author.role}`),
    "",
    "## Policies",
    `- [Editorial policy](${site.url}/editorial-policy)`,
    `- [Corrections policy](${site.url}/corrections-policy)`,
    `- [Source methodology](${site.url}/source-methodology)`,
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
