#!/usr/bin/env sh
git diff-tree -r --name-only ORIG_HEAD HEAD | grep -q package.json && eval "npm prune && npm install"
