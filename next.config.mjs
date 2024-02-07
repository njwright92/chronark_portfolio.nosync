import nextMDX from "@next/mdx";

// Apply MDX support for .mdx files
const withMDX = nextMDX({
	extension: /\.mdx?$/,
});

export default withMDX({
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	// Any other Next.js configuration options...
});
