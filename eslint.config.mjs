import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { write, writeFileSync } from 'fs';

const eslintConfig = defineConfig([
	// Next.js Core Web Vitals rules
	...nextVitals,

	// Next.js TypeScript rules
	...nextTs,

	// Prettier configuration to disable conflicting rules
	prettier,

	// Custom rules and overrides
	// {
	//   rules: {
	//     // React/JSX rules
	//     'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
	//     'react/prop-types': 'off', // Using TypeScript instead
	//     'react/no-unescaped-entities': 'warn',

	//     // TypeScript rules
	//     '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	//     '@typescript-eslint/no-explicit-any': 'warn',

	//     // Import rules
	//     'import/order': [
	//       'error',
	//       {
	//         groups: [
	//           'builtin',
	//           'external',
	//           'internal',
	//           'parent',
	//           'sibling',
	//           'index',
	//         ],
	//         'newlines-between': 'always',
	//         alphabetize: {
	//           order: 'asc',
	//           caseInsensitive: true,
	//         },
	//       },
	//     ],

	//     // Next.js specific rules
	//     '@next/next/no-img-element': 'error',
	//     '@next/next/no-html-link-for-pages': 'error',

	//     // General code quality rules
	//     'no-console': 'warn',
	//     'no-debugger': 'error',
	//     'prefer-const': 'error',
	//     'no-var': 'error',
	//   },
	// },

	// Override default ignores of eslint-config-next
	globalIgnores([
		// Default Next.js ignores
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',

		// Additional ignores
		'node_modules/**',
		'dist/**',
		'.vercel/**',
		'coverage/**',
		'*.config.js',
		'*.config.mjs',
		'public/**',
		'playwright-report/**',
		'test-results/**',

		// GraphQL generated files
		'src/gql/**',
		'src/graphql/generated/**',
	]),
]);

// const cache = new Set();
// const replacer = (key, value) => {
// 	if (typeof value === 'object' && value !== null) {
// 		// Check if the object has been seen before
// 		if (cache.has(value)) {
// 			// Circular reference found, discard it
// 			return; // Returning 'undefined' skips the property
// 		}
// 		// Store value in our collection
// 		cache.add(value);
// 	}
// 	return value;
// };

// const str = JSON.stringify(eslintConfig, replacer, 2);

// writeFileSync('out.json', str);

export default eslintConfig;
