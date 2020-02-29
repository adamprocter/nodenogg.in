# Coding Guidelines

Don’t show off. Its ok if your code is verbose the easier to read, the _better_.

## Getting Started

To get started you need to be running Vue.js and CouchDB. You can install a local CouchDB from https://couchdb.apache.org/ on to your computer. You will need to create a server admin account on your CouchDB for nodenogg.in to use.

Then in the code create a .env.local file at the root (under app) for use in your development the file format is as follows, using in your CouchDB details (obviously).

```
VUE_APP_COUCH_HTTP=http
VUE_APP_COUCH_URL=@127.0.0.1:5984/
VUE_APP_COUCH_USER=username
VUE_APP_COUCH_PASS=yourpassword
```

If you are deploying then create another file called .env.production.local again editing to fit your production CouchDB location.

```
VUE_APP_COUCH_HTTP=https
VUE_APP_COUCH_URL=@myremote.couchdb.com/
VUE_APP_COUCH_USER=username
VUE_APP_COUCH_PASS=yourpassword
```

## Basics

Please note we use [PouchDB](https://pouchdb.com/) to talk to CouchDB. This is what enables offline and local first support.

All the internal code should use the GNU Affero General Public [License](LICENSE.md).Any dependancies that are brought into nodenogg.in must have as open a License as possible. Dependancies should be loaded in via Vue.js ui cli.

Please Use arrow functions,and as much ES6 as possible. The code should be as neat as possible. However all code should be human understandable. So again verbose is good.

All if statements should use curly braces to indicate the statement block { } please

Apply ESLint and Prettier to all code please.
Use the settings in the Vue.js package.json and in your code editor enforce the following conventions.

- singleQuote: true
- semi: false

## Comments and Documentation

Use comments, in fact over use comments.
Feel free to retro add comments after a batch of code.

Use the following format to highlight concerns KEYWORD:Comment. For Example TODO:this needs to be amended to arrow functions. These can also be added as Issues in Github (see note below) but do not need to be.

We want to build docs from the Codebase as well so please use the Standard conventions of [JSDoc](https://jsdoc.app/).

## Gitlab is the truth of the Codebase

All the original code should be stored at the gitlab group https://gitlab.adamprocter.co.uk/nn

## Github mirrored codebase

The code base is mirrored to github for two reasons. Backup and to support organisation of Issues within GitKraken Glo Boards. We recommend [GitKraken](https://www.gitkraken.com/invite/uwPBRPCR) for use with Gitlab.

## Semantic versioning

This repo started at 0.1.0 all branches will be considered patches so the naming convention will be incrementing the final digit MAJOR.MINOR.PATCH so the very next version would be 0.1.1 more on Semantic versioning can be read [here](https://semver.org/)

Versions increase when app code base changes. Documentation changes do not require version changes please.

## Feature Branches

We use the feature branch workflow. Please do not work from master, check out master and branch. Once work is completed do a pull request to the master. A longer guide is [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

There are some special branches which will deploy to online versions of nodenogg.in, beta, alpha and release. Do not work from or pull request to these branches. These are used for internal deployment only.

## Changelog

Please update the [Changelog](CHANGELOG.md) as part of a pull request to the master.

## Languages Used

As much Vanilla javascript as possible and Vue.js.
