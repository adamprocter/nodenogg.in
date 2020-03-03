# Welcome to nodenogg.in

nodenogg.in empowers communities of practice to build and create knowledge by bridging the physical and digital studio spaces. Designers and makers spatially arrange materials, links and thoughts within the shared digital platform.

nodenogg.in is free open source software, built in the open, inclusive by design, private by design, humane centered by design, delightful by design, intuitive and decentralised by design.

# Overarching Guide for Contributions

Contributions to nodenogg.in must abide by the [Delightful Design Manifesto](MANIFESTO.md). More detail on Contributing can be read [here](CONTRIIBUTING.md).

# Getting started

1. Install project dependencies with `yarn` or `npm install`
2. Install packages with `yarn bootstrap` or `npm run bootstrap`

# Installing and removing dependencies
Using `yarn add ...` or `npm install ...` in specific packages will break the links between local dependencies within the project. Instead use lerna to install/remove dependencies:

## Add a NPM dependency to a package
`lerna add example-npm-package packages/app` 
Adds `example-npm-package` to the app and updates the relevant package.json

## Remove a dependency from a package
`lerna remove example-npm-package packages/app`
Removes `example-npm-package` from the app and updates package.json

# Scripts

The `packages:*` scripts will run the following commands in each of the packages that have the associated script available in their package.json file.

* `packages:dev` runs `dev`
* `packages:serve` runs `serve`
* `packages:build` runs `build`
* `packages:lint` runs `lint`

# Keeping up with nodenogg.in

The main site is located at https://nodenogg.in

For blog and short information on development you can see them at my discursive blog under the PhD [category](https://discursive.adamprocter.co.uk/categories/phd/).

There are also development videos on my [YouTube Channel ](https://www.youtube.com/channel/UCiFY1PKloMcquwuOoWmWTwg) or these can be seen live on [Twitch](https://www.twitch.tv/adamprocter).

You read more specific details on development at [researchnot.es](https://researchnot.es/). We also have a [discourse forum](https://discourse.adamprocter.co.uk/) you can join for feedback. If you are contributing to the code we recommend joining the [discord](https://discord.gg/hEADgC7).

If you want to deep dive into the theory that is informing the design process and manifesto visit [manifold](https://manifold.soton.ac.uk).

You can get all of the above via RSS using this [OPML file](https://nodenogg.in/feed/subs.opml) as well.

# Thank you

Built with 💛 using open web tech HTML, CSS, Javascript, Vue.js, PouchDB and CouchDB.

![](https://nodenogg.in/img/interface.7e7c21ca.png)
![](https://nodenogg.in/img/interface2.8e05b906.png)

