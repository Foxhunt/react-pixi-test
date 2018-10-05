# React-Project-Template

Template for react projects including webpack, Babel, eslint (with artcom configuration).

## Configuration

### webpack

The webpack configuration can be found in the **webpack.config.js**.
Relevant things are:
* entry - Entry point where webpack should start bundling the files
* output - Specifies where the build should be created
* devServer - Specifies where the address where the server can be reached

### Babel

Babel presets can be added in the **.babelrc**.

### eslint

Configurations can be made in the **.eslintrc.json**.
The *artcom-react* configuration is already included.

## Use

Add the modules that should be rendered within the *'div'* tag in the **App.js**:

```
export default () =>
  <div className="App">
    <yourModule1 />
    <yourModule2 />
    ...
  </div>
```

### Bundling

To bundle the application with webpack, run the following command in the cli.
*(Make sure you are in the root directory of the project)*

```
npm start
```

This will initiate the bundling process and if no errors occur, the bundled file will be created as specified in the *webpack.config.js*
