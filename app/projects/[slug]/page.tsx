"use client";
import React, { useState, useEffect } from "react";
import { usePathname, notFound } from "next/navigation";
import { marked } from "marked";
import matter from "gray-matter";
import { Header } from "./header";
import "./mdx.css";

type Project = {
  slug: string;
  title: string;
  description: string;
  content: string;
  url?: string;
  repository?: string;
};

export default function PostPage() {
  const [project, setProject] = useState<Project | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.split("/").pop();

    if (!slug) {
      console.log("Invalid slug:", slug);
      notFound();
    }

    async function fetchProjectData(slug: string) {
      try {
        const response = await fetch(`/content/projects/${slug}.mdx`);
        if (!response.ok) {
          console.error("MDX file not found for slug:", slug);
          notFound();
        }
        const mdxText = await response.text();
        const { data, content } = matter(mdxText);
        const parsedContent = marked.parse(content) as string;

        setProject({
          slug: slug,
          title: data.title || "Title Not Available",
          description: data.description || "Description Not Available",
          content: parsedContent,
          url: data.url,
          repository: data.repository,
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
        notFound();
      }
    }

    fetchProjectData(slug);
  }, [pathname]);

  if (!project) {
    return <div className="text-zinc-300 text-center text-xl">Loading...</div>;
  }

  return (
    <>
      <Header project={project} />
      <article className="px-8 m-4 text-zinc-300 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </article>
    </>
  );
}
