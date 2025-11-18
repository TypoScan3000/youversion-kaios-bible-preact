## Contribution Guidelines

> NOTE: When running `yarn changeset` do not select "major".  
> Only minors and patches should be selected, as major versions need to match the KaiOS store version the app is targeting and will be added automatically during the build step.
> Ideally the apps and core will have the same minor and patch version to stay in sync across releases.

- Make your changes (as per usual)
- Before you make a Merge Request, run the `yarn changeset` command and answer the questions that are asked. It will want to know:
  - which packages you want to publish
  - what version you are releasing them at
  - a message to summarise the changes (this message will be written to the changelog of bumped packages)
- Before you accept the changeset, it will display all the data that will be written to the changeset. If this looks fine, agree, and a changeset will be generated in the `.changeset` directory.

After this, a new changeset will be added which is a markdown file with YAML front matter.

```
-| .changeset/
-|-| UNIQUE_ID.md
```

The message you typed can be found in the markdown file. If you want to expand on it, you can write as much markdown as you want, which will all be added to the changelog on publish. If you want to add more packages or change the bump types of any packages, that's also fine.

While not every changeset is going to need a huge amount of detail, a good idea of what should be in a changeset is:

- WHAT the change is
- WHY the change was made
- HOW a consumer should update their code

An example, if you generate a changeset that includes `@kaios-bible/core` as a patch, and `@kaios-bible/hindi` as a minor, you can merge your MR, and the next time the `version` command is run, these will both be updated.

```md
---
'@kaios-bible/core': patch
'@kaios-bible/hindi': minor
---

A very useful description of the changes should be here.
```

You can have multiple changesets in a single PR. This will give you more granular changelogs, and is encouraged.

<!-- Once you are satisified with your changeset, open an MR into the `main` branch of the repository. A CI job will comment on your MR with the new package versions resulting from the changesets in your MR. -->

#### Changeset guidelines

We sometimes lovingly pick on the wording of our changesets because these end up in changelogs that people like you read. We want to try to get a consistent tone of voice while providing useful information to the reader.

In particular, please try to write in the past tense (e.g. "Added a new feature" rather than "Add a new feature") and write in complete sentences. This means proper capitalization and punctuation, including full stops/periods at the end of sentences. We try to be terse when possible but if needed it's fine to write multiple lines including examples for changing APIs.

Any changes that need to be published need a changeset, or they will not get published.

## Release Guidelines

See [DISTRIBUTING.md](DISTRIBUTING.md)
