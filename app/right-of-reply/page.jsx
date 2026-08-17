import PolicyPage from "@/components/PolicyPage"; import { policies } from "@/lib/policies";
export const metadata = { title: policies["right-of-reply"].title, description: policies["right-of-reply"].intro };
export default function Page(){ return <PolicyPage {...policies["right-of-reply"]} />; }
