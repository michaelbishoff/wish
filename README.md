# React + Vite + Tailwindcss App
Bootstrapped with [Vite](https://vitejs.dev/)  
`npm create vite@latest vite-app --template react-ts`

## Available Scripts

### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch`
To re-evaluate CSS styles that should be included in the build.

## Firebase
Initialized with `firebase init` to create various db rule files.
New PRs will create a "staging" version of the website. PR merges to `main` branch will automatically deploy to production.

Check the firebase dashboard for more info.

Live app can be viewed at [https://wish-98ac7.web.app/](https://wish-98ac7.web.app/)