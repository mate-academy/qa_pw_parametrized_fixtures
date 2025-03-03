# Practice task: Parametrized tests and fixtures for Conduit

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b task_solution
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Create parametrized test for `signUpNegative.spec.js`
- Use as an example `signInNegative.spec.js`. 
2. Create parametrized tests for 1, 2 and 5 tags:
- *User is able to remove all tags from previoulsy created artcile.* 
- *User is able to add tags on edit to the previousy created article.* 
- Use as an example `createArticleWithTags.spec.js`. 
3. Create three-users' test with parametrized fixtures `pages` and `users`.
- *User can see in Your feeds articles from two different users.*
- Use as an example `viewArticleCreatedByAnotherUser.spec.js`
4. Re-run all your tests and make sure they pass after the updates. 
 

## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

