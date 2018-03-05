# Jetson Benefits Team Build Guide

## List of Dependencies
### Before asking about errors double check all are installed
* git
* python 3.6 (or latest) + pip
* virtualenv
* node + npm
* django + djangorestframework
* webpack + webpack-cli
* django-webpack-loader



## Recommended Downloads
* Sublime / VSCode
* Gitbash / anaconda prompt
* Anaconda (python extender)
* Chrome

## Installation Process
### If you have questions/errors and are on a mac: ask Andrew, windows: ask Justin
1. Install the above required downloads
2. Clone the Jetson team repo into a local directory [Repo Link](https://github.com/loganallen/JetsonBenefits)
3. Install the Python packages: navigate to the root directory for the project and run `npm install`
4. Create a virtual environment (do this **once**): `virtualenv env` (on windows:`py -3 -m venv env`) (put this wherever, do NOT commit it to the repo)
5. Enter the virtual environment: `source env/bin/activate` (on windows: `env\scripts\activate.bat`)
6. Install the django requirements: `pip install -r requirements.txt`
7. Run our dev server: `python manage.py runserver`
8. Navigate to `localhost:8000` on your browser and you should see "Hello, Jetson Benefits!"
9. Exit the virtual environment: `deactivate`

## Rare Errors and how to fix them
* "Invalid configuration object" referring to webpack: solution
	1. ``` npm uninstall webpack ```
	2. ``` npm install webpack@2.1.0-beta.22 --save-dev ```
* "filesystem.statSync is not a function"
	1. ``` npm install babel-loader@7.1.1 --save-dev ```
