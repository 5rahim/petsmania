<div id="js">
  <!-- Socketio -->
  <script src="http://localhost:2525/socket.io/socket.io.js"></script>

  <script src="core/js/client.js?time=<?= time() ?>"></script>


  <?php if (isset($_SESSION['auth']['token'])): ?>
    <script>
      sess("<?php echo $_SESSION['auth']['token']; ?>");
    </script>
  <?php else: ?>
    <script>
      noSess();
    </script>
  <?php endif; ?>
</div>

</body>
</html>
