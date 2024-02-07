import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure that data includes title, date, and description properties
    if (!data.title || !data.date || !data.description) {
      throw new Error(`Markdown file ${fileName} is missing required data.`);
    }

    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      content,
    };
  });
}
