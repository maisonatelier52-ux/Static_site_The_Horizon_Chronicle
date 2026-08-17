import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["advertising-policy"].title, description: policies["advertising-policy"].intro };
export default function Page(){ return <PolicyPage {...policies["advertising-policy"]} />; }
