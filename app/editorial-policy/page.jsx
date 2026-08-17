import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["editorial-policy"].title, description: policies["editorial-policy"].intro };
export default function Page(){ return <PolicyPage {...policies["editorial-policy"]} />; }
