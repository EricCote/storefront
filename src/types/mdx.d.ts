// Type declaration for static .mdx imports
import type {ComponentType} from "react";

type MDXProps = Record<string, unknown>;

// Default exported MDX component (function component that accepts props)

export  const MDXComponent: ComponentType<MDXProps>; 

// Optional named exports commonly produced by MDX toolchains
export const meta: Record<string, unknown>;
export const frontmatter: Record<string, unknown>;