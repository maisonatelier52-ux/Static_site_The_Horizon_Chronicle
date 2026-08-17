import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["terms-and-conditions"].title, description: policies["terms-and-conditions"].intro };
export default function Page(){ return <PolicyPage {...policies["terms-and-conditions"]} />; }
