# Contributing Guidelines

## Thanks for taking time to contribute!

### Following the steps below will make your contribution process nice and easy

## Step 1: Fork the repository

Click the "Fork" button at the top of this page. This action will create a copy of this repository in your GitHub account.

## Step 2: Clone the repository

Go to your GitHub account, open the forked repository, click on the "Code" button, and then click the "Copy to clipboard" icon.

Open your terminal and run the following command, replace  `url copied` with the copied URL:

```shell
git clone "url copied"
```

This will clone the forked repository to your local machine.

## Step 3: Change the directory

If not already there, run

```shell
cd ListExtender
```

## Step 4: Create a branch
Make a new branch, its best practice and important to make new branch for avoiding the merge conflicts.
Use  `git checkout` command to create your own branch.

```shell
git checkout -b NameOfYourBranch
```

## Step 5: Make necessary changes

Change the files or add as per the requirement/assignment.

## Step 6:  Check and Commit the changes

If you run the `git status` command in your project directory, you'll see there are changes. Add those changes to the branch you created using the `git add` command:

Example: If you changed exampleFile

```shell
git add exampleFile
```

Now commit the changes:

```shell
git commit -m "Updated exampleFile"
```

Replace Updated exampleFile with your short comment.

## Step 7: Push your changes to GitHub

Use the `git push` command to push your changes to GitHub:

```shell
git push origin -u NameOfYourBranch
```

## Step 8: Submit your changes for review

Go to your repository on GitHub, and you'll see a "Compare & pull request" button. Click on that button.

Submit the pull request. By clicking on "Create pull request"

## Step 9: Merged?

You will receive a notification email once your changes have been merged.

- For more help on the process visit [Hacktoberfest](https://hacktoberfest.digitalocean.com/resources)

# Project Outline 

## For core library and logic 
- Checkout [lib](/lib/).
- Also , for more instructions on using the library, visit:
https://julienbl.me/ListExtender/documentation.html &nbsp; &nbsp; &nbsp; OR run [documentation](/documentation.html) on localhost.

## Checkout the website
- Click [html/website](/index.html) and run on localhost.

## For Styling
- Check [CSS](/css/style.css)

## For Script
- Check [js](/js/) 
  
## For Example and to Understand 
- Check [example](/examples.html)
  
Also Check: [Readme.md](/README.md)
