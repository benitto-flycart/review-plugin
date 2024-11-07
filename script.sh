pack_type=${1:-pro}

# Print the value of custom argument
echo "Pack Type: $pack_type"

echo "Review Plugin"
current_dir="$PWD"
react_folder_path=$current_dir"/admin-ui"


copy_folder() {
  echo "copying folder"
  cd $current_dir/..

  pack_folder=$PWD"/compressed_pack"

  if [ "$pack_type" == "pro" ]; then
      folder_name="flycart-reviews"
    else
      folder_name="flycart-reviews"
  fi

  compress_plugin_folder=$pack_folder"/$folder_name"
  if [ -d "$pack_folder" ]; then
    rm -r "$pack_folder"
  fi
  mkdir "$pack_folder"

  mkdir "$compress_plugin_folder"

  # shellcheck disable=SC2054
  if [ "$pack_type" == "pro" ]; then
    move_dir=("app" "package" "Core" "Pro" "resources" "i18n" "vendor" "flycart-reviews.php" "admin-ui/dist")
  else
    move_dir=("app" "package" "Core" "resources" "i18n" "vendor" "flycart-reviews.php" "admin-ui/dist")
  fi


  # Ensure the destination directory exists
  mkdir -p "$compress_plugin_folder"

  # Loop through the directories and files
  for dir in "${move_dir[@]}"; do
    src="$current_dir/$dir"
    dest="$compress_plugin_folder"


    if [ "$dir" == "admin-ui/dist" ]; then
      dest="$compress_plugin_folder/admin-ui"
    fi

    # Check if the source is a directory and copy recursively
    if [ -d "$src" ]; then
      mkdir -p "$dest"
      cp -r "$src" "$dest"
    else
      # If it's a file, copy without the -r option
      cp "$src" "$dest"
    fi
  done

  cd "$current_dir"
}

zip_folder() {
  cd "$current_dir"
  cd ..
  pack_compress_folder=$PWD"/compressed_pack"
  mkdir -p $pack_compress_folder
  cd "$pack_compress_folder"

  if [ "$pack_type" == "pro" ]; then
    zip_name="flycart-reviews"
  else
    zip_name="flycart-reviews"
  fi


  zip -r "$zip_name".zip $zip_name -x "*/.*" -q 2> zip_error.log
  echo "Zip Created"
}

echo "Copy Folder:"
copy_folder
echo "Zip Folder:"
zip_folder
echo "End"
