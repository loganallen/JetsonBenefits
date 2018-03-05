#!/bin/bash
# Bash script for development shortcuts

CMD=$1

compile_js() {
    echo "Re-compiling javascript"
    npm run-script build
}

run_server() {
    echo "Running dev server..."
    python manage.py runserver
}

activate_env() {
    echo "Activating virtual environment"
    source env/bin/activate
}

# Run the appropriate command
case $CMD in
    "compile")
        compile_js;;
    "run")
        run_server;;
    "env")
        activate_env;;
    "")
        echo "ERROR: Expected shortcut as a parameter";;
    *)
        echo "ERROR: Shortcut not recognized"
        echo "Try one of the following: [ compile | run ]";;
esac
