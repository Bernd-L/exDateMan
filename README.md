# Expiration date manager

The easy, intuitive and efficient way to manage a shared food inventory - WIP

[![Build Status](https://travis-ci.com/Bernd-L/exDateMan.svg?branch=master)](https://travis-ci.com/Bernd-L/exDateMan) ![Dependencies](https://img.shields.io/librariesio/github/Bernd-L/exDateMan.svg) [![Coverage](https://img.shields.io/codeclimate/coverage/Bernd-L/exDateMan.svg)](https://coveralls.io/repos/github/Bernd-L/exDateMan/badge.svg?branch=master) ![Badges Count](https://img.shields.io/badge/badges-not%20enough-orange.svg)

## Contents

- [Expiration date manager](#expiration-date-manager)
  - [Contents](#contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies used](#technologies-used)
  - [License](#license)

## Description

The purpose of ExDateMan is to know what's in the fridge at a glance, form anywhere, by anyone. It is meant to be deployed to a webserver capable of running node apps.

The user can easily and efficiently add, edit, remove and view the things stocked in ones fridge.
Using a centralized approach, all authorized users (eg. your flatmates) can work together in an intuitive manner when managing their shared food inventory.

## Features

- Items sorted by type
- Quantity of each stock stored as string
- Capable of handling of use-up-in-n-days-after-opening values
- Item types can be assigned categories
- Date pickers
- Mobile friendly
- View the entire inventory and all expiration dates on the start screen at a glance
- Get warned when something is about to expire (wip)
- Added-on dates
- Calculates real expiry date when a use-up-in-n-days-after-opening value is set

## Technologies used

The entire front-end is one single single-page-application made using the best web framework, Angular.
The back-end is written in JavaScript for Node.js.I'm currently working on re-implementing the back-end in TypeScript using [ts-node](https://github.com/TypeStrong/ts-node), as seen on the `ts-node` branch.
The back-end is set up to communicate with the front-end via JSON messages using HTTPS. A postgres database is expected to be available using the following credential mapped as follows:

| Environment variable | Expected value                            |
| -------------------- | ----------------------------------------- |
| `HP_DB`              | The name of the Postgres database         |
| `HP_HOST`            | The host address of the Postgres database |
| `HP_PORT`            | The port of the Postgres database         |
| `HP_PWD`             | The password for the Postgres database    |
| `HP_USER`            | The username for the Postgres database    |

The project has a `Procfile` because this project is meant to be deployed to Heroku.

## License

I may add a license later.

Copyright (c) 2018-2019 Bernd-L.
All rights reserved.
