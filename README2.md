# Major Project Documentation

This document outlines the guidelines and procedures for contributing to the Major Project repository. Please follow these instructions carefully to maintain a structured and efficient development workflow.

## Repository Branch Structure

The project utilizes five distinct branches, each corresponding to a team member:

- `main`
- `member/Anamika`
- `member/Naitik`
- `member/Pawan`
- `member/Surendra`
- `member/Virat`
- `testing`
- `Notes`

  1. **Main branch**
     - The Main Branch is the production branch where all code is added and presented to clients.
  2. ''Member Branch":
     - The Member Branch is organized by team members, with each branch assigned to a specific module. Team members push their daily work to the branch associated with their name.
  3. **Testing Branch**:

     - The Testing Branch is used for integrating and testing new features before merging them into the Main Branch.

  4. **Notes Branch**:
     - The Notes Branch contains all the documentation and notes related to your work.

  NOTE : _You All Have to Stick on your branch don't switch branches to other branches otherwise it will break the Code flow and other problems are cleaned._

## Cloning the Repository

To clone the repository to your local machine, execute the following command in your terminal:

```git bash
git clone https://github.com/PawanKumar85/Major-Project.git
```

# Managing Branches

### Listing Branches

##### 1. Local Branches:

To view branches available on your local machine, use:

```git bash
git branch
```

##### 2. Remote Branches:

To list branches on GitHub (remote), use:

```git bash
git branch -r
```

##### 3. All Branches:

To display both local and remote branches, use:

```git bash
git branch -a
```

**Note**: _Remote branches are typically highlighted in red, while local branches appear in gray._

## Creating and Switching Branches

To create a new branch and switch to it immediately, use the following command:

```git bash
git switch -C <Branch-Name>
```

_This command creates the new branch and sets it as your active working branch._

## Development Workflow

After creating or switching to your designated branch, follow these steps to contribute your code effectively:

##### 1. Branch Creation:

If you are not already on the correct branch, create and switch to it using:

```git bash
git switch -C <Branch-Name>
```

##### 2. Code Implementation:

Develop your code changes or new features as required.

##### 3. Review Changes:

Review your modifications before staging them:

```git bash
git diff
```

##### 4. Stage Changes:

Stage the modified files or folders:

```git bash
git add <File-Name> or <Folder-Name>
```

##### 5. Review Staged Changes:

Verify the changes that have been staged:

```git bash
git diff --cached <File-Name> or <Folder-Name>
```

##### 6. Commit Changes:

Commit your staged changes with a clear and descriptive commit message:

```git bash
git commit -m "Your commit message"
```

##### 7. Push Changes to GitHub:

- **First-Time Push on a New Branch:**
  For the initial push on a new branch, use:

  ```git bash
  git push origin -u <Branch-Name>
  ```

- **Subsequent Pushes:**
  For all later pushes on the same branch, use:
  ```git bash
  git push
  ```

Following these steps will help ensure that all contributions are systematically integrated and managed.

## Additional Git Commands

##### Delete the Staged Changes

```git bash
git reset
```

NOTE : _This command removes the changes from the staging area `(i.e., it unstages the changes)` but leaves your working directory unchanged._

##### Undo the changes

```git bash
git reset --hard HEAD~<number>
```

NOTE : _`<number>` with the number of commits you want to undo `(e.g., 1, 2, 3, ...)`. This command resets your repository to an earlier state and discards all changes made after that commit, both in the staging area and in your working directory._

#### Redo Changes (Revert Back to a Commit)

```git bash
  git reset --hard <commit_id>
```

NOTE : _Replace `<commit_id>` with the specific commit hash you wish to revert to. You can obtain the commit hash by running git log which displays a list of recent commits along with their IDs._

## More Useful Git Commands

#### 1. Check Repository Status

```git bash
 git status
```

NOTE : _This command shows the current state of the repository including staged changes, unstaged changes, and untracked files._

#### 2. View Commit History (Condensed)

```git bash
git log --oneline
```

Note: _Displays a simplified commit history with each commit's hash and message on a single line, making it easier to scan through your commits._

#### 3. Switch Between Branches

You can use either of the following:

```git bash
git checkout <branch-name>
```

or

```git bash
git switch <branch-name>
```

Note: _Replace `<branch-name>` with the name of the branch you want to switch to. git switch is a newer, more intuitive command for branch switching._

## MORE OPTIONS

#### 1. Merge Branches

```git bash
git merge <branch-name>
```

Note: _Merges the specified branch into your current branch. Make sure you resolve any merge conflicts that might arise._

#### 2. Stash Uncommitted Changes

```git bash
git stash
```

Note: _Temporarily saves your uncommitted changes without committing them, allowing you to work on a clean slate. The changes are stored on a stack for later retrieval._

#### 1. Reapply Stashed Changes

```git bash
git stash pop
```

Note: _Retrieves and applies the most recently stashed changes while removing them from the stash list._

#### 2. Reset a Specific File

```git bash
git checkout -- <file>
```

Note: _Replace `<file>` with the file name you wish to reset. This discards local changes in that file, reverting it back to the last committed state._
