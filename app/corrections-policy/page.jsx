import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["corrections-policy"].title, description: policies["corrections-policy"].intro };
export default function Page(){ return <PolicyPage {...policies["corrections-policy"]} />; }
