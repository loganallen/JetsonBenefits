# Documentation for Jetson Benefits 

## Table of Contents

* [Architecture](#Architecture-overview)
* [Frontend](#frontend-and-react)
* [Backend](#backend-and-django)
* [Next Steps](#next-steps)
* [Comments](#comments)
* [Contact Us](#contact-us)

## Architecture Overview

  Our project can be separated out in two components, a frontend web app and a backend server.  You can see the specifics of each part in their respective sections: [frontend](#frontend-and-react) & [backend](#backend-and-django).  This section will discuss how they fit together.
  
  Our Django web app has two separate parts, an API module and a module that serves files.  Our application has the capability to render HTML templates on the server, so when the application recieves a GET request at the root path, the Django server renders a simple HTML template, and then serves up the HTML file along with our assets and a Javascript package that contains our webapp written in react.  All of the frontend files are pre-compiled, so the React application is not rendered-server side.

  The API module of our Django server has a number of endpoints that allow the user to store their information and recieve insurance recommendations.

## Frontend and React
  
  ### Dependencies
  We are using [NPM](https://www.npmjs.com/) (node package manager) to manage all of our frontend dependencies.  The file `package.json` in the root directory of our project lists all of our Javascript dependencies and the versions we used during development.  You can use the command `npm install` to quickly install all the dependencies listed in the file.
  
  ### Build Process
  We use a combination of NPM and Webpack to manage our build processes for our frontend code.  In our `package.json` file, we have defined a number of commands that allow you to easily build and run the project.  See our `README.md` for specific commands to run.  They are defined in `package.json` in the `scripts` object.

  While we use NPM to trigger our build process, Webpack does the actual work of creating our JS bundles that we serve to the browser.  The configuration of Webpack for this project can be found in the file `webpack.config.js` located in the root directory.  Webpack starts at the entry point of our JS files, defined in `config.entry` and recursively moves through that file and all of the depended on files to create on package called `index.bundle.min.js` in the `static/js` directory.  Also included in our config are plugins that: compile our common code into another bundle called `common.bundle.min.js` and inject dependencies into our code.  Our Webpack configuration has rules to load different file types (css & js) in `assets/` with their correct loaders.

  ### Directory Structure

  All of our frontend source code can be found in the `assets/js` directory.

  Our React entry point is in `assets/js/index.js`.  Outside of `assets/js/index.js` all of our React code can be found in `assets/js/components/`.  We have 3 folders that hold our Redux related code: `assets/js/actions`, `assets/js/store`, `assets/js/reducers`.
  
  We also have 2 other useful modules.  Auth, in `assets/js/auth.js` houses frontend code related to creating network requests for signing in or up for our application.  Utils, in `assets/js/utils.js` provides some functions as well as constants that are useful through the application.
  
  ### Using React

  We used React to build our frontend interfaces for this project.  React is a Javascript view framework written by Facebook, the documentation can be found [here](https://reactjs.org/).  The basic idea behind React is that it allows for very fast page rendering and re-rendering by creating a `virtual-dom` and then using diff algorithms to only re-render the real `dom` elements that have changed.  It also provides a convientent way to structure frontend code so that it doesn't get too messy.

  The building blocks of a React application are React components.  We can create components by extending the `React.Component` class.  You can see examples of this in every component we have created for the site.  For the simplest example, look to `assets/js/App.js`.  This is the base component that gets rendered in our webapp.

  ```Javascript
  class MyComponent extend React.Component {
    render() {
      // render markup here
      <h1>Page Title</h1>
    }
  }
  ```

  The example above shows the most basic way to make a component.  To actual display something, you must override the `render` method.  Look to any of our Javascript files in `assets/components` for examples of rendering components.
  
  React is often used with JSX, which provides a convienent way to write HTML markup directly into a Javascript.  So, we are able to write a `<h1>` tag directly into our Javascript function.

  This should be enough to get you started if you have never used React before.  For a more detailed tutorial, visit [https://reactjs.org/](https://reactjs.org/).

  ### Redux and React Router
  TODO

  ### CSS Styling

  Our React components have their own css files.  To change the styles for a component look for the related file in `assets/css`.

  To create styles for different viewports, we used CSS media queries.  They allow you to specify different style rules based on viewport, medium, etc.  You can find examples of this in any of our css files.  Look for the following sytnax below:

  ```css
  @media screen and (/* condition */) {
    /* styles here */
  }
  ```

  ### Comments

  #### Class Method Declaration

  When extending `React.Component` to create our own custom components, we used two different syntaxes to declare class methods.
  
  ```Javascript
  class App extends React.Component {
    ...
    componentWillMount() {
      // listen for window resize and update deviceWidth in store
      window.addEventListener('resize', this.props.emitDeviceWidthUpdate);
      // listen for reload, or leaving page events --> makes sure user doesn't lose changes on accident
      window.addEventListener('beforeunload', this.onUnload);
    }
  }
  ```
  The example above is taken from the App class in `App.js`.  We use this method declaration syntax because the function `componentWillMount` overrides a class method specified in the `React.Component` class we are extending.  These functions have the `this` (the class object) correctly bound to the function already.

  ```Javascript
  class App extends React.Component {
    ...
    onUnload = () => {
      const message = 'Are you sure you want to abondon you unsaved changes?';
      event.returnValue = message;
      return message;
    }
  ```
  In the example above, we declare an anonymous function and then assign it to the variable `onUnload`.  Because `onUnload` not specified in `React.Component`, we use this syntax to leverage Javascript autobinding the correct `this` object to the function, where `this` is the class instance.


  ### Testing
  
  We did not use a testing framework for unit testing our frontend code.  Instead, we carried out user testing as detailed in our final project report.  While developing the frontend, we made heavy use of the browser developer console.  If you are not familiar with debugging frontend code, then I would recommend using Google Chrome for debugging.  It provides a useful interface for inspecting elements and testing.  There are also React specific debugging plugins that are available for Chrome.

## Backend and Django

  ### Dependencies
  We are using [PIP](https://pypi.org/project/pip/) to manage our backend dependencies.  A list of all of our dependencies can be found in `requirements.txt` in the root directory.  To easily install all of the required dependencies, use the command `pip install -r requirements.txt`.

  ### Database
  
  To connect the application to the Oracle MYSQL database the settings.py has the connection details. All the details have to be consistent from the mysql database and django application side. Refer [here](https://docs.djangoproject.com/en/2.0/ref/databases/) for in detail steps for the connection.
  
  The database tables are written in the file `app/models.py`. Each table is represented as a class where the columns are represented as attributes. This is easily extensible when new columns have to be added. The database is populted from the files which are present in `app/fixtures`. These are `.json` files which have the data from the tables.

  In order to make changes to the database, you can edit the models in `app/models.py`.  It is important that when you edit the models, you run two commands to update your working database according to your changes.  First you must run `python manage.py makemigrations`.  If there are errors present, then you can fix them, otherwise you then run `python manage.py migrate`.

  ### How it Works
  Our back-end Django application can be separated out into three parts: configuration, file serving, and API.

  The configuration of our application lives in the `jetson/` directory.  In this directory there is a file named `settings.py`, which details the configuration of our server.  A lot of code in this file is boilerplate, however we have specified some specific additional `INSTALLED_APPS` that make our program work.
  * rest_framework & rest_framework.authtoken are used to with some of our API functionality.
  * webpack_loader is used to serve our pre-built Reactjs bundles
  * django_user_agents is used to determine user devices

  The other important configuration file in `jetson/` is `urls.py` which specifies the root URL patterns for our application.  This serves to match url paths to their corresponding view functions.

  The file serving part our application lives in `app/`, `static/`, and `templates/`.  The static files that are served to the frontend are in `static/`.  Our application has one view route, which is just the root path `/`.  When this url is accessed, the templating engine calls the corresponding funciton in `app/views.py` which uses the templating engine to render `templates/index.html` to create a package to pass the the browser.

  Finally, the API portion of our Django application is in the `api/` directory.  The `api/urls.py` file specifies the defined api urls that can be accessed.  The `api/views.py` holds all the implementation logic for our api functions.  These functions have built in user authentication using token authentication.

  ### Authentication and Security

  Our application uses built in Django token authentication scheme to allow users to access our API.  We chose to implement our API in a stateless style, so we opted for token authentication over session authentication.  To configure our application for this type of authentication, we added `rest_framework.authtoken` to our `INSTALLED_APPS` as well as the following configuration object on line 79 of `jetson/settings.py`.

  ```python
  REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
  }
  ```
  
  When a user signs up for our platform, we create a Django User object.  The User object, out of the box, provides a lot of functionality.  The User class has a username field, and password field where it stores hashed passwords.  To authenticate users, you cannot access the plaintext version of the password that was stored, so we use the `authenticate(username, password)` function from `django.contrib.auth`.  When a user accesses our signup endpoint, we create a User object with the data sent via POST.  Then we create a Token object that is supplied by the Django Rest Framework.  This object has a foreign key for a User object, so once a Token is created it is associated with a user.  This Token object is used to authenticate users accessing our API via HTTP.  Our application sends a token key to the user once they have authenticated that is stored by our frontend application.  This key is then included in every API request that is sent from the frontend, so that the user can access the API; without a valid token, their access will be denied.  We use authentication decorators for our API functions that either deny a request without a valid token, or add a user field to the request field if authenticated.  An example of a POST request that requires authentication is below:

  ```python
  @api_view(['POST'])
  @authentication_classes((TokenAuthentication,))
  @permission_classes((IsAuthenticated,))
  def authenticatedUsersOnly():
    # if you are here, the user is authenticated
    user = request.user
  ```
  
  To correctly pass a token to the API, you must set the HTTP `Authorization` header to include the token.  The required format is:

    Authorization: Token token_string_here
  
  Below is an example from `assets/js/actions/index.js` of correctly sending the token over the network in an AJAX request.

  ```Javascript
  const fetchAllInsuranceQuotes = (token) => (dispatch, getState) => {
    $.ajax({
        type: 'GET',
        url: Endpoints.GET_ALL_INSURANCE_QUOTES,
        data: {},
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Token " + token);
        }
    }).done(res => {
        // action when the request is done
    }).fail(err => {
        console.log('fetchAllInsuranceQuote FAILURE', err);
    });
  }
  ```
  
  Here in the `beforeSend` object, we set a function that takes the request and adds the correctly formatted authorization header.

  ### Testing
  TODO

## Next Steps

  While the MVP for this project is more or less complete, there are a few steps that should be taken to convert this a production ready site.  The front-end portion of this project is easy to change and easy to deploy in its current form.  These suggestions for deployment considerations are exclusively for the back-end of this project.  The Django documentation has good advice and will go into more detail about these issues.

  ### Security
  For a production ready deployment of this application, you will most likely want a custom domain name.  While this is not a security issue, you want to configure your domain to use HTTPS.  This will allow end-to-end encryption of any web traffic that is sent from a users browser to the server.  You do not want your new users' passwords sent in plaintext to the backend when they are signing up.  Refer to [here](https://docs.djangoproject.com/en/2.0/topics/security/) for more detail on this topic.  Note that at this stage of our application, we leveraged Django's built in security  to secure our API.  We have also taken steps to combat cross-site scripting and SQL injections.

  ### Hosting
  Refer [here](https://docs.djangoproject.com/en/2.0/howto/deployment/) for deploying this Django application to a live server.

## Comments

## Contact Us

  At the conclusion of our project, if you have any further questions about the codebase, feel free to reach out.  Below is a list of team  members you can reach out to.  If you have any questions about a specific part of the codebase, reach out to a team member who worked on that part.

  * Andrew Grossfeld (Frontend, API, Authentication): amg445@cornell.edu
  * Logan Allen (Frontend, API): lga24@cornell.edu
  * Justin Parratt (Frontend)
  * Liza Mansbach (UI, UX, User Testing)
  * Alison Molchadsky (Backend, Database)
  * Sabah Qazi (Backend, Database)
  * Nicolas Ferretti (Backend, Database)
  * Ruzeb Chowdhury (Backend, Database)
