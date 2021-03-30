# Guia para Configuração Webpack React

## Sumário

- [Iniciando Projeto](#iniciando-projeto)
- [Criando Arquivos Iniciais](#criando-arquivos-iniciais)
- [Buildando JS Vanilla](#buildando-js-vanilla)
- [Buildando JSX](#buildando-jsx)
- [Buildando HTML](#buildando-html)
- [Rodando Aplicação em Ambiente de Desenvolvimento](#rodando-aplicação-em-ambiente-de-desenvolvimento)

## Iniciando Projeto:

```bash
mkdir my_projet
cd my_project
yarn init
```

Adicione as dependencias necessárias:

```bash
yarn add react react-dom
yarn add webpack webpack-cli -D
```

## Criando Arquivos Iniciais:

index.html

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

index.js

```js
console.log('Hello, World!')
```

## Buildando JS Vanilla:

Na raiz do projeto, crie a pasta config com o arquivo de configuração do webpack.config.js.

```bash
mkdir config
cd config
touch webpack.config.js
```

A configuração webpack deve conter as propriedades:

- **entry**: Arquivo de entrada;
- **output**: Arquivo de saída.

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

```dash
yarn webpack --config config/webpack.config.js --mode production
```

Com essa configuração, o build do projeto vai possuir o javascript minificado dentro da
pasta `/dist`.

## Buildando JSX

Necessário adicional dependencias `babel`.

```bash
yarn add react react-dom
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

Modifique o arquivo index.js para receber um componente React em JSX.

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

A configuração webpack deve conter as propriedades:

- **module**: 
- **rules**: 
- **test**: 
- **loader**: 
- **exclude**: 
- **options**: 
- **presets**: 

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

## Buildando HTML

Necessário adicionar dependencia `HtmlWebpackPlugin`.

```dash
yarn add html-webpack-plugin -D
```

A configuração webpack deve conter as propriedades:

- **plugins**: 
- **filename**: 
- **template**: 

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

## Rodando Aplicação em Ambiente de Desenvolvimento

Necessário adicionar dependencia `webpack-dev-server`:

```dash
yarn add webpack-dev-server -D
```

Para rodar o servidor em modo de desenvolvimento, utilizamos o comando `webpack serve`:

```dash
yarn webpack serve --config config/webpack.config.js --mode development --port 8080
```

A configuração webpack deve conter as propriedades:

- **devServer**: 
- **contentBase**: 

```js
module.exports = {
  ...
  devServer: {
    contentBase: path.resolve(currDir, 'dist'),
  }
}
```