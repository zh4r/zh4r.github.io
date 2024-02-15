
* ### `git status` = shows us the status of the current repo

* ### `git remote -v` = shows us the remote name and repo link
  - `git remote add RemoteName RepoURL` = add a second remote - used mostly in forking.
We fork the ***upstream*** *(the original repo)*, then we **clone** our Fork ***(origin)*** locally ***(.git)***, and set up 2 remotes to **pull** new changes from ***upstream***, and **push** them to ***origin***. *(we can only push to upstream via Pull Request, but we have full control over origin!)*
the **RemoteName** is usually ***upstream***.  

* ### `git log` = log of the commits and changes 
  - if stuck at "END" msg after log command - press Q(exit) or H(elp)
  - `git log --oneline` (easier to read git logs)
  - `git log --pretty=format:"%h%x09%an%x09%ad%x09%s"` `(--date=short)` = logs with abrcomhash, TAB, authorname, TAB, authordate, TAB, subject.
  - `git log --date=local/relative/short/iso`  
local shows local pc time.
relative shows 2 months ago for instance.
short shows only yyyy-mm-dd.
iso shows us the author's time with timezones.

We can setup git log formatting by accessing the Git/etc/gitconfig file, see Git_Solutions.txt.


* ### `git init` = create an empty repo inside the current dir. DO NOT INIT INSIDE OF A REPO! Before running git init, use git status to verify we are not currently inside of a repo!

* ### `git add <file1> <file2>` = stages the files, getting them ready to commit (think of it like a cache of tracked files)
  - `git add .` = stages all changes made

* ### `git commit` = could be problematic if we haven't configured vscode beforehand
  - `git commit -m "my message"` = when using just the terminal
  - `git commit -a -m "message"` [-am "msg" works the same] = adds all files with changes and commits them 
  - `git commit --amend` [lets us change the commit name or add files we've forgotten, but we have to git add the file BEFORE the amend!]

* ### `touch .gitignore` = create a file, where we put everything we want to be ignored by git (like sensitive info)

* ### `git branch` = see all + current branches
  - `git branch BranchName` = create a new branch (no spaces in name)
  - `git branch -d BranchNm` = deletes a branch. we have to be on a different branch to delete, and it has to be merged! 
  - `git branch -D BranchNm` = force delete a branch, regardless of merge *USE WITH CAUTION!*
  - `git branch -m BrNm` = renames a branch. we have to be ON the branch we are renaming!
  - `git branch -v` = returns more info about the branches (last commit hash+message)
  - `git branch -r` - shows us the remote branches

* ### `git switch BranchName` = switch to another branch
  - `git switch -` = go back to the previous branch
  - `git switch -c BranchName` = create branch and switch to the created it

* ### `git checkout BranchName` = does the same thing as switch, but also much more! (read the documentation on Git)
  - `git checkout -b BranchName` = the same as `git switch -c BrNm`

* ### `git merge BrNm` = merges 2 branches together. HEAD must be on the branch we are merging TO! so if i want branch bugfix to be merged with master, i switch to master first, and then i git merge bugfix
  - `git merge --no-ff BrNm` = this prohibits fast-forwarding in case we want to be extra careful.

* #### `git diff` = shows changes that are NOT staged between commits, branches, files, and more!
  - ### file -A and file +B and their differences are marked with a ( - ) and a ( + ) ####
  - #### header ( e.g.: **@@ -25,7 +25,7 @@**) [also called a chunk] = the first number indicates which line the diff starts from, and the second number is how many lines were printed. Note that git diff always gives us a few rows BEFORE and AFTER the change as context - the changes are color-marked, and also have a (+) and (-) infront of them. ####
  - `git diff HEAD` = lists all changes in the working tree since our last commit (no matter if they are staged or not.
  - `git diff --staged [or --cached]` = only staged changes
  - `git diff HEAD <filename> <filename>` = targeting a particular file *we can compare more than one
  - `git diff --staged <filename>` = a particular staged file
  - `git diff branch1..branch2` = compares 2 branches [the order in which we type the names matters]
  - `git diff commit1..commit2` = compares changes between commits! [the order in which we type the names matters]

* ### `git stash` = takes all uncommitted changes (staged and unstaged) and stash them, reverting the changes in your working copy(current branch)
  - *stashing commits when branch switching, so we don't lose our changes, or take them with us on a different branch. (for when we need to switch branches, but haven't committed yet)*
  - `git stash save` = does the same thing!
  - `git stash pop` = remove the most recently stashed changes in your stash and re-apply them to the working copy
  - `git stash apply` = takes the stash and applies it to the working copy, BUT it also keeps the stash. This way we can apply the same changes to multiple branches
  - `git stash list` = view what we have in the stash
  - `git stash apply stash@{2}` = applies the stashed change we point to within the brackets
  - `git stash drop stash@{2}` = removes the stashed change from the stash
  - `git stash clear` = clears the whole stash

* ### `git checkout <comhash>` = when checking out, we detach the HEAD from the branch, and attach it to a particular commit. This allows us to make changes, without worrying about the production code. 
  - we leave detached state by git switching to a branch!
  - `git checkout HEAD~1[2,3,etc]` = go back in time one[2,3,etc] commit[s] from head's current position (for when we don't feel like searching for the commit hash, or we just now it's N number of commits back).
  - `git checkout HEAD <filename>` = we undo all changes we made since the last commit. Changes revert back to where HEAD currently is!
  - `git checkout -- <filename>` = does the same thing, the -- replaces HEAD 

* ### `git restore <filename>` = THIS IS IRREVERSABLE undo all changes since last commit. Uses head as the default source, but we can change that using the --source option:
  - `git restore --source HEAD~1 <filename>` = move the source of the restore, using a comhash or HEAD~1,2,3,etc. (Note that HEAD is still on the last commit, so if we just
`git restore <filename>` we will go back to that commit!
  - `git restore --staged <filename>` = remove a file, we've added to our staging area with git add, but have decided to not include it in the next commit 

* ### `git reset <comhash>` = IRREVERSABLE! reset the repo back to a specific commit. 
THIS ONLY DELETES THE COMMITS, BUT LEAVES ALL CHANGES IN THE WORKING DIRECTORY!
When using reset to restore commits from reflogs, we restore all of the chosen commit's parents as well!
  - `git reset --hard <comhash> or HEAD~1` = this will also delete the changes in the workdir

* ### `git revert <comhash>` = undo all changes, and make a commit without them. So everything is saved, and it's not completely deleted like with git reset. This is the safest command to use, especially when working with a team.

* ### `git push <remotename> <localbranch>:<remotebranch>` 
  - `git push origin pancake:waffle` - lets us push the pancake local branch into the waffle remote branch
  - `git push -u origin master` - pushes and sets the "default" remote and branch we'll be pushing to. Enables us to just use git push.   
**///-u stands for upstream**

**Remote Tracking Branch** is a reference to the state of the master(main) branch on the remote. We can't move this ourselves, it's like a bookmark pointing to the last known commit on the master branch on origin.
git switch \<remotebranchname> can be used to switch to a remote branch of that name, even if we haven't cloned it locally! This effectively clones the remote branch locally and also sets it up to track the remote origin/branch.


* ### `git fetch <remote>` -  fetches branches and history from a specific remote repo. It only updates remote tracking branches. 

Fetch allows us to download changes from a remote repo, but those changes will not be automatically integrated into our working files. This way we can see what others are working on, without having to merge those changes into our local repo. "Please go and get the latest information from GitHub, but don't screw up my working dir."
This is always safe to use!

  - `git fetch <remote> <branch>` - we can also fetch a specific branch from a remote.

* ### `git pull <remote> <branch>` - pull updates our HEAD(current) branch with whatever changes are retrieved from the remote. "Go and download data from GitHub AND immediately update my local repo with those changes" 
*git pull = git fetch + git merge* 
We can use git pull without specifying remote and branch. 
Pull defaults to origin(remote) and the branch we're currently on! Both are subjects to manual change, but most people never bother with it.

* ### `git rebase master` = when we are working on a feature branch, but master has frequent changes from other team members, we have to constantly merge the master branch onto our feature branch in order to have the most recent changes - this creates copious amounts of merge commits that clutter the log, so we can instead rebase and re-write the feature branch's history to start at the tip of the master. 
  - we have to be on the feature branch (git switch feature); from there we use git rebase master in order to merge master into our feature branch, but keep the history clean. THIS DOESN'T AFFECT THE MASTER BRANCH! 

  - THE GOLDEN RULE: Never rebase commits that have been shared with others! If you have already pushed commits up to GitHub, DO NOT rebase them, unless you are positive no one on the team is using those commits. Basically: Rebase only local branches!

  - `git add <conflictedfile>` = when we have a merge conflict while rebasing, we fix the conflicts, save the file, then use git add \<conflictedfile>, followed by:
  - `git rebase --continue` = after adding the file, we don't commit, we --continue

MEGA KOOL:  

  - `git rebase -i HEAD~4` = **-i** enters interactive mode, which allows us to edit commits, add files, drop commits, etc. (this also changes the commit hash, cause it recreates them). We need to specify how far back we want to rewrite commits. 
We are NOT rebasing onto another branch this time, instead we are rebasing a series of commits onto the HEAD they are curently based on. HEAD~4 means we want to go back 4 commits! 

* ### `git tag <tagname>` = shows all the tags on the current repo. A tag is basically a permament marker on a commit (usually used for versions)
  - `git tag -l "beta"` = searches for the word "beta" EXACTLY!
we can use * to search for patterns (*beta, beta*, *beta*)
  - `git checkout <tag>`
  - `git diff <tag> <tag>`
  - `git tag <tagname>` = creates a lightweight tag on the current HEAD.
  - `git tag -a <tagname>` = creates an annotated on the current HEAD. Annotated tags are much more widespread than lightweight, because they carry metadata with them. 
 If we want to skip the opening of the editor when using -a, we can type in -m. 
Syntax: `git tag -a <tagname> -m "<tagmsg>"` 
  - `git tag -a <tagname> <comhash>` - tag an older commit, without moving HEAD.
  - `git show <tagname>` = to read an annotated tag's metadata.
  - `git tag -f <tagname> <comhash>` = in case we want to move a tag.
  - `git tag -d <tagname>`
  - `git push <remotename> --tags` = pushes all of the repo's tags up to the remote.
  - `git push <remotename> <tagname>` = pushes a single tag.

* ### `git config --global` = changes the default config for all repos. 
  - `git config --local` = changes only the current repo's config.   
  `git config --local user.name kur `
DOCS on this are huge! https://git-scm.com/docs/git-config
  
* ### `git hash-object <filename>` = returns the hash for a specific file.
  - `echo "Something" | git hash-object --stdin (-w)` = "translates" the input in quotes to hash. This doesn't write the object in the database - it just tells us how it would store it if it had to. If we do want it to write it in, then we use -w at the end of the line.

* ### `git cat-file -p <objecthash>` = retrieves data about an object. The -p tells Git to pretty print the contents of the object, based on its type. We can shorten the hash down to 5 characters, and it should still find it. 
  - `git cat-file -p <objhash> > <filename>` = takes data, stored on the hash, and adds it to the file.
  - `git cat-file -p master^{tree}` = returns the hash tree at the tip of the branch.
  - `git cat-file -t <objhash>` = returns the type of the object.


* ### Reflogs *EXPIRE(90 days! it's changeable)*, and are only LOCAL! 
  - `git reflog = git reflog show HEAD` - shows the log of a specific reference (defaults to HEAD).
   Works with branches and shit (`git reflog show main`)
     
     Reflgos are timestamped!
  - `git reflog master@{one.week.ago}`
  - `git checkout bugbranch@{2.days.ago}`
  - `git diff main@{0} main@{yesterday}`  
*3.minutes.ago  
Fri, 12 FEB 2024 14:06:21 -0800*
  
* ### HEAD~2 vs HEAD@{2}
  - `git checkout HEAD~2` = moves back 2 parents. (commits)
  - `git checkout HEAD@{2}` = moves back 2 HEAD movements! (like switching branches)
We can diff with those as well.
