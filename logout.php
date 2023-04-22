<?php

require 'core/core.php';

session_destroy();

redirect('auth.php');

?>