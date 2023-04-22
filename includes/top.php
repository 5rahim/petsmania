<div class="siteWrapper">

  <div class="siteLogo"><img src="core/style/images/pm_logo.png?" alt="" style="cursor:pointer;" onclick="window.location.replace('index.php')"></div>
  
  <div class="siteBox">
    <div class="siteBoxTop">
      <div class="siteBoxPseudo"><?= $user->info('pseudo') ?></div>
      <div class="siteBoxTopMenu">
        <ul>
          <li title="Jardin" onclick="window.location.replace('index.php')"><img src="core/style/images/garden.png"></li>
          <li title="Paramètres"><img src="core/style/images/id-card.png"></li>
          <li title="Déconnexion" onclick="window.location.replace('logout.php')"><img src="core/style/images/exit.png"></li>
        </ul>
      </div>
    </div>