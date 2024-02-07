import { PropsWithChildren } from "react";

export function useMDXComponents(components: any): any {
  return {
    // Styles for h1 elements with peachFuzz background, zinc-900 text, and drop shadow.
    h1: ({ children }: PropsWithChildren) => (
      <h1 className="mt-2 text-3xl font-bold tracking-tight bg-peachFuzz text-zinc-900 p-4 rounded-lg drop-shadow-md md:text-center sm:text-4xl">
        {children}
      </h1>
    ),
    // Adjusted styles for h2 elements to have a minimalist look, consistent with your theme.
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="mt-4 text-2xl font-semibold text-zinc-300 drop-shadow-md md:text-center">
        {children}
      </h2>
    ),
    // Ensuring other text elements follow the minimalist aesthetic with zinc-300 color.
    p: ({ children }: PropsWithChildren) => (
      <p className="mt-2 text-base text-zinc-300 leading-relaxed">{children}</p>
    ),
    // Styling for images to be rounded and evenly padded.
    img: ({ src, alt }: PropsWithChildren<{ src: string; alt?: string }>) => (
      <img
        src={src}
        alt={alt}
        className="mt-4 mx-auto rounded-lg p-2 max-w-full h-auto"
      />
    ),
    // You can continue to define styles for other MDX components as needed.
    // This setup ensures that your MDX content is presented with ample whitespace,
    // a minimalist look, and adheres to your specified color palette.

    // Incorporating any custom components passed in or defaulting to HTML equivalents.
    ...components,
  };
}
