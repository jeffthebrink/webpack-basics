# Webpack Walkthrough

This repository contains a basic webpack walkthrough to cover basic concepts on how to setup and
configure webpack.

## Part 1. Get a basic script built via webpack

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
