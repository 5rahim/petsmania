<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?= $siteName ?> - <?= $pageName ?></title>
    <link rel="stylesheet" href="core/style/css/global.css?time=<?= time() ?>">
    <link rel="stylesheet" href="core/node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Firebrowser core/plugins -->
    <script src="core/js/jquery.min.js"></script>
    <script src="core/js/jquery-ui.min.js"></script>
    <script src="core/node_modules/timeago.js/dist/timeago.js"></script>
    <script src='core/node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js'></script>
  </head>
  <body <?php if($user->isConnected()) { echo 'class="onlineBackground"'; } ?>>


  <!-- Firebrowser warning -->
  <div class="warningContent"></div>

  <!-- Firebrowser fail -->
  <div class="failContent"></div>
  
  <!-- Firebrowser success -->
  <div class="successContent"></div>