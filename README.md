# Expiration date manager

The easy, intuitive and efficient way to manage a shared food inventory - WIP

A deployment of an older version (before EventSourcing and the navigation overhaul; but supports 2FA) can be found at <https://exdateman.herokuapp.com>; and the current version may be up at <https://exdateman-dev.herokuapp.com>.

Development happens on the `EventSourcing` branch of this repository.


[![Build Status](https://travis-ci.com/Bernd-L/exDateMan.svg?branch=master)](https://travis-ci.com/Bernd-L/exDateMan) ![Dependencies](https://img.shields.io/librariesio/github/Bernd-L/exDateMan.svg) [![Coverage](https://img.shields.io/codeclimate/coverage/Bernd-L/exDateMan.svg)](https://coveralls.io/repos/github/Bernd-L/exDateMan/badge.svg?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/31fda3a4f5da42590f46/maintainability)](https://codeclimate.com/github/Bernd-L/exDateMan/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/31fda3a4f5da42590f46/test_coverage)](https://codeclimate.com/github/Bernd-L/exDateMan/test_coverage) ![Badges Count](https://img.shields.io/badge/badges-not%20enough-orange.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBernd-L%2FexDateMan.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FBernd-L%2FexDateMan?ref=badge_shield)

## Contents

- [Expiration date manager](#expiration-date-manager)
  - [Contents](#contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies used](#technologies-used)
  - [Environment variables](#environment-variables)
    - [SSL](#ssl)
    - [Database connectivity](#database-connectivity)
    - [JSON Web Tokens](#json-web-tokens)
  - [Usage](#usage)
  - [License](#license)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FBernd-L%2FexDateMan.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FBernd-L%2FexDateMan?ref=badge_large)

## Description

ExDateMan (short for "Expiration date manager") is a offline-capable, installable [PWA](https://developers.google.com/web/progressive-web-apps).

It's goal is to provide a simple and intuitive way for people to manage their shared food inventories, allowing them to give read or write access to their inventories.

The items in such an inventory are referred to as "Things", of which each inventory can have multiple. However, they themselves don't actually represent the presence of them in the inventory. Instead, "Stocks" represent the individual instances of the Things in an inventory. They each have an expiration date and get removed from the inventory, after they are removed from the physical inventory.

Designed to be deployed in a [cloud-native](https://github.com/cncf/toc/blob/master/DEFINITION.md) environment, it uses a Postgres database to store its data in an event-sourced fashion, meaning it simply stores events, and only derives the current state form that. This allows one to retroactively view the state of the data from some time ago. This is often also referred to as [CQS](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation).

A Docker image will be available in the future.

## Features

- Offline capable
- PWA compliant
- Synchronization
- Sort by category
- Multi-user capable
- Rights management
- Two factor authentication
- Event sourced data store (CQS)
- Access management per inventory
- Support for occasionally connected devices
- Every physical item has its expression date stored
- A barcode reader to speed up reading in the physical inventory

## Technologies used

The application consists of a Frontend and a Backend.

The frontend is a [SPA](https://en.wikipedia.org/wiki/Single-page_application) implemented in [Angular](https://angular.io), using the [Angular Material](https://material.angular.io) UI library. The backend is implemented in [TypeScript](https://www.typescriptlang.org/) and runs on [Node.js](https://nodejs.org). All data is persisted in Postgres as Events, with one single table. The JSON of each event is stored in the binary JSON format BSON.

## Environment variables

The host-specific configuration is done in environment variables.

The port can be specified using the `PORT` environment variable, and the non-SSL port can be specified using the `INSECURE_PORT` environment variable. They default to 443 and 80 respectively, except when `EDM_SSL` is not set to `yes`, then it will be 80.

### SSL

SSL is optional and can be provided directly by this application. However, it needs to be configured:

| Variable       | Meaning                                              |
| -------------- | ---------------------------------------------------- |
| `EDM_SSL`      | If SSL should be used                                |
| `EDM_SSL_PK`   | The path to the SSL private key file                 |
| `EDM_SSL_CERT` | The path to the SSL certificate file                 |
| `EDM_SSL_CA`   | The path to the SSL certificate authority chain file |

### Database connectivity

Connecting to the database requires some configuration:

| Variable        | Meaning                                           |
| --------------- | ------------------------------------------------- |
| `EDM_DB_HOST`   | The host name of the database                     |
| `EDM_DB_DB`     | The name of the database                          |
| `EDM_DB_USER`   | The username used to connect to the database      |
| `EDM_DB_PORT`   | The port used to connect to the database          |
| `EDM_DB_PWD`    | The password used to connect to the database      |
| `EDM_DB_SSL`    | If SSL should be used to connect to the database  |
| `EDM_DB_SCHEMA` | The name of the schema in which to store the data |

### JSON Web Tokens

| Variable              | Meaning                                            |
| --------------------- | -------------------------------------------------- |
| `EDM_JWT_PRIVATE_KEY` | The path to the private key used to sign JWTs      |
| `EDM_JWT_PUBLIC_KEY`  | The path to the public key used to verify the JWTs |

## Usage

1. Set all environment variables as specified above
2. Install Postgres and Node.js on your server
3. Clone the repo
4. `cd` into the frontend directory
5. Run `npm install && npm run build`
6. `cd` into the backend directory
7. Run `npm install && npm start`

## License

Licensed under the GNU AGPL version 3 license.

Copyright (c) 2018-2019 Bernd-L.
All rights reserved.