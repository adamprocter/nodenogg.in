# Coding Guidelines

Don’t show off. Its ok if your code is verbose the easier to read, the _better_.

All our code will use the GNU Affero General Public [License](LICENSE.md).Any dependancies that are brought into nodenogg.in must have as open a License as possible. Dependancies should be loaded in via Vue.js ui cli.

## Basics

Please Use arrow functions as much ES6 as possible. We want the code to be as neat as possible. However all code should be human understandable. So again verbose is good.

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

This repo started the 0.1.0 From now on all branches will be considered patches so the naming convention will be incrementing the final digit MAJOR.MINOR.PATCH so the next version is 0.1.1 more on Semantic versioning can be read [here](https://semver.org/)

Versions increase when app code base changes. Documentation changes do not bump versions.

## Feature Branches

We use the feature branch workflow. Please do not work from master, check out master and branch. Once work is completed do a pull request to master. A longer guide is [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

There are special branches which will deploy to online versions of nodenogg.in, beta, alpha and release. Do not work from or pull request to these branches. These are used for deployment only.

```
plantuml
!define ICONURL https://raw.githubusercontent.com/tupadr3/plantuml-icon-font-sprites/v2.1.0
skinparam defaultTextAlignment center
!include ICONURL/common.puml
!include ICONURL/font-awesome-5/gitlab.puml
!include ICONURL/font-awesome-5/java.puml
!include ICONURL/font-awesome-5/rocket.puml
!include ICONURL/font-awesome/newspaper_o.puml
#White {
FA5_GITLAB(gitlab,master,node) #White
FA5_GITLAB(gitlab2,Beta,node) #White
FA5_ROCKET(rocket,Integrated,node) #White
}
gitlab ..> gitlab2
gitlab2 ..> rocket

```

## Changelog

Please update the [Changelog](CHANGELOG.md) as part of a pull request to the master.

## Languages Used

As much Vanilla javascript as possible and Vue.js
