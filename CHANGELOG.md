# 0.1.3

_4th March 2020_

### Added

- Emoji Reaction support. You can now add Emoji reactions to node cards.

### Changed

- Version stated in package.json is pulled into About.vue. Meaning version can now be updated in one place.
- Added link to this CHANGELOG.md on About.vue

### Fixed

– Box sizing so textarea now is same width.

- Textarea ignores drag allowing selections.
- Markdown images now resize to fit node card width.
- About.vue link to code now correct to nn group repo.

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
