# Parametrized Tests and Fixtures for Conduit

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands: `npm ci` and `npx playwright install`.

## Task

1. Create parametrized test for `signUpNegative.spec.js`. Use `signInNegative.spec.js` as an example. 
2. Create parametrized tests for 1, 2, and 5 tags:
    - *User is able to remove all tags from previously created article.* 
    - *User is able to add tags on edit to the previously created article.* 
    
    Use `createArticleWithTags.spec.js` as an example.
   
4. Create a three-users test with parametrized fixtures `pages` and `users.`
    - *User can see in your feeds articles from two different users.*
    
    Use `viewArticleCreatedByAnotherUser.spec.js` as an example.
   
6. Re-run all your tests and make sure they pass after the updates. 

## Task Reporting

1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the code review until PR is approved.  
