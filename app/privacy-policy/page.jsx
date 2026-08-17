import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["privacy-policy"].title, description: policies["privacy-policy"].intro };
export default function Page(){ return <PolicyPage {...policies["privacy-policy"]} />; }
