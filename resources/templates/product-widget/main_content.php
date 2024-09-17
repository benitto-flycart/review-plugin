<?php

if ($main_content == 'grid') {
    include 'grid.php';
} else if ($main_content == 'list') {
    include 'list.php';
} else if ($main_content == 'mosaic') {
    include 'mosaic.php';
}