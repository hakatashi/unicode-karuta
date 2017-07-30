#!/bin/bash

# Exit on error
set -ev

if [ "$TRAVIS_SECURE_ENV_VARS" != "true" ] || [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	exit 0
fi

git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch
git config user.name "Travis CI"
git config user.email "contact@travis-ci.com"
git branch gh-pages origin/gh-pages
git symbolic-ref HEAD refs/heads/gh-pages
git checkout 7bd7218198d167bd2bee84c127112f163019b7b3 .gitignore
git add --all
git commit -m "Update build - ${TRAVIS_COMMIT}"
git push "https://${GH_TOKEN}@github.com/hakatashi/unicode-karuta.git" gh-pages:gh-pages --follow-tags > /dev/null 2>&1
