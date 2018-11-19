# React-Project-Template

Template for react projects including webpack, babel and eslint (with artcom configuration).

## Configuration

### webpack

The webpack configuration can be found in the `webpack.config.js`.
Relevant things are:
` entry - The default entry point for webpack is `src/index.js`
` output - The default output is placed at `dist/`
* devServer - The configuration allows access to the dev build at port `8080` by default and is configured to allow network wide access.

### Babel

Babel presets can be added in the `.babelrc`.

### eslint

Configurations can be made in the `.eslintrc.json`. The `artcom-react` configuration is already included.

## Use

Add the modules that should be rendered within the `div` tag in the `app.js`:

```
export default () =>
  <div className="App">
    <yourModule1 />
    <yourModule2 />
    ...
  </div>
```

### Bundling

To bundle the application with webpack, run the following command in the cli from the root directory of project:
```
npm start
```
This will initiate the bundling process and if no errors occur, the bundled file will be created as specified in the `webpack.config.js`.
