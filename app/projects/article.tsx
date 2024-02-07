import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  description: string;
  // Add any other fields that you extract from the MDX files
};

type Props = {
  project: Project;
};
export const Article: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8 shadow-md rounded-xl bg-zinc-900">
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-300 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm duration-1000 text-peachFuzz group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
