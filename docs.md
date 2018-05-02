# Documentation for Jetson Benefits 

## Table of Contents

* [Architecture](#Architecture-overview)
* [Frontend](#frontend-and-react)
* [Backend](#backend-and-django)
* [Style Guide](#style-guide)
* [Contact Us](#contact-us)

## Architecture Overview

  Our project can be separated out in two compoenents, front-end web app and backend server.  You can see the specifics of each part in there respective sections: [frontend](#frontend-and-react) & [backend](#backend-and-django).  This section will discuss how they fit together.
  
  Our django web app has two separate parts, an API module and a module that serves files.  Our application has the capability to server side render html templating, so when the application recieves a GET request at the root path, the django server renders a simple HTML tmeplate, and then serves up the HTML file along with our assets and a Javascript package that contains our web-app written in react.  All of the front-end files are pre-compiled, so the React application is not rendered-server side.

  The API module of our Django server has a number of defined endpoints that allow the to store their information and recive insurance recommendations.

## Frontend and React
  
  #### Dependencies
  We are using [NPM](https://www.npmjs.com/) (node package manager) to manage all of our front-end dependicies.  The file `package.json` in the root directory of our project lists all of our javascript dependencies and the versions we used during development.  You can use the command `npm install` to quickly install all the dependencies listed in the file.
  
  #### Build Process
  We use a combination of NPM and Webpack to manage our build process for our front-end code.  In our `package.json` file, we have defined a number of commands that allow you to easily build and run the project.  See our `README.md` for specific commands to run.  They are defined in `package.json` in the `scripts` object.

  While we use NPM to trigger our build process, Webpack does the actual work of creating our JS packages that we serve to the browser.  All of the configuration of Webpack can be found in `webpack.config.js` located in the root directory.  Webpack starts at the entry point of our JS files, defined in `config.entry` and recursively moves through that file and all of the depended on files to create on package called `index.bundle.min.js` in the `static/js` directory.  Also included in our config are plugins that: compile our common code into another bundle called `common.bundle.min.js`, inject dependencies into our code, and uglify our production code.  Our Webpack configuration has rules to load different files in `assets/` with loaders.

  #### How it Works
  We used React to create our front-end interfaces.  All of the pre-bundled code can be found in `assets/js`.
  
  Our React entry point is in `assets/js/index.js`.  We are using Redux in combination with React.  Outside of `assets/js/index.js` all of our React code can be found in `assets/js/components/`.  We have 3 folders that hold our Redux related code: `assets/js/actions`, `assets/js/store`, `assets/js/reducers`.
  
  We also have 2 other useful modules.  Auth, in `assets/js/auth.js` houses front-end code related to creating network requests for signing in or up for our application.  Utils, in `assets/js/utils.js` provides some functions as well as constants that are useful through the application. 

  Most components have their own css files.  To change the styles for a component look for the related file in `assets/css`.

## Backend and Django

  #### Dependencies
  We are using [PIP](https://pypi.org/project/pip/) to manage our back-end dependencies.  A list of all of our dependencies can be found in `requirements.txt` in the root directory.  To easily install all of the required dependencies, use the command `pip install -r requirements.txt`.

  #### Database

  #### How it Works

## Style Guide

## Contact Us

  At the conclusion of our project, if you have any further questions about the codebase, feel free to reach out.  Below is a list of team  members you can reach out to.  If you have any questions about a specific part of the codebase, reach out to a team member who worked on that part.

  * Andrew Grossfeld (Frontend, API, Authentication)
    * Cornell Email: amg445@cornell.edu, Personal Email: grossfeld.andrew@gmail.com
  * Logan Allen (Frontend, API)
    * Cornell Email: lga24@cornell.edu
  * Justin Parrat (Frontend)

  TODO: fill in the rest