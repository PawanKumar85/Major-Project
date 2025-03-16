# Major Project Documentation

Welcome to the **Major Project Repository**! This document serves as a comprehensive guide for contributing to the project while maintaining a consistent and efficient development workflow.

---

## Table of Contents

- [Major Project Documentation](#major-project-documentation)
  - [Table of Contents](#table-of-contents)
  - [Repository Branch Structure](#repository-branch-structure)
    - [Branches:](#branches)
    - [Important Guidelines](#important-guidelines)
  - [Cloning the Repository](#cloning-the-repository)
  - [Managing Branches](#managing-branches)
    - [View Branches](#view-branches)
  - [Creating and Switching Branches](#creating-and-switching-branches)
  - [Development Workflow](#development-workflow)
    - [1. Switch to Your Branch](#1-switch-to-your-branch)
    - [2. Code Implementation](#2-code-implementation)
    - [3. Review Changes](#3-review-changes)
    - [4. Stage Changes](#4-stage-changes)
    - [5. Review Staged Changes](#5-review-staged-changes)
    - [6. Commit Changes](#6-commit-changes)
    - [7. Push Changes](#7-push-changes)
  - [Additional Git Commands](#additional-git-commands)
    - [Undo Staged Changes](#undo-staged-changes)
    - [Undo Last Commit (Permanent Reset)](#undo-last-commit-permanent-reset)
  - [More Useful Git Commands](#more-useful-git-commands)
    - [Check Repository Status](#check-repository-status)
    - [View Commit History (Condensed)](#view-commit-history-condensed)
    - [Switch Between Branches](#switch-between-branches)
  - [Merge and Stash Options](#merge-and-stash-options)
    - [Merge Branches](#merge-branches)
    - [Stash Uncommitted Changes](#stash-uncommitted-changes)
    - [Reapply Stashed Changes](#reapply-stashed-changes)
  - [Troubleshooting](#troubleshooting)
  - [Contributors](#contributors)
  - [License](#license)
    - [Final Notes](#final-notes)

---

## Repository Branch Structure

The repository follows a **branch-based development model** where each member works on a separate branch.

### Branches:

- **`main`**
- **`member/Anamika`**
- **`member/Naitik`**
- **`member/Pawan`**
- **`member/Surendra`**
- **`member/Virat`**
- **`testing`**
- **`Notes`**

---

### Important Guidelines

✅ Stick to your assigned branch.  
❌ **Do not switch to others' branches** without permission.

---

## Cloning the Repository

To clone the repository to your local system, run:

```bash
git clone https://github.com/PawanKumar85/Major-Project.git
```

---

## Managing Branches

### View Branches

- Local branches:

```bash
git branch
```

- Remote branches:

```bash
git branch -r
```

- All branches:

```bash
git branch -a
```

---

## Creating and Switching Branches

Create and switch to a new branch:

```bash
git switch -C <Branch-Name>
```

---

## Development Workflow

### 1. Switch to Your Branch

```bash
git switch <Branch-Name>
```

### 2. Code Implementation

Write your code and test locally.

### 3. Review Changes

View changes before staging:

```bash
git diff
```

### 4. Stage Changes

Add files or folders to staging:

```bash
git add <File-Name>
```

### 5. Review Staged Changes

```bash
git diff --cached
```

### 6. Commit Changes

Commit with a meaningful message:

```bash
git commit -m "Your commit message"
```

### 7. Push Changes

- First-time push:

```bash
git push origin -u <Branch-Name>
```

- Subsequent pushes:

```bash
git push
```

---

## Additional Git Commands

### Undo Staged Changes

Unstage changes without affecting your code:

```bash
git reset
```

### Undo Last Commit (Permanent Reset)

Remove changes and reset your branch to the previous commit:

```bash
git reset --hard HEAD~1
```

---

## More Useful Git Commands

### Check Repository Status

```bash
git status
```

### View Commit History (Condensed)

```bash
git log --oneline
```

### Switch Between Branches

```bash
git switch <branch-name>
```

---

## Merge and Stash Options

### Merge Branches

Combine another branch into your current branch:

```bash
git merge <branch-name>
```

### Stash Uncommitted Changes

Temporarily save your changes:

```bash
git stash
```

### Reapply Stashed Changes

```bash
git stash pop
```

---

## Troubleshooting

| Problem              | Command                   | Description                 |
| -------------------- | ------------------------- | --------------------------- |
| Unstage Changes      | `git reset`               | Removes files from staging. |
| Undo Last Commit     | `git reset --hard HEAD~1` | Discards last commit.       |
| Restore Deleted File | `git checkout -- <file>`  | Restores deleted file.      |
| View Commit History  | `git log`                 | Shows commit history.       |

---

## Contributors

| Name     | Branch            | Role          |
| -------- | ----------------- | ------------- |
| Anamika  | `member/Anamika`  | Data Analysis |
| Surendra | `member/Surendra` | Data Analysis |
| Virat    | `member/Virat`    | GenAI         |
| Naitik   | `member/Naitik`   | LLM           |
| Pawan    | `member/Pawan`    | MERN and AWS  |

---

## License

This project is licensed under the **MIT License**.

---

### Final Notes

- Regularly **pull from the remote branch** to stay updated.
- Use **descriptive commit messages**.
- Resolve conflicts **before pushing**.
- Contact project maintainers for **branch merging approvals**.

Happy Coding! 💻🚀
