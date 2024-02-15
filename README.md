## Mhouse Application
Welcom to the Mhouse's Read me to learn more about how to use this source code.

## Description

A simple single app to help peaople finding real estate services and houses services.

## Versioning
[server] We've used node **18.16.0** in a **9.5.1** npm version. Those tools ares specifically for backend.

[Backend] We've used nestJs **10.1.17** specifically for backend.
The 

[database]

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Mhouse is an MIT-licensed open source project.If you'd like to join them, please [read more here](https://mhouse.com/support).

## Create Super admin user

There is also one super admin user that you can create at this end-point.
---> account/register-sa
After creating super admin account, 2 roles has been created, one superadmin and 1 for customers.

## Login to set app

Login with your super admin credentials to set the app.
---> [POST] /login

## Create privileges

Create all app privileges at this end-point:
---> [POST] /privilege

## Create others roles

Create all app privileges at this end-point:
---> [POST] /role

## Stay in touch

- Author - Mekongo Fouda Thomas Jules

## License

Mhouse is [MIT licensed](LICENSE).
