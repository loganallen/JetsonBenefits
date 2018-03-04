# Jetson Benefits Team Build Guide

## Required Downloads before starting
* python 3.6 (or latest) + pip
* virtualenv
* node + npm
* django + djangorestframework
* webpack + webpack-cli
* django-webpack-loader



## Recommended Downloads
* Sublime Text / VSCode
* Gitbash / anaconda prompt
* Anaconda (python extender)

## Installation Process
1. Install the above required downloads
2. Clone the Jetson team repo into a local directory [Repo Link](https://github.com/loganallen/JetsonBenefits)
3. Navigate to the root directory for the project and run ```npm install --save-dev jquery react react-dom webpack webpack-bundle-tracker babel-loader babel-core babel-preset-es2015 babel-preset-react```

##Common Errors and how to fix them
* "Invalid configuration object" referring to webpack: solution
	1. ``` npm uninstall webpack ```
	2. ``` npm install webpack@2.1.0-beta.22 --save-dev ```
* "filesystem.statSync is not a function"
	1. ``` npm install babel-loader@7.1.1 --save-dev ```