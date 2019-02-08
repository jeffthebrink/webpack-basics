# Webpack Walkthrough

This repository contains a basic webpack walkthrough to cover basic concepts on how to setup and
configure webpack.

## Part 1. Get a basic script built via webpack

In this part our goal is to get a basic "Hello, world!" application built by webpack.

1. `git init` to initialize your git repository. We can use a file called `.gitignore` to exclude
certain files and directories from our git repository. Here is a good starting point for JavaScript
projects on MacOS:

    node_modules/
    dist/
    .DS_Store

2. `npm init` to initialize your package.json. Use the defaults

3. Add the webpack bundler and CLI (command line interface) tools:

    npm add --save-dev webpack webpack-cli

We use --save-dev because these are dependencies that are used before running our program.

4. Do a basic build.

Now that we have our bundler installed, lets just build a super simple program. In the root of your
project create a directory titled `src` via `mkdir src` and then put a file at `src/index.js` with
a simple console log statement, like this:

    // src/index.js
    console.log('Hello, world!');

Webpack has sensible defaults built in for where to look for your program root, and where it will
output the built files. In webpack terminology these are called `entry` and `output` points. The
default entry point is `src/index.js` and the default output is `dist/main.js`. So now lets build
our `src/index.js` file we just wrote to `dist/main.js` via the webpack cli tools. On the command
line run:

    node_modules/.bin/webpack

And you should see output stating that webpack successfully built to `dist/main.js`

If that worked, you should now be able to run `node dist/main.js` and see "Hello, world!" printed
on the command line.

Congratulations, You've successfully used webpack to bundle a program! You should now commit your
work.

References:
- [webpack concepts](https://webpack.js.org/concepts/)

## Part 2. Get a basic React app running

In this part our goal is to get a basic React App running locally in your browser. To do that we're
going to introduce Babel, a JavaScript compiler.

Babel is a compiler for JavaScript that allows you to use modern JavaScript language features in
browsers that do not yet support those features. It does this by "transpiling" ES6 (modern
JavaScript) to ES5 (least common denominator in browsers)

1. Add new packages to your project. We're going to need dev dependencies: babel, babel-loader,
babel-preset-rect. And runtime dependencies: react, react-dom

    npm add --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
    npm add react react-dom

2. Configure the loader in webpack.

Loaders in webpack are programs that your source code is passed to on the way to being transpiled.
Babel is going to be our JavaScript loader, and we need to configure it in webpack. In your app
root create a file called `webpack.base.js` and put the following code in it:

    module.exports = {
      module: {
        rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      }
    }

At this point you should be able to build your project again. This time however, use our new webpack
configuration file:

    node_modules/.bin/webpack --config=webpack.base.js

The output will be the same, but now your JavaScript is being loaded by Babel, which means we can
use React and new JavaScript features.

3. Add a build script to package.json

Having to run `node_modules/.bin/webpack --config=webpack.base.js` every time we want to build our
project is tedious. npm allows us to put commands in our package.json and it will automatically
prefix the `node_modules/.bin` bit. So open up `package.json` and add the following to the `scripts`
block:

    "scripts": {
      "build": "webpack --config=webpack.base.js --mode=development"
    }

Now we can simply run `npm run build` and our program will be built with our webpack config and in
development mode.

4. Add a basic react component

Now lets add some basic React. In src/index.js add the following:

    import * as React from 'react';
    import * as ReactDOM from 'react-dom';

    ReactDOM.render(
      (
        <h1>Hello, World!</h1>
      ),
      document.getElementById('root'),
    );

And make sure that you can still build via `npm run build`

5. Add an HTML page to host your react.

Now we need an HTML page to load up our React app. Let's just add one in the root called `app.html`
with the following contents:

    <!doctype html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8">
        <title>Webpack + Babel + React</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="./dist/main.js"></script>
      </body>
    </html>

A few things to note here:
  1. Our react app wants to mount in an element with the id "root"
  2. So we created a div in the html body with the id "root". This is where React will mount
  3. Our script is pointing to "./dist/main.js" which is where our program builds to.

Now you can open up app.html in your browser and you should see an <h1> tag with "Hello, World!"
in it.

References:
- [babel](https://babeljs.io/)
- [babel loader](https://github.com/babel/babel-loader)
