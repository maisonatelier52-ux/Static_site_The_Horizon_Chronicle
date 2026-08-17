import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["ownership-funding"].title, description: policies["ownership-funding"].intro };
export default function Page(){ return <PolicyPage {...policies["ownership-funding"]} />; }
