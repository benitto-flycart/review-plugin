<?php

if ($header == 'compact') {
    include 'compact-header.php';
} else if ($header == 'minimal') {
    include 'minimal-header.php';
} else if ($header == 'expand') {
    include 'expand-header.php';
}


if($main_content == 'grid') {
    include 'grid.php';
} else if($main_content == 'list') {
    include 'list.php';
} else if($main_content == 'mosaic') {
    include 'mosaic.php';
}