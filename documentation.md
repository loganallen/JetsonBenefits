# Documentation for Jetson Benefits 

## Table of Contents

* [Architecture](#Architecture-overview)
* [Frontend](#frontend-and-react)
* [Backend](#backend-and-django)
* [Next Steps](#next-steps)
* [Comments](#comments)
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

  While we use NPM to trigger our build process, Webpack does the actual work of creating our JS packages that we serve to the browser.  All of the configuration of Webpack can be found in `webpack.config.js` located in the root directory.  Webpack starts at the entry point of our JS files, defined in `config.entry` and recursively moves through that file and all of the depended on files to create on package called `index.bundle.min.js` in the `static/js` directory.  Also included in our config are plugins that: compile our common code into another bundle called `common.bundle.min.js` and inject dependencies into our code.  Our Webpack configuration has rules to load different files in `assets/` with their correct loaders.

  #### How it Works
  We used React to create our front-end interfaces.  All of the pre-bundled code can be found in `assets/js`.
  
  Our React entry point is in `assets/js/index.js`.  We are using Redux in combination with React.  Outside of `assets/js/index.js` all of our React code can be found in `assets/js/components/`.  We have 3 folders that hold our Redux related code: `assets/js/actions`, `assets/js/store`, `assets/js/reducers`.
  
  We also have 2 other useful modules.  Auth, in `assets/js/auth.js` houses front-end code related to creating network requests for signing in or up for our application.  Utils, in `assets/js/utils.js` provides some functions as well as constants that are useful through the application. 

  Most components have their own css files.  To change the styles for a component look for the related file in `assets/css`.

  #### Testing
  TODO

## Backend and Django

  #### Dependencies
  We are using [PIP](https://pypi.org/project/pip/) to manage our back-end dependencies.  A list of all of our dependencies can be found in `requirements.txt` in the root directory.  To easily install all of the required dependencies, use the command `pip install -r requirements.txt`.

  #### Database
  
  To connect the application to the Oracle MYSQL database the settings.py has the connection details. All the details have to be consistent from the mysql database and django application side. Refer [here](https://docs.djangoproject.com/en/2.0/ref/databases/) for in detail steps for the connection.
  
  The database tables are written in the file `app/models.py`. Each table is represented as a class where the columns are represented as attributes. This is easily extensible when new columns have to be added. The database is populted from the files which are present in `app/fixtures`. These are `.json` files which have the data from the tables.

  In order to make changes to the database, you can edit the models in `app/models.py`.  It is important that when you edit the models, you run two commands to update your working database according to your changes.  First you must run `python manage.py makemigrations`.  If there are errors present, then you can fix them, otherwise you then run `python manage.py migrate`.

  #### How it Works
  Our back-end Django application can be separated out into three parts: configuration, file serving, and API.

  The configuration of our application lives in the `jetson/` directory.  In this directory there is a file named `settings.py`, which details the configuration of our server.  A lot of code in this file is boilerplate, however we have specified some specific additional `INSTALLED_APPS` that make our program work.
  * rest_framework & rest_framework.authtoken are used to with some of our API functionality.
  * webpack_loader is used to serve our pre-built Reactjs bundles
  * django_user_agents is used to determine user devices

  The other important configuration file in `jetson/` is `urls.py` which specifies the root URL patterns for our application.  This serves to match url paths to their corresponding view functions.

  The file serving part our application lives in `app/`, `static/`, and `templates/`.  The static files that are served to the front-end are in `static/`.  Our application has one view route, which is just the root path `/`.  When this url is accessed, the templating engine calls the corresponding funciton in `app/views.py` which uses the templating engine to render `templates/index.html` to create a package to pass the the browser.

  Finally, the API portion of our Django application is in the `api/` directory.  The `api/urls.py` file specifies the defined api urls that can be accessed.  The `api/views.py` holds all the implementation logic for our api functions.  These functions have built in user authentication using token authentication.

  #### Authentication and Security

  Our application uses built in Django token authentication scheme to allow users to access our API.  We chose to implement our API in a stateless style, so we opted token authentication over session authentication.  To configure our application for this type of authentication, we added `rest_framework.authtoken` to our `INSTALLED_APPS` as well as the following configuration object on line 79 of `jetson/settings.py`.

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
  
  When a user signs up for our platform, we create a Django User object that out of the box provides a lot of functionality.  The User class has a username field, and password field where it stores hashed passwords.  To authenticate users, you cannot access the plaintext version of the password that was stored, so we use the `authenticate(username, password)` function from `django.contrib.auth`.  When a user access our user signup endpoint, we create a User object with the data sent via POST.  Then we create a Token object that is supplied by the Django Rest Framework.  This object has a foreign key for a User object, so once a Token is created it is associated with a user.  This Token object is used to authenticate users accessing our API via HTTP.  Our application sends a token key to the user once they have authenticated that is stored by our frontend application.  This key is then included in every API request that is sent from the frontend, so that the user can access the API; without a valid token, their access will be denied.  We use authentication decorators for our API functions that either deny request without valid tokens, or add a user field to the request field if authenticated.  An example of a POST request that requires authentication is below:

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

  ```javascript
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

  #### Testing
  TODO

## Next Steps

  While the MVP for this project is more or less complete, there are a few steps that should be taken to convert this a production ready site.  The front-end portion of this project is easy to change and easy to deploy in its current form.  These suggestions for deployment considerations are exclusively for the back-end of this project.  The Django documentation has good advice and will go into more detail about these issues.

  #### Security
  For a production ready deployment of this application, you will most likely want a custom domain name.  While this is not a security issue, you want to configure your domain to use HTTPS.  This will allow end-to-end encryption of any web traffic that is sent from a users browser to the server.  You do not want your new users' passwords sent in plaintext to the backend when they are signing up.  Refer to [here](https://docs.djangoproject.com/en/2.0/topics/security/) for more detail on this topic.  Note that at this stage of our application, we leveraged Django's built in security  to secure our API.  We have also taken steps to combat cross-site scripting and SQL injections.

  #### Hosting
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
