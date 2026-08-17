import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies.legal.title, description: policies.legal.intro };
export default function Page(){ return <PolicyPage {...policies.legal} />; }
