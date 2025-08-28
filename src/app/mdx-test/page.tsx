"use client";

import React from "react";

// Import MDX file (static import works because of @next/mdx)
import { MDXProvider } from "@mdx-js/react";
import Hello from "@/content/hello.mdx";

const components = {
	h1: (props) => <h1 style={{ color: "crimson" }} {...props} />,
};

export default function Page() {
	return (
		<main style={{ padding: 24 }}>
			<h1>MDX test page</h1>
			<MDXProvider components={components}>
				<Hello />
			</MDXProvider>
		</main>
	);
}
