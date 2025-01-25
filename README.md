# Features
## 1. Add New Items
Users can add new items to the inventory.
The "Add" button at the top opens a modal with a form to input item details like:
- Name
- Category
- Quantity
## 2. Edit Existing Items
Users can edit existing items in the inventory.
The "Edit" button opens the modal pre-filled with the item's details.
## 3. Delete Items
Users can delete an item from the inventory by clicking the "Delete" button.
## 4. Filter by Category
Users can filter items by their category using a dropdown.
The "All Categories" option resets the view to show all items.
## 5. Sort by Quantity
Users can toggle between ascending and descending order of quantity with a sort button.
## 6. Highlight Low Stock
Items with a quantity below 10 are highlighted with a red background for better visibility.

# Tech Stack
## Frontend:
- React.js: For building the user interface.
- TypeScript: For type safety and better development experience.
- TailwindCSS: For styling the components with utility-first classes.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
