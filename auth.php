<?php

require 'core/core.php';

$pageName = "Bienvenue";

$user->inverseRestrict();

require 'includes/header.php';

?>

<div class="authWrapper">
  <div class="authLogo">
    <img src="core/style/images/pm_logo.png?ac=<?= time() ?>">
  </div>
  <div class="authBox">
   
    <div class="loginBox">
      <a class="authBigButton" id="authToRegister">Pas encore inscrit ?</a>
      <form id="loginForm">
        <input type="email" id="loginEmail" placeholder="Adresse Email" class="field">
        <input type="password" id="loginPassword" placeholder="Mot de passe" class="field">
        <button class="button authButton" id="authLoginButton" type="sumbit">Se connecter</button>
      </form>
    </div>
    
    <div class="registerBox" style="display:none;">
      <a class="authBigButton" id="authToLogin">J'ai déjà un compte</a>
      <form id="registerForm">
        <input class="field" type="email" placeholder="Adresse mail" id="registerEmail">
        <input class="field" type="text" placeholder="Pseudonyme" id="registerPseudo">
        <input class="field" type="password" placeholder="Mot de passe" id="registerPassword">
        <input class="field" type="password" placeholder="Confirmer le mot de passe" id="registerPasswordConfirm">
        <button class="button authButton" type="submit">S'enregistrer</button>
      </form>
    </div>
  </div>
  <div class="authBoxFooter">Copyright 2017 - Bundle Games - FirebrowserEngine 1.0</div>
</div>

<?php

require 'includes/footer.php';

?>