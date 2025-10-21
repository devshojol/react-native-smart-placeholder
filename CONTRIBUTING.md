# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

### Setting up local development

To develop and test this library locally, follow these steps:

1. **Create a new React Native Expo app**

```bash
   npx create-expo-app MyApp
   cd MyApp
```

2. **Set up the modules folder structure**

```
   MyApp
   ├── node_modules
   ├── modules              # folder for your local libraries
   │   └── react-native-smart-placeholder  # local library
   ├── android
   ├── ios
   ├── src
   ├── index.js
   └── package.json
```

3. **Clone the library into the modules folder**

```bash
   mkdir modules
   cd modules
   git clone https://github.com/your-username/react-native-smart-placeholder.git
   cd ..
```

4. **Add the library as a local dependency**

   In your app's `package.json`, add:

```json
   "dependencies": {
     "react-native-smart-placeholder": "file:./modules/react-native-smart-placeholder"
   }
```

5. **Install dependencies**

```bash
   npm install
```

6. **Import and use the library**

```javascript
import SmartPlaceholder from "react-native-smart-placeholder";
```

7. **Watch for changes during development**

   When you make changes to the library code, run this command inside the `react-native-smart-placeholder` directory:

```bash
   npm run watch
```

This will automatically rebuild the library when you make changes.

For more details, refer to the [React Native local library setup guide](https://reactnative.dev/docs/legacy/local-library-setup?package-manager=npm).

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `major`: when breaking change.
- `chore`: tooling changes, e.g. change CI config.

**Version bumping based on commits:**

- `BREAKING CHANGE` or `major:` prefix → major version bump (e.g., 1.0.0 → 2.0.0)
- `feat` or `minor:` prefix → minor version bump (e.g., 1.0.0 → 1.1.0)
- `fix` or `patch:` prefix → patch version bump (e.g., 1.0.0 → 1.0.1)

**Examples:**

```bash
git commit -m "feat: add shimmer animation support"
git commit -m "fix: resolve layout issue on Android"
git commit -m "BREAKING CHANGE: remove deprecated API methods"
```

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
