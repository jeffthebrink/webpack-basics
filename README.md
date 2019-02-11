# Webpack Walkthrough

This repository contains a basic webpack walkthrough to cover basic concepts on how to setup and
configure webpack.

## Part 1. Get a basic script built via webpack

In this part our goal is to get a basic "Hello, world!" application built by webpack.

### 1. `git init` to initialize your git repository. We can use a file called `.gitignore` to exclude
certain files and directories from our git repository. Here is a good starting point for JavaScript
projects on MacOS:

    node_modules/
    dist/
    .DS_Store

### 2. `npm init` to initialize your package.json. Use the defaults

### 3. Add the webpack bundler and CLI (command line interface) tools:

    npm add --save-dev webpack webpack-cli

We use --save-dev because these are dependencies that are used before running our program.

### 4. Do a basic build.

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

### 1. Add new packages to your project. We're going to need dev dependencies: babel, babel-loader,
babel-preset-rect. And runtime dependencies: react, react-dom

    npm add --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
    npm add react react-dom

### 2. Configure the loader in webpack.

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

### 3. Add a build script to package.json

Having to run `node_modules/.bin/webpack --config=webpack.base.js` every time we want to build our
project is tedious. npm allows us to put commands in our package.json and it will automatically
prefix the `node_modules/.bin` bit. So open up `package.json` and add the following to the `scripts`
block:

    "scripts": {
      "build": "webpack --config=webpack.base.js --mode=development"
    }

Now we can simply run `npm run build` and our program will be built with our webpack config and in
development mode.

### 4. Add a basic react component

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

### 5. Add an HTML page to host your react.

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

Now you can open up app.html in your browser and you should see an `h1` tag with "Hello, World!"
in it.

References:
- [babel](https://babeljs.io/)
- [babel loader](https://github.com/babel/babel-loader)

## Part 3. Write a React component

In this step we're going to write a separate react component that will be rendered in our app. We
will need a few new packages and new configuration to get this working.

### 1. Add some dependencies so we can write a React component

First, we're going to need a new dependency: PropTypes. This is a library that lets dev mode React
check to make sure you're passing the right kinds of props to your components.

    npm add prop-types

And we need a babel plugin to allow class properties:

    npm add --save-dev @babel/plugin-proposal-class-properties

And we need to update our babel-loader plugins. Next to the `presets` option in the babel-loader
in `webpack.base.js` add:

    plugins: ['@babel/plugin-proposal-class-properties']

So that your babel-loader rule will look like:

      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }

This is how we add babel plugins to enable new JavaScript features.

### 3. Add a Title Component.

Now that we have the libraries and plugins we need, let's add a Title component:

In src add a file called Title.js:

    import React from 'react';
    import PropTypes from 'prop-types';

    class Title extends React.PureComponent {
      static propTypes = {
        text: PropTypes.string.isRequired,
      };

      render() {
        const { text } = this.props;

        return (<h1>{text}</h1>);
      }
    }

    export {
      Title,
    };

And change our ReactDom.render method in `src/index.js` to be:

    import { Title } from './Title';

    ReactDOM.render(
      (
        <Title text="Is this thing on?" />
      ),
      document.getElementById('root'),
    );

### 4. Build and View

Now we should be able to build our application again via `npm run build` and refresh our app.html
page and we should see an h1 tag with the text "Is this thing on?"

If so, congratulations! You've got a real react component loading up in your app.

## Part 4. Add CSS Styling

In this step we're going to get a CSS loader working in babel so we can style our react components.
We're going to use `PostCSS`, `PreCSS`, and `autoprefixer` to accomplish this.

PostCSS is a CSS framework that takes various plugins to transform an input file into browser
compatible CSS. PreCSS and autoprefixer are two plugins for PostCSS. PreCSS translates a SASS-like
CSS syntax into basic CSS. And autoprefixer handles all the vendor-prefixes for us, so we can
pretend like they don't exist.

### 1. Add dependencies

We need several new dependencies to get this working:

    npm add --save-dev style-loader css-loader postcss-loader precss autoprefixer

### 2. Add PostCSS config in the project root named: `postcss.config.js`

    // postcss.config.js
    module.exports = {
      plugins: {
        precss: {},
        autoprefixer: {}
      }
    }

### 3. Add webpack config rule:

In `webpack.base.js` we need to add a loader rule for css files. After your js rule, add this:

    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]__[local]',
            modules: true,
          },
        },
        'postcss-loader'
      ]
    }

### 4. Add a css file. Add `src/Title.css` add the following CSS:

    .red {
      color: red;
    }

### 5. Now import the css module into your react component. In `src/Title.js` add this import:

    import styles from './Title.css';

And add the class name to our h1 tag. In the render method our return statement should now read:

    return (<h1 className={styles.red}>{text}</h1>);

The `.red` class name in the css file is exposed as a property on the styles object. The value is
a valid class name that can be set on a React component.

### 6. Rebuild application and view the results.

At this point we should be able to rebuild our application via `npm run build` and refresh the
browser and see our title in red.

If so, congratulations! You've got a foundation set up to use CSS in your application.

References:
- [postcss-loader](https://github.com/postcss/postcss-loader)

## Part 5 - Code Splitting

Code splitting is a complex topic that can't be covered easily in a short tutorial, but it is
something that is supported by webpack and is useful to know the basics of.

In essence, if you set your code up right webpack will chunk your code into multiple files that will
be loaded on demand rather than all at once in one huge bundle. This makes initial code loading
faster and allows the client to not download and execute code they don't need, until they need it.

To enable code splitting we're going to use a library called `react-async-component`:

### 1. Add a babel plugin that allows lazy importing:

    npm add --save-dev @babel/plugin-syntax-dynamic-import

### 2. Add plugin to babel config in web:

In `webpack.base.js` in the babel plugins array, add '@babel/plugin-syntax-dynamic-import' at the
end. it should now look like this:


    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import']

### 3. Configure webpack for chunk splitting

In `webpack.base.js` add an output configuration block above module like this:

    output: {
      path: __dirname + '/dist',
      chunkFilename: 'chunk-[id].js',
      publicPath: __dirname + '/dist/',
    }

This will make chunking work properly

### 4. Add the async component library:

    npm add react-async-component

### 5. Write an async component:

At `src/AsyncTitle.js` add the following:

    import { asyncComponent } from 'react-async-component';

    const AsyncTitle = asyncComponent({
      resolve: () => import('./Title').then(module => module.Title),
    });

    export {
      AsyncTitle,
    }

The `import` function call tells JavaScript to load that file from the server if it isn't already
loaded. The asyncComponent function creates a new React component that will cache whether or not
it has loaded its dependency.

### 6. Use the AsyncTitle in `src/index.js`

Now in `src/index.js` change out the Title component for the AsyncTitle component. Change the import
Title line from:

    import { Title } from './Title';

To:

    import { AsyncTitle as Title } from './AsyncTitle';

This will pull in our async component and rename it to Title so we don't have to change out the
remainder of our code.

### 7. Rebuild and reload the app.

Now if you rebuild the app you will see that not only is there a `dist/main.js` but also some code
chunks such as `chunk-0.js` and `chunk-1.js`.

Now if you reload the application it should still look the same with a red h1 tag, however if you
look at the network tab you'll see that not only is main.js loaded but so are the chunks,
separately. If we had not immediately displayed the AsyncTitle component then the loading of the
chunks would have waited until we rendered the Title, and then it would have been loaded on demand.

Congratulations! You now should know enough of the basics of webpack to bootstrap your own
application with react, styling and code chunking!

References:
- [react-async-component](https://github.com/ctrlplusb/react-async-component)
