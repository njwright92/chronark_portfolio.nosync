// @ts-nocheck
"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import matter from "gray-matter";
import { marked } from "marked";

interface MdxProps {
  slug: string; // Assuming a slug is passed to identify the content
}

export function Mdx({ slug }: MdxProps) {
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    async function fetchMdxContent() {
      try {
        const response = await fetch(`/content/projects/${slug}.mdx`);
        const mdxText = await response.text();
        const { content } = matter(mdxText);

        // Customize the renderer to apply styles
        const renderer = new marked.Renderer();

        // Customize heading
        renderer.heading = (text, level) => {
          const tagName = `h${level}`;
          if (level === 1) {
            return `<${tagName} class="bg-peach-fuzz text-zinc-900 drop-shadow-md p-2 my-4 rounded-lg">${text}</${tagName}>`;
          }
          return `<${tagName} class="text-zinc-300 drop-shadow-md my-4">${text}</${tagName}>`;
        };

        // Customize paragraphs
        renderer.paragraph = (text) => {
          return `<p class="text-zinc-300 my-4">${text}</p>`;
        };

        // Customize images
        renderer.image = (href, title, text) => {
          return `<img src="${href}" alt="${text}" class="rounded-lg my-4 mx-auto" style="max-width: 100%; height: auto;">`;
        };

        marked.setOptions({
          renderer,
        });

        const htmlContent = marked.parse(content);
        setContentHtml(htmlContent);
      } catch (error) {
        console.error("Error fetching MDX content:", error);
        setContentHtml("<p>Error loading content.</p>");
      }
    }

    fetchMdxContent();
  }, [slug]);

  // Render the HTML content
  return (
    <div
      className="mdx-container bg-zinc-900 text-zinc-300 p-4 rounded-xl"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
