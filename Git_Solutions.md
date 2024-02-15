

## ~/.gitconfig (--global)

**command line example:**

	git config --global log.date iso 
**creates this input in the file:**

	[log]
		date = iso
---
### ALIASES

	[alias]
		s = status
		l = log --date=iso --pretty=format:"%C(yellow)%h\\ %Creset%>(12)%ad\\ %Cgreen%><(6)[%aN]%Cred%d\\ %Cblue%s"
		c = commit
		cm = commit -m
		a = add .
		co = checkout
		sw = switch
		l0g = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Cblue>%s<%Cgreen\\ [%cn]" --decorate --stat
		la = "!git config -l | grep alias | cut -c 7-"
		cam = commit -am




### 91694359+zh4r@users.noreply.github.com


## When we get error 007 - private email blocking us from pushing:
When enabling the “Block command line pushes that expose my email” feature, you’ll also want to configure Git to use your no-reply email address. Don’t worry—this won’t affect your contribution graph. All commits will still be associated with your account.   

First we have to check and see if our email is set up properly with  
```git config --global user.email```   
	If we have it set to a private email *(me@mail.com),* we have to change it to a public one *(number+me@users.noreply.github.com)*.    
	Then we run the following command to replace the incorrect info on all commits.



    git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "incorrect@email" ]; then
     GIT_AUTHOR_EMAIL=correct@email;
     GIT_AUTHOR_NAME="Correct Name";
     GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
     GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all



## When *status* isn't showing us the remote state
We haven't properly set up the upstream, which is easily done with:

	git branch --set-upstream-to origin/MyBranch



## When we've added files to .gitignore, but they still show up in *status*

This will help us remove cached index files, and then only add the ones we need, including changes to your .gitignore file.

 1. `git rm -r --cached .` = *this **DELETES** all files - don't be scared, we add them back later!*  

2. `git add .`
3. `git commit -m 'Removing ignored files'`  

 
## [Git Pull melting pot.](resources/git_pull.html "Pull Docs")
Things I've struggled with or wondered about when using `git pull`. 