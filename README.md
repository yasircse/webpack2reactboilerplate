 
# React Boilerplate using Webpack 2 
Objective : To design a boilerplate for a React js Project using Webpack 2
Level: intermediate 
Webpack version: 2.6.1
Resources: Official Webpack Documentation  
Editor: Vs code
 
 
Introduction: Webpack 2 is JavaScript  module bundler. It bundles all the third party dependencies into one single file. Using Webpack will make the app more scalable and keep the code more organized. 
 
Step1: initialize the app
Command: npm init.
 
Step2 : install webpack 
Command: npm install --save-dev webpack
 
Step3: Hiding “node_modules ” , folder  and “vs code config file” from the project. Go to preference > settings and  copy paste the excluding items to the right side.
 
Step4: Create “dist” and “src ” then create file “app.js” inside “src“ now run the followin command.
 
Command: webpack ./src/app.js ./dist/app.bundle.js - p 
 
By running above command webpack will bundled the app.js as app.bundle.js into “dist” folder from “src” folder.
 
Step5: Minification: minification means to remove the white spaces from the file.
 
In order to minify the “app.bundle.js” we will add -p (production) with following command
 
Command: webpack ./src/app.js ./dist/app.bundle.js - p 
 
Step6: --watch mode: enables the webpack to monitor every change and updates it to “app.bundle.js” file  accordingly.
 In order to set the webpack to watch mode add --watch to following command
 
Command: webpack ./src/app.js ./dist/app.bundle.js - p 
 
Step7: create the “webpack.config.jjs ” in the root of the project in order to define the configuration for webpack
 
Step8: First thing to be specified inside is “entry” which means from where the webpack start bundling and the “output” which means to where webpack keeps the bundled file. In our case the “entry” is “app.js” and “output” is “app.bundle.js”.
 
module.exports={
entry:’./src/app.js’
Output:{
path:path.resolve(__dirname, ‘dist’),
filename: ‘app.bundle.js’,
 
} 
}
 
Step9: Add two scripts inside “package.json”. The scripts are “dev” and “prod”.
 
“dev”:”webpack -d --watch ”, d stands for development
“prod”:”webpack -p”
 
Earlier we were writing long commands to achieve bundling and minification of the file now the bundling and minification can be achieved by following commands.
 
Command:  npm run dev…...will run the webpack into watch mode  
Command:  npm run prod…...will run the webpack without watch mode and it will minify the app.bundle.js
 
 
 
 
Step10: install “html-webpack-plugin”: this will automatically generate the index.html template for us.
 
 
Oldway: create “index.html” in “dist” folder. Inside “index.html” create the html5 markup and add script with its source as “app.bundle.js”
 
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>My Project</title>
  </head>
  <body>
    <div id='root'></div>
      <script type="text/javascript" src="app.bundle.js></script>
  </body>
</html>
 
New way: the html plugin is now generated through html-webpack plugin
Command: npm install --save -dev html webpack plugin 
And then configure it inside the wepack.config.js
When you will run the app the index.html will be generated
 
The configuration of the html-webpack-plugin
 
1st: Import it to webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
2nd: place it into plugins section 
 
plugins: [
 
        new HtmlWebpackPlugin({
            title: 'Webpack2 Learning',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './public/index.html'
        }),
    ]
 
Webpack 2 style, css, sass-loader
 
Loaders: Loaders allows to preprocess files as you load them. They also transform files from different lnguages.
To include css files we need “css-loader”
 
 
Step 11: install css-loader
Command: npm install --save -dev css-loader
 
After installing “css-loader ” and configuring it in “webpack.config.js” create “app.css” inside the “src” folder and  create some styles inside “app.css” finally import it to “app.js” 
Now if we run the project in the browser the project will run successfully, however the styles will not be visible. In order to solve this problem we nee style loader.
 
 
Step 12: install “style-loader” 
Command: npm install --save-dev style-loader
After installing style-loader, configure it to “webpack.config.js”
Now if you run the app the styles would be visible.
 
Step 13: install sass-loader and node-sass to handle css in sass.
Command: npm install --save-dev sass-loader node-sass
After convert the app.css to app.scss
 
Step 14: install “ExtractTextPlugin” in order bundle styles into one single file and export it to dist folder.
Currently the styles ar inline.
Command: npm install --save-dev extract-text-webpack-plugin
After installing the plugin, import it to “webpack.config.js” as follow,
 
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
After importing it, update the plugins section inside “webpack.config.js” with following code.
new ExtractTextPlugin({
            filename: 'style.css',
            disable: !isProd,
            allChunks: true
        }),
 
Step 15: install webpack dev server
command : npm install --save-dev webpack-dev-server
Update package.json: “dev”:”webpack-dev-server”
Webpack Dev Server: It provides the live reloading. It reloads the page every time the changes are made.
Configure the webpack dev server inside “webpack.config.js” as follow
devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true
    },
 
The main difference between Webpack and Webpack Dev Server is that in Webpack renders and writes the files directly on the disk whereas in Webpack Dev Server the files are served from memory.
 
Step 16: install React, ReactDOM and all necessary babel needed to load javascript also add HMR.
Command: npm install --save react react-dom
Command: npm install --save-dev babel-cli babel-loader babel-core babel-preset-es2015 babel-preset-react
Command: npm install --save react-hot-loader
After installing the above packages create the file “index.js” in the “src” folder and write the following code inside the file   
 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
 
 
const render=(Component)=>{
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
};
 
render(App);
 
// Hot Module Replacement API
 
if(module.hot){
    module.hot.accept('./app',()=>{
        render(App)
    });
}
 
 
 
After that update the “app.js” as follow
import css from './app.scss';
import React, { Component } from 'react';
class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello from me....</h1>
            </div>
        );
    }
}
export default App;
After that change the entry point in “webpack.config.js” from app.js to index.js
After that create the “.babelrc” file on the root  to transpile the jsx and handle the hmr, update the file with following code.
{
    "presets": [
        [ "es2015",{"modules": false}],
// webpack understands the native import syntax, and uses it for tree shaking
        "react"
        // Transpile React components to JavaScript
    ],
    "plugins": [
        "react-hot-loader/babel"
        // Enables React code to work with HMR.
    ]
}
 
After that update the devServer module inside “webpack.config.js” with  hot :true this entry will enable the HMR(hot module replacement).
 
After that import webpack inside “webpack.config.js”
const webpack = require('webpack');
 
After that add two plugins inside the plugins section of “webpack.config.js”
 
new webpack.HotModuleReplacementPlugin(),
new webpack.NamedModulesPlugin(),
 
After that update the entry and output module inside “webpack.config.js” as follow
entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './src/index.js'
        // the entry point of our app
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
 
 After that update the plugins section with 
 
 
Step 17: Setting up production and development environment so that we can use ”extract-text-webpack-plugin” in production mode and and HMR in development mode. We are doing this because ”extract-text-webpack-plugin” does not work with HMR.
 
 
Since we are using windows therefore we have to install
Command: npm install --save-dev cross-env
 
Now let’s make some changes in “package.json” scripts as follow
 "scripts": {
    "dev": "webpack-dev-server",
    "prod": "npm run clean && cross-env NODE_ENV=production webpack -p",
    "clean": "rm -rf ./dist"
  },
 
After that we will make some changes inside “webpack.config.js” file as follow 
 
 
const isProd = process.env.NODE_ENV === 'production' // this will return true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
 
})
 
const cssConfig = isProd ? cssProd : cssDev;
 
 
Pass the “cssConfig” inside the loaders module.
Now if we are in development mode the HMR will be functional and in production mode the ”extract-text-webpack-plugin” will be functional.
 
 
Step 18: Adding Linter to the project. Linters are very important for a project
Command: npm install --save-dev eslint
Command: npm install --save-dev eslint-loader
Command: npm install --save-dev eslint-config-standard eslint-config-standard-react eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react

Now create eslintrc.json in the root folder and write following code

{
    "extends": ["standard", "standard-react"]
}

 
That's it………..
 
