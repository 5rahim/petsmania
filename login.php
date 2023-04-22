<?php 

require 'core/core.php';

if (isset($_GET['token'])) {
    $_SESSION['auth']['token'] = $_GET['token'];
}

?>