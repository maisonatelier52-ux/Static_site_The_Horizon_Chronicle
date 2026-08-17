import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["source-methodology"].title, description: policies["source-methodology"].intro };
export default function Page(){ return <PolicyPage {...policies["source-methodology"]} />; }
