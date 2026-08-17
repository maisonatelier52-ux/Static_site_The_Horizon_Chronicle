import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: "Independent reporting on world affairs, politics, business, technology, science, culture, and daily life.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.tagline, url: site.url },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="m-0 bg-paper font-sans text-ink antialiased [background-image:linear-gradient(rgba(255,255,255,.34),rgba(255,255,255,.34)),radial-gradient(circle_at_20%_0,rgba(181,155,98,.06),transparent_36%)]">
        <a
          className="fixed left-4 top-[-60px] z-[1000] bg-brand-green px-4 py-2.5 text-white focus:top-3"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
