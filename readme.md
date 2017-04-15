# GBS (Gulp Build System)
### What is GBS ?
Build system based on **Gulp** and **Browserify**, **for isomorphic** applications.
GBS created as simple module for my projects.
In current version, it support:
- Transpile **ES6, ES7, JSX** to **ES5**
- Transpile **less** to css
- Create **client bundles**
- **Uglify** client bundles
- Find node_modules and create **logs of requires**, to analyze dependencies
- Move all **required node_modules in separate bundle**
- Detect **eslint** errors (*support of custom eslint rules in plans...*)

What **NOT SUPPORT in current time**, but can be included later: **real time file watch**.

### Why not just use Webpack ?
Webpack is great!
It almost ideal build system for client bundles, but when You want work with some more complicated things like isomorphic applications...
**Webpack has to many configs**.
Gulp instead allow you to write pure JavaScript code, without learn hundreds configs.
And couple more advantages:
- **Isomorphic** - Include in bundle only client files, separate them by local package.json, and don't create server bundle, leaving project directories structure untouched. It helpful for debug and build optimizations.
- **Optimization** - Transpile only changed files; Eslint check only changed files or files with errors in previous check. Separate node_modules in different bundle, wich updated only after npm install; Support build maty client bundles with diffrent entrys and common lib bundle...
- **Speed** - Thanks to optimizations, build change only necessary part of application, reducing the necessary time.
- **Single useful Gulp functions** - You can import just couple functions from GBS and use them in Your Gulp tasks.
___

## How to use GBS ?
A detailed example of usage GBS you can see in [gbs-example-project](https://github.com/UserBug/gbs-example-project)
### Install
```sh
$ npm install --save-dev gulp gbs
```

### Create gulpfile.js and add tasks to package.json
In root diectory of application create **gulpfile.js** or copy and rename [exampleGulpfile.js](https://github.com/UserBug/gbs/blob/master/exampleGulpfile.js) from GBS
```javascript
"scripts": {
    "buildLib": "gulp buildLib",
    "start": "gulp",
    "run": "node lib/server",
    "buildLibAndStart": "gulp buildLib && npm run start",
    "poststart": "node lib/server",
    "postinstall": "gulp buildLib"
  },
```

### Run tasks
```sh
$ npm run buildLibAndStart
```
___

# GBS Documentation
## Init configs
To initialize GBS, you need to set object with configs in gulpfile.js
Example of configs You can find in [defaultConfig.js](https://github.com/UserBug/gbs/blob/master/defaultConfig.js) from GBS
|Config key|Type|Default|Description|Example|
|:-|:-|-:|:-|:-|
|srcDir|*string*||Directory which contains JS files with ES6, ES7, JSX|'src'|
|libDir|*string*||In this directory will placed transpiled in to ES5 JS files|'lib'|
|entryPointsFiles|*string*||By using this pattern GBS will be looking files which are entry points for client bundles|'/lib/*/client.js'|
|bundlesDir|*string*||In this directory will be created client bundles|'lib/static/js'|
|libsBundleFileName|*string*|'libs.js'|File name for client bundle with node_modules|'libs.js'|
|lessEntryPointsFiles|*string*||By using this pattern GBS will be looking files which are entry points for css files|'lib/static/css'|
|cssDir|*string*||In this directory will placed compiled css files|'lib/static/css'|
|logDir|*string*||In this directory will be created log files|'logs/build'|
|uglifyBundles|*boolean*, *string*, *array of strings*|false|Set names of client bundles which need uglify|['public.js']|
|uglifyLibBundle|*boolean*|false|Need uglify client libs bundle?|true|
|modulesShim|*object*|{}|Configure modules which will be included as separate JavaScript files in HTML. Such as: jQuery, React... More details in [browserify-global-shim](https://github.com/rluba/browserify-global-shim)|{'react': 'React'}|
|modulesDontMoveToLibBundle|*array of strings*|[]|List of node_modules names which will be leave in client bundles and don't included to libs bundle.|['lodash']|
|delOldFoldersIgnoreRegExp|*RegExp*|```/[\/\\]static([\/\\]|$)/ig```|Regular expression which shows what files and dirs need to leave in ```libDir```, even they are missing in ```srcDir```||
|modulesFileName|*string*|'modules.json'|Name for log file which contains list of all required node_modules on client side||
|modulesRequiredInfoFileName|*string*|'modulesRequiredBy.json'|Name for log file which contains detailed information about what client files in ```srcDir``` require node_modules||
|eslintDetectErrorsFileName|*string*|'eslintDetectErrorsLog.json'|Name for log file which will contain eslint errors ||