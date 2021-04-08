# Webpack React Config Guide

Languages: [EN-US](/README.md), [PT-BR](/README-pt-br.md).

## Summary

- [Start Project](#start-project)
- [Create Initial Files](#create-initial-files)
- [Build HTML](#build-html)
- [Build Vanilla JS](#build-vanilla-js)
- [Build JS and JSX](#build-js-and-jsx)
- [Build TS and TSX](#build-ts-and-tsx)
- [Running App in Dev Mode](#running-app-in-dev-mode)

## Start Project:

```bash
mkdir my_projet
cd my_project
yarn init
```

Add webpack dependencies:

```bash
yarn add react react-dom
yarn add webpack webpack-cli -D
```

## Create source Files:

```js
src/
  index.html
  index.js // or .ts
```

Create `src/index.html`:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Complete React Webpack Configuration</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body>
  <div id="app"></div>
  <script src="./bundle.js" async defer></script>
</body>

</html>
```

Create `src/index.js`:

```js
console.log('Hello, World!')
```

## Build HTML

Add `HtmlWebpackPlugin` dependencie:

```dash
yarn add html-webpack-plugin -D
```

`HtmlWebpackPlugin` webpack config:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(currDir, 'src', 'index.html'),
    })
  ]
}
```

## Build Vanilla JS:

On project's root folder, create `config/webpack.config.js`.

```bash
mkdir config
cd config
touch webpack.config.js
```

The file `config/webpack.config.js` must export an object with *entry* and *output* data:

```js
const path = require('path');
const currDir = process.cwd();

module.exports = {
  entry: path.resolve(currDir, 'src', 'index.js'),
  output: {
    path: path.resolve(currDir, 'dist'),
    filename: 'bundle.js'
  }
}
```

To build the app, run the command line, or create a script on `package.json`.

```dash
yarn webpack --config config/webpack.config.js --mode production
```

```js
"scripts": {
  "build": "webpack --config config/webpack.config.js --mode production"
},
```

## Build JS and JSX

Add babel dependencies:

```bash
yarn add react react-dom
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

Modify `index.js` content to import an React JSX component:

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './core/App'

ReactDOM.render(<App />, document.getElementById('app'));
```

App.js

```js
import React from 'react';

const App = () => {
    return <h1>Hello, World!</h1>;
}

export default App;
```

babel-loader webpack config:

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
        }
      },
    ]
  }
}
```

## Build TS and TSX

```bash
yarn add typescript @types/react @types/react-dom ts-loader
```

ts-loader webpack config:

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  }
}
```

## Running App in Dev Mode

Add dependencie `webpack-dev-server`:

```dash
yarn add webpack-dev-server -D
```

To run the app in dev mod, run the command line, or create a script on `package.json`.

```dash
yarn webpack serve --config config/webpack.config.js --mode development --port 8080
```

```js
"scripts": {
  "start": "webpack serve --config config/webpack.config.js --mode development --port 8080",
  "build": "webpack --config config/webpack.config.js --mode production"
},
```

`devServer` webpack config:

```js
module.exports = {
  ...
  devServer: {
    contentBase: path.resolve(currDir, 'src'),
  }
}
```

## Add CSS support

Add dependencie `style-loader` and `css-loader`:

```dash
yarn add style-loader css-loader
```

Add the module rules webpack config for .css files:

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
}
```