# Cimpress UI playground

This project contains a template for the Cimpress UI playground.

The contents of the `playground` folder should be a self-contained project that can be opened in StackBlitz. The following restrictions apply within the `playground` folder:

- The project must be self-contained. For that reason we can't use workspaces, and we can't refer to anything outside of the `playground` folder.
- The `package.json` file must contain a `dev` script. This script will be automatically executed when the project is opened in StackBlitz.
- The project should contain a lockfile for optimal launch speed.

## Dependency updates

Dependencies are kept up to date by [Dependabot](.github/dependabot.yml), which opens pull requests against `main`:
