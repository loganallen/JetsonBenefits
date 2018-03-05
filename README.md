# Jetson Benefits Team Build Guide

## Required Downloads
* git
* python 3.6 (or latest) + pip
* virtualenv
* node + npm

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
4. CREATE a virtual environment (do this **once**): `virtualenv env` (on windows:`py -3 -m venv env`) (put this wherever, do NOT commit it to the repo)
5. Enter the virtual environment: `source env/bin/activate` (on windows: `env\scripts\activate.bat`)
6. Install the django requirements: `pip install -r requirements.txt`
7. Exit the virtual environment: `deactivate`

## Development Process
1. Make sure to `git pull` from remote master before implementing changes
2. Run `npm install` to ensure all python packages are included
3. After making JS changes, you need to run `npm run-script build` to recompile the JS
4. Enter the virtual environment and run `python manage.py runserver` to start the dev server
5. Navigate to `localhost:8000` on your browser to view our webpage
6. Exit the virtual environment: `deactivate`

The script `dev-script.sh` is a bash script holding shortcuts for development. To use a specific shortcut, run `./dev-script.sh shortcut`. The following shortcuts are available:
* compile: "npm run-script build'
* run: "python manage.py runserver"

## Rare Errors and how to fix them
* "Invalid configuration object" referring to webpack: solution
	1. ``` npm uninstall webpack ```
	2. ``` npm install webpack@2.1.0-beta.22 --save-dev ```
* "filesystem.statSync is not a function"
	1. ``` npm install babel-loader@7.1.1 --save-dev ```
