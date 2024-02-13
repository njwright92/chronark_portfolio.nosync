"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { marked } from "marked";
import matter from "gray-matter";
import Particles from "../components/particles";

type Project = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjectsData() {
      const fileNames = [
        "proTracker.mdx",
        "micFinder.mdx",
        "floras.mdx",
        "comedify.mdx",
      ];
      let projectsData: Project[] = [];

      const fetchPromises = fileNames.map(async (fileName) => {
        try {
          const response = await fetch(`/content/projects/${fileName}`);
          const mdxText = await response.text();
          const { data, content } = matter(mdxText);

          const parsedContent = marked.parse(content);

          return {
            slug: fileName.replace(/\.mdx$/, ""),
            title: data.title || "Title Not Available",
            description: data.description || "Description Not Available",
            content: parsedContent,
          };
        } catch (error) {
          console.error("Error fetching project data:", error);
          return null;
        }
      });

      projectsData = (await Promise.all(fetchPromises)).filter(
        Boolean
      ) as Project[];
      setAllProjects(projectsData);
    }

    fetchProjectsData();
  }, []);

  const featured = allProjects.find((project) => project.slug === "floras");
  const top2 = allProjects.find((project) => project.slug === "micFinder");
  const top3 = allProjects.find((project) => project.slug === "proTracker");
  const sorted = allProjects.filter(
    (project) =>
      project.slug !== featured?.slug &&
      project.slug !== top2?.slug &&
      project.slug !== top3?.slug
  );

  return (
    <div className="relative pb-16 bg-zinc-900">
      <Navigation />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-peachFuzz sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-300">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-peachFuzz" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          <Card>
            <Link href={`/projects/${featured?.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8 shadow-md rounded-xl">
                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-peachFuzz group-hover:text-zinc-100 sm:text-4xl font-display"
                >
                  {featured?.title ?? "Title Not Available"}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-300">
                  {featured?.description ?? "Description Not Available"}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-300 hover:text-peachFuzz lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto lg:mx-0 lg:border-t-0 ">
            {[top2, top3].filter(Boolean).map((project, index) => (
              <Card key={project!.slug + "-" + index}>
                <Article project={project!} />
              </Card>
            ))}
          </div>

          <div className="w-full mx-auto lg:mx-0">
            {sorted.map((project) => (
              <div className="mb-8" key={project.slug}>
                <Card>
                  <Article project={project} />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
