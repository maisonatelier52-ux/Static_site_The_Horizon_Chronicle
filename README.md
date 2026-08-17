# Horizon Chronicle

A complete, mobile-responsive Next.js news publication inspired by the supplied classic newspaper reference. The project preserves the working route and interaction patterns of the supplied OS news project while using a new visual system, publication identity, content set, and information architecture.

## Included

- Reference-matched home page with classic masthead, edition bar, weather, social links, category navigation, breaking-news ticker, two lead cards, update rail, featured story, latest news, most-read ranking, category columns, advertisement, newsletter, editor's picks, and reporter carousel.
- Ten category archives, six author profiles, About, Contact, Search, custom 404, and nine newsroom/legal policy pages.
- Fifty-nine fictional demonstration articles with generated metadata and complete static routes.
- Long-form article template with more than 1,000 words of body copy, two editorial images, table of contents, summary, key takeaways, pull quote, author bio, tags, previous/next navigation, related stories, latest/popular sidebar, newsletter, and native/social share controls.
- Live header search, full search results, responsive mobile menu, rotating ticker, tabbed sidebar, newsletter validation, contact-form validation, FAQ accordion, carousel controls, and back-to-top control.
- Metadata, NewsArticle/Person/CollectionPage structured data, sitemap, robots, web manifest, and `llms.txt`.
- Environment-driven publication domain, identity, weather, contact address, social profiles, and optional newsletter endpoint.

All included editorial stories and author profiles are fictional demonstration content.

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production check:

```bash
npm run build
npm run start
```

## Configure publication details

Copy `.env.example` to `.env.local`, then update:

- `NEXT_PUBLIC_SITE_URL`: canonical production domain used by metadata, sitemap, robots, structured data, and share URLs.
- `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_TAGLINE`, and `NEXT_PUBLIC_SITE_EDITION`: publication identity.
- `NEXT_PUBLIC_SITE_CITY` and `NEXT_PUBLIC_SITE_WEATHER`: masthead conditions.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public newsroom address.
- `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_YOUTUBE_URL`, and `NEXT_PUBLIC_LINKEDIN_URL`: site-wide social profiles.
- `NEXT_PUBLIC_NEWSLETTER_URL`: optional hosted signup endpoint. If blank, the polished in-page success state remains active for demonstration.

Restart the Next.js process after changing environment values.

## Content and routes

- Publication settings and navigation: `lib/site.js`
- Articles, authors, category descriptions, and long-form story structure: `lib/content.js`
- Policies: `lib/policies.js`
- Page routes: `app/`
- Shared components: `components/`
- Responsive visual system: `app/globals.css`
- Editorial media: `public/images/`

Article URLs follow `/{category}/{slug}`. Author URLs follow `/author/{slug}`. Adding an item to `lib/content.js` automatically feeds search, categories, home modules, sidebars, authors, metadata, structured data, and sitemap generation.

## Production notes

The demo newsletter and contact form validate locally but do not transmit private data. Connect them to your chosen service before launch. Replace fictional copy, review legal/policy text with qualified advisers, set a real canonical domain, and add production analytics or CMS integrations as needed.
