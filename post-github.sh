#!/bin/bash

npm run build

use_template="react" # set you used template to update

output_dir="./build_file"
rm -rf $output_dir
mkdir $output_dir
search_dir="./packages/"

for package in `ls $search_dir`; do
    package_dist="$search_dir$package/dist/";

    if [ "$package" == "$use_template" ]; then
        cp -r $package_dist $output_dir
    fi
done


git stash
git branch -D gh-pages
git fetch -p 
git checkout -b gh-pages origin/gh-pages


for file in ./*; do
    # echo $file;
    if [[ "$file" != "./post-github.sh" &&
          "$file" != "./build_file" &&
          "$file" != "./packages" &&
          "$file" != "./node_modules"
    ]]; then
        rm -r "$file"
    fi
done


mv $output_dir/* ./
rm -rf $output_dir

git add .
git commit -m "feat: update blog"
git push origin gh-pages