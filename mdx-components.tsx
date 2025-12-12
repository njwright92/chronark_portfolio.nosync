import React, { PropsWithChildren } from "react";
import type { MDXComponents } from "mdx/types";

// Fallback type if mdx/types isn't available
type MDXProvidedComponents =
  | MDXComponents
  | Record<string, React.ComponentType<unknown>>;
export function useMDXComponents(
  components: MDXProvidedComponents,
): MDXProvidedComponents {
  return {
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="mt-2 text-3xl font-bold tracking-tight bg-peach-fuzz text-zinc-900 p-4 rounded-lg drop-shadow-md md:text-center sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="mt-4 text-2xl font-semibold text-zinc-300 drop-shadow-md md:text-center">
        {children}
      </h2>
    ),
    p: ({ children }: PropsWithChildren) => (
      <p className="mt-2 text-base text-zinc-300 leading-relaxed">{children}</p>
    ),
    img: ({ src, alt }: PropsWithChildren<{ src: string; alt?: string }>) => (
      <img
        src={src}
        alt={alt}
        className="mt-4 mx-auto rounded-lg p-2 max-w-full h-auto"
      />
    ),
    ...components,
  };
}
