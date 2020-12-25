# 0.1.47

_23rd December 2020_

### Changed

- Hiding shortcut tips now will stay hidden per session. (n.b this hides them on all views)
- Focusses input when creating new node enabling fasting entry.
  - in Collect view press n, instantly type in ideas, press tab, press n for next idea (SO FAST!)

### Fixed

- Fixed min width and height on nodes (support towards better auto resizing).
- Keyboard shortcut n key more fixes in Organise and Card view.(should work all the time)

### Removed

- Removed Specific offline component as if app goes offline mid connection it should work just fine, in all views.

# 0.1.46

_18th Decemeber 2020_

### Fixed

- The initial onboarding microcosm should not longer allow you to save nodes.
- Keyboard shortcut n now works on Collect view on first visit to new microcosm.

# 0.1.45

_17th December 2020_

### Changed

- Card view can now be sorted however this is not saved yet.

### Fixed

- Some sync bug fixes.
- You can now colour nodes in Collect and Card views.
- initial node creation failed on new microcosm without switching views.
- Force load on Collect view.

# 0.1.44

_14th December 2020_

### Changed

- Upload is now smarter and will generate markdown for images, video and audio "automagically", media that is not recognised will be uploaded and generated as a plain URL (link).
- Now using Cloudflare's IPFS Gateway as we move towards more robust upload support.
- Video is using using infura gateway (cloudflares gateway doesnt like playing back video)

### Added

- You can now Drag and drop to upload.

# 0.1.43

_12th December 2020_

### Fixed

- Partial fix so that nodes will resize to fit content (after dragging into position)

# 0.1.42

_11th December 2020_

### Added

- You can now colour code your nodes.

# 0.1.41

_11th December 2020_

### Changed

- added basic z-index incrementing, when you touch a node it will jump to the front a node gets to within max z-index > 2147483640 all nodes will reset to 0.

# 0.1.40

_9th December 2020_

## Fixed

- Connections are now working in the same way as before but using native SVG code and no longer the pixi library.

# 0.1.39

_8th December 2020_

### Changed

- edits to the new computed filter to use watch / unwatch over a timer for initial load should mean doesn't matter on hardware or network all nodes will load when ready.

### Fixed

- brought back selecting text and not dragging missed class.

# 0.1.38

_7th December 2020_

### Changed

- read mode is now attached to each node instead of positions.
- node text and positioning is now using a computed filter - so the iterating should be less CPU intensive.

### Fixed

- pressing n on keyboard when editing node in card view no longer creates nodes.

### Removed

- Pixi.js for drawing connections (temporary removal replacement tech needed).

# 0.1.37

_30th November 2020_

### Fixed

- Add emoji reactions is no longer missing from Cards view.
- Long URLS now wrap when viewing on smaller screen sizes, to accommodate increased link text.

# 0.1.36

_20th November 2020_

### Changed

- Custom Events now use kebab-case as best practice and also prep for Vue 3

### Fixed

- a human can use spaces, dashes and caps if they like in name and microcosm but couchDB doesn't like them so they are removed on input
- you can no longer join a microcosm without setting a name, this stops human from thinking they are safe to create nodes

# 0.1.35

_7th November 2020_

### Changed

- Edited a lot of the onboarding language

### Added

- Welcome information node is now part of collect mode too
- Prompt for pressing leave icon
- Tip when pressing download icon to paste into a node

# 0.1.34

_6th November 2020_

### Changed

- Added organise mode tips node
- Edits to text to help onboarding
- updates icons to new style

### Fixed

- when zoomed out you can now move nodes correctly

# 0.1.33

_4th November 2020_

### Changed

- made width of nodes wider in card view
- made typing wider in all modes
- links (a tag elements) are now much bigger on small screens (under 600px) to add with tapping

# 0.1.32

_30th October 2020_

### Added

- Read Mode in Cards view for your nodes now

### Fixed

- Put back in place the quick switching so your device name is not wiped unless you say so, regression that I missed !
- missing markdown guide link in collect view explainer card
- fixed so shortcuts now work all the time

# 0.1.31

_30th October 2020_

### Added

- Collect mode welcome/ explainer node
- You are now warned before you discard a node
- Basic upload and get upload to Collect mode

### Changed

- Fixing up CSS a little for consistency

### Fixed

- Duplicate key issue for welcome node
- iOS router based blank screen issue

# 0.1.30

_23rd October 2020_

### Changed

- Deployed a work around for switching between pre-made microcosms.

# 0.1.29

_16th October 2020_

### Changed

- name is now stored unless cleared meaning you can switch microcosms faster on any device.

# 0.1.28

_10th October 2020_

### Fixed

- Changes and additions in 0.1.26 and 0.1.27 poor implementation of changed so have refactored to work correctly on mobile.

### Removed

- Toolbar showing current microcosm, poor implementation.

# 0.1.27

_9th October 2020_

### Added

- Basic card view of all nodes
- Leave link in Navigation

### Changed

- List view now you can enter basic read mode
- List view you can now discard your nodes

# 0.1.26

_6th October 2020_

### Changed

- Renamed Mobile to List
- Refactored the way the list and discarded view work
- Added some basic style to list and discarded views

### Added

- The toolbar now shows (in basic form) to you only your device name and the microcosm you are currently viewing

# 0.1.25

_2nd October 2020_

### Fixed

- Major sync bug when multiplayer is now fixed!

# 0.1.24

_23rd September 2020_

### Changed

- Node button changed wording from Hide to Discard

### Added

- Brand new view for discarded nodes, you can now see your own discarded nodes and restore them (very unstyled at the moment)

### Fixed

- Fixed Connections bug that didn't respect start and end state and so would make odd connections

# 0.1.23

_19th September 2020_

### Changed

- Connections now draw a little more dynamically and all code in ConnectionsLayer Component
- Fixed Onboard text field focus and enter keyboard shortcut on Onboarding now works

# 0.1.22

_29th August 2020_

### Added

- Keyboard Shortcuts now available the main modes to speed up workflow
- Tips node added to each microcosm to explain shortcuts

### Fixed

- You can no longer drag around another designers node while in move mode/ connect mode

# 0.1.21

_26th August 2020_

### Changed

- Delete node button now labelled Hide to more accurately convey its action (undo / see all your hidden nodes view coming)
- Minor tweaks to order for of onboarding

### Added

- version 1 of connections you can now connect nodes, drawn using PixiJS

# 0.1.20

_14th July 2020_

### Changed

- Updated z-index on initial creation to easier to see you have created a few

### Fixed

- hid IPFS debug information

# 0.1.19

_13th July 2020_

### Changes

- List view has be renamed mobile view and works better on smaller devices. Allow for quick capture of ideas whislt using a smaller screen (not perfect but better than before)

### Fixed

- IPFS Media is working (updated code for 0.49.0)

# 0.1.18

_2nd July 2020_

### Changes

- Tweaked onboarding wording.
- Edited some button text.
- Edited CSS a little for text boxes.
- Hide connection mode button for now.

### Fixed

- Offline mode reloads correctly when you are back online.
- Move mode showed wrong styling.

# 0.1.17

_25th June 2020_

### Added

- Local _scribble_ mode, selecting the pencil mode on touch devices allows drawing, this is not saved and it local to you only (for now).

# 0.1.16

_22nd June 2020_

IPFS doesn't work in current release of Safari Version 13.1.1 (15609.2.9.1.2) - unhandled promise issue - Safari tech preview, Edge, Firefox all fine

### Added

- IPFS file support, https://ipfs.io/ - use upload icon to save file IPFS and then download icon to save image markdown to then paste into any nodes. Although all files are supported the download assumes an image for now.

### Removed

- Hidden test IPFS view from build.

# 0.1.15

_17th June 2020_

This version adds some testing components and these are not part of the future direct but allow testing of features that will be folded in when better understand in terms of tech or awaiting proper implementation.

### Added

- test view for IPFS.
- test view for list of your nodes (mobile).

### Changed

- more CSS edits.

### Removed

- Hidden previous canvas view from build.

# 0.1.14

_8th June 2020_

### Changed

- edited CSS to be more mobile friendly (just a little).
- edited CSS to make things look a little nicer.

### Added

- created the brand new onboarding microcosm, all new devices will see this view on arrival.

# 0.1.13

_7th June 2020_

### Added

- Leave microcosm button added to toolbar.
- Add simple offline mode if your device disconnects.

### Changed

- Tool bar add node works in basic format (press it to create node).
- Home by default is the new spatial view.

# 0.1.12

_4th June 2020_

### Added

- Read status is now in store so preserved for your nodes.
- iOS Home screen icon.

# 0.1.11d

_2 June 2020_
This version has been moved to alpha as I need to use the app more and thus drive some more development. The COVID-19 pandemic has slowed things down a lot and this version moves to introduce the new spatial mode. The new spatial mode is still missing some vital component to the main home version however for now keeping both old and new views should allow for a quicker capture of some of the missing components that need to be added to Sandbox.

### Changed

- New menu bar at the top.
- Sandbox view is a updated view of nodenogg.in and will replace home.

# 0.1.11

_10th April 2020_

### Added

- You can now switch between spatial view (organise) and list view (bucket mode).

### Fixed

- Typo in CHANGELOG.md.

# 0.1.10

_7th April 2020_

### Added

- You can now visit a microcosm by using URL followed by https://baseurl.com/microcosm/**microcosmname**/ to direct someone to a specific microcosm, if they have used any microcosm before they will enter with there device/ object name. If they have not they need to assign a object name.

### Changed

- You can now see the microcosm you are connected to and your object name.

### Fixed

- Create/ Join a new microcosm now reloads URL dependant on whether in development or production environment.

# 0.1.9

_26th March 2020_

### Added

- Simple read mode for your own nodes can now be activated.

### Changed

- made some minor changes to textarea CSS.

# 0.1.8

_25th March 2020_

### Added

- New start of Keyboard Shortcut support, pressing n key now creates new nodes.

### Changed

- Simplified About page opening text.

# 0.1.7

_15th March 2020_

### Changed

- Delete will now remove the node from view.

# 0.1.6

_14th March 2020_

### Changed

- Changed to HTML History mode, removing Hash from URL.

### Fixed

- Safari reload bug on initial creation of microcosms.
- Pressing Enter allows quick onboard aswell, also no reload.

# 0.1.5

_14th March 2020_

### Changed

- Added BaseButton Component to use for all buttons.
- removed CanvasLayer. and DeBug.vue no longer necessary as CanvasLayer is being rebuilt and Debug buttons all moved to ControlsLayer.vue.
- Minor CSS changes as well.

# 0.1.4

_11th March 2020_

### Added

- Added a SCHEMA.md document to the repo to outline the way to call to the data in PouchDB/ CouchDB.

### Changed

- Changed store/index.js, Home.vue, NodesLayer.vue and OtherNodeslayer.vue to work with new Schema structure.

# 0.1.3

_4th March 2020_

### Added

- Emoji Reaction support. You can now add Emoji reactions to node cards.

### Changed

- Version stated in package.json is pulled into About.vue. Meaning version can now be updated in one place.
- Added link to this CHANGELOG.md on About.vue.

### Fixed

- Textarea ignores drag allowing selections.
- Markdown images now resize to fit node card width.
- About.vue link to code now correct to nn group repo.
- CSS Box-sizing so textarea is correct width.

# 0.1.2

_1st March 2020_

### Added

- Imported missing css for handles for vue draggable, nodes are now resizable.
- Size of node is also sync'd in realtime cross devices.

# 0.1.1

_29th Feb 2020_

After Toby tried to start working on the main code base it soon become evident that the CouchDB set up was problematic. So I have moved this to environmental variables and now you can set up and use local and remote CouchDBs. The CouchDB needs to be on and have a server admin account so you can enter these into the environment variables. This reduces the process for onboard developers a lot!

### Changed

- Now using CouchDB 3.
- Now using Environmental Variables (.env) to store the URL and log in for CouchDB meaning you can now change this information to suit your setup.
- Changed DeBug.vue to reload to your current install local or otherwise.

# Guide

## Use the following headers for each log

Delete as you see fit and use # for version number

- Added – For any new features that have been added since the last version was released
- Changed – To note any changes to the software’s existing functionality
- Deprecated– To note any features that were once stable but are no longer and have thus been removed
- Fixed– Any bugs or errors that have been fixed should be so noted
- Removed– This notes any features that have been deleted and removed from the software
- Security– This acts as an invitation to users who want to upgrade and avoid any software vulnerabilities

Here is set to copy

### Added – For any new features that have been added since the last version was released

### Changed – To note any changes to the software’s existing functionality

### Deprecated– To note any features that were once stable but are no longer and have thus been removed

### Fixed– Any bugs or errors that have been fixed should be so noted

### Removed– This notes any features that have been deleted and removed from the software

### Security– This acts as an invitation to users who want to upgrade and avoid any software vulnerabilities
