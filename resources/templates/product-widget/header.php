<?php

if ($header == 'compact') {
    include 'compact-header.php';
} else if ($header == 'minimal') {
    include 'minimal-header.php';
} else if ($header == 'expanded') {
    include 'expand-header.php';
}