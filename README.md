# Nebraska Mushrooms

Deployment

* Pushes to `main` are built by GitHub Actions (`.github/workflows/deploy.yml`) and deployed to Firebase Hosting.
* Pull requests get a temporary preview URL, posted as a comment on the PR.
* Hosting config (redirects, cache headers) lives in `firebase.json`.

Known Issues

* Taxa page, not displaying all results - /taxa/protozoa/