# UV Universal Frontend

## Development Guideline
Install project dependency and begin serve the development server:
```
$ yarn install
$ yarn global add commitizen
$ yarn serve
```

After that, fire up your favorite IDE and begin editing! ;)

After you finished fixing the issue or implementing a feature, please submit your changes by follow the instruction below:
1. create and switch to a new branch using `git checkout -b {newBranchName}`; the `{newBranchName` should comply with the following format:
    - use `fix-{issueNumber}-{issueSlug}` if you are **fixing an issue**
    - use `feat-{featureSlug}` if you are **implementing a new feature**
    - `{slug}` means a brief URL-friendly description of the work
2. stage your changes using `git add .`
3. then commit your change using `git cz`
4. after that, push your changes to the remote side using `git push --set-upstream origin {branchName}`
5. after you push your changes, go to https://github.com/universal-village/frontend/pull/new/ to create a Pull Request and wait for reviewers to review your change

## To build for production...
```
$ yarn build
```

