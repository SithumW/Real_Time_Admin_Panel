import type { IGraphQLConfig } from "graphql-config";

// This is the configuration for GraphQL Code Generator
const config: IGraphQLConfig = {
  // The GraphQL API schema URL
  schema: "https://api.crm.refine.dev/graphql",

  // Extra settings for tools
  extensions: {
    //codegen is a plugin that generates typecript types from GraphQL
    codegen: {
      // Hooks let us run commands automatically after generating files
      hooks: {
        // After creating a file, fix lint errors and format it
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },

      // Files that will be generated and their settings
      generates: {

        // This file contains TypeScript types for the GraphQL schema itself
        "src/graphql/schema.types.ts": {
          plugins: ["typescript"], // Use TypeScript plugin
          config: {
            skipTypename: true,      // Don’t add __typename in types
            enumsAsTypes: true,      // GraphQL enums become TypeScript union types
            scalars: {               // Map GraphQL scalar types to TypeScript
              DateTime: {
                input: "string",     // Send DateTime as string
                output: "string",    // Receive DateTime as string
                format: "date-time", // Format info (optional)
              },
            },
          },
        },

        // This file contains TypeScript types for GraphQL operations (queries/mutations)
        "src/graphql/types.ts": {
          preset: "import-types",          // Import base types instead of duplicating
          documents: ["src/**/*.{ts,tsx}"], // Look for GraphQL queries/mutations in these files
          plugins: ["typescript-operations"], // Generate types for operations
          config: {
            skipTypename: true,           // Don’t add __typename in operation types
            enumsAsTypes: true,           // Convert enums to union types
            preResolveTypes: false,       // Don’t try to resolve types from other files
            useTypeImports: true,         // Use `import type` for TypeScript
          },
          presetConfig: {
            typesPath: "./schema.types",  // Use types from schema.types.ts
          },
        },
      },
    },
  },
};

// Export this config so codegen can use it
export default config;
