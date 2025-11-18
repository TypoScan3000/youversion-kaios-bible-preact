## How to do a release

> This should only ever be done by a Maintainer of the repository.

Releasing is a multi-step process.

### 1. Update Packages (manual)

Changesets CI is not yet set up (as of 2025-08-06). So manual steps will be required. Changesets should already have been created by contributing developers (see [CONTRIBUTING.md](CONTRIBUTING.md)).

Run `yarn version-apps` to apply version updates. This will remove changeset markdown files, update relevant package.json file versions, and update changelogs.

<!-- ##### Update Packages (automatic)

After merging an MR with changesets into `main`, there is an action that will apply those changesets to the appropriate
changelogs and package.json files to a branch named `changeset-release/main` and open a new MR titled `Version Packages`. -->

Review the change applied. If all looks well, merge the version changes.

### 2. Build Apps

Run `yarn build` to build all apps. Requires Node 24 or greater.

### 3. Zip

Zip the relevant app builds (this could be automated as part of the build process). These zip files will be uploaded to the relevant app stores.

### 4. Upload to App Store(s)

#### KaiOS

1. Open [KaiOS store portal](https://developer.kaiostech.com/subpo).
2. Select the correct application.
5. Find the correct version, and "upload new version" for 2.5 or 3.0, depending on which app you're working with.
6. Upload the built zip file for that app and version of KaiOS.
7. Add any relevant details and submit.
8. Open the new app version, and click "test device".
9. Add a comma separated list of IMEIs (the device IDs that can see this app).
10. After all looks good, have the KaiOS store account owner email developersupport@kaiostech.com to have KaiOS review and release the version to production.