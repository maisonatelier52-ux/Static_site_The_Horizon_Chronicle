import { site } from "@/lib/site";
export default function manifest(){ return { name: site.name, short_name: "Horizon", description: site.tagline, start_url: "/", display: "standalone", background_color: "#f7f4ed", theme_color: "#063f32", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
