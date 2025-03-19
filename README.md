# Parametrized Tests and Fixtures for Conduit

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`

## Task

1. Create a parametrized test for `signUpNegative.spec.js`. Use `signInNegative.spec.js` as an example.
2. Create parametrized tests for 1, 2, and 5 tags:

    - *User is able to remove all tags from previously created article.*
    - *User is able to add tags on edit to the previously created article.*
    
    Use `createArticleWithTags.spec.js` as an example.
   
3. Create a three-users test with parametrized fixtures `pages` and `users`:
    
    - *User can see in your feeds articles from two different users.*
    
    Use `viewArticleCreatedByAnotherUser.spec.js` as an example.
   
4. Re-run all your tests and make sure they pass after the updates. 

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
