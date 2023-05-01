#!/bin/sh
(
    cd ./backend || exit
    poetry config virtualenvs.create true
    poetry config virtualenvs.in-project true
    poetry install
)
(
    cd ./frontend || exit
    npm install
)
