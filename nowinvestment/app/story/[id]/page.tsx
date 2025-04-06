'use client'

import { Article } from "@/app/components/article";
import { useParams } from "next/navigation";

export default function StoryPage() {
    const params = useParams();
    const id = params.id as string;
    return <Article id={id} />
}