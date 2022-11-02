import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://localhost:3000/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};
export default config;
