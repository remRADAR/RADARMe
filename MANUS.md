# Manus Multi-Profile Workflow & State Persistence

This repository is developed in a multi-profile environment. Preserve other profiles' work, keep changes on isolated branches, and verify the build before handoff.

## Pre-execution audit

Before modifying code:

1. Run `git status` and `git branch`.
2. Run `git fetch origin` and compare the active branch with its upstream.
3. If unrelated uncommitted changes are present, preserve them with a timestamped, profile-tagged stash: `git stash push -m "auto-stash-${MANUS_PROFILE_ID:-unknown}-$(date -u +%Y%m%dT%H%M%SZ)"`.
4. Synchronize the active branch with `git pull --rebase origin <active-branch>` when safe.
5. Run the project's build or type-check command to establish a clean baseline.

## Persistence and configuration safety

- Write every edit directly to disk and verify the resulting file exists and contains the intended change.
- Do not overwrite shared configuration files such as `package.json`, `.env`, `tsconfig.json`, or `wrangler.toml` without first inspecting and preserving existing keys.
- Use isolated feature branches named `feature/<profile-or-purpose>` rather than committing directly to `main`.
- Use `MANUS_PROFILE_ID` to identify the active developer profile in stash names and commit metadata.

## Post-execution lockdown

Before ending a development session:

1. Run the project build and resolve regressions before handoff.
2. Stage only the intended files explicitly with `git add <files>`.
3. Commit atomically using `feat(${MANUS_PROFILE_ID:-unknown}): <short summary>`.
4. Push the active feature branch to its remote when authorized and available.
5. Report modified files, branch, commit hash, and build status.
