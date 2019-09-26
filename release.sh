#!/usr/bin/env sh
set -e
echo "enter release version:"
read VERSION
read -p "release $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optional) moveto a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "release $VERSION ..."

  #commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  #publish
  npm publish
fi
