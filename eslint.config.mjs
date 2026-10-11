import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/build/**", "next-env.d.ts"]
  }
);
