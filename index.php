<?php

require 'core/core.php';

$pageName = "Accueil";

$user->restrict();

$checkGarden = $bdd->prepare('SELECT * FROM gardens WHERE owner_token = ? ORDER BY id LIMIT 1');
$checkGarden->execute(array($user->info('token')));
$currentGarden = $checkGarden->fetch(PDO::FETCH_OBJ);

if(!url('garden')) {
  
  redirect('index.php?garden='. $currentGarden->token);
  
}else {
  
  $getGarden = $bdd->prepare('SELECT * FROM gardens WHERE owner_token = ? AND token = ?');
  $getGarden->execute(array($user->info('token'), urlVal('garden')));
  $garden = $getGarden->fetch(PDO::FETCH_OBJ);

  if($getGarden->rowCount() < 1) {
    redirect('index.php?garden='. $currentGarden->token);
  }
  
}

require 'includes/header.php';


require 'includes/top.php';

?>

<div class="gardenWrapper" <?php 
     if($garden->code == 'DEFAULT') {
       echo 'style="background-image:url(core/style/images/default_garden.png)"';
     }
     ?>>
  <div class="gardenLayers">
  
    
    <!-- Live informations -->
    <div class="infoContent"></div>
    
    <!-- Affichage de l'argent -->
    <div class="moneyDisplay">
      <div class="moneyClass money"><img src="core/style/images/change.png?" alt=""> <?= $user->info('money') ?></div>
      <div class="moneyClass diamond"><img src="core/style/images/jewels.png?" alt=""> <?= $user->info('diamond') ?></div>
    </div>
  
    <!-- Affichage des informations sur l'animal -->
    <div class="animalInfos" style="display:none;">
     <div class="statButton"><i class="fa fa-chevron-right"></i></div>
      <div class="animalActions">
        <div class="animalInfosName"></div>
        <div class="animalInfosButtons">

        </div>
      </div>
      <div class="animalStats">
        <div class="stat">
          <div class="statTitle">Santé:</div>
          <div class="statProgress"><div class="statBar health" style=""></div></div>
        </div>
        <div class="stat">
          <div class="statTitle">Hygiène:</div>
          <div class="statProgress"><div class="statBar hygiene" style=""></div></div>
        </div>
        <div class="stat">
          <div class="statTitle">Moral:</div>
          <div class="statProgress"><div class="statBar moral" style=""></div></div>
        </div>
      </div>
    </div>
    
    <!-- Affichage de linventaire -->
    <div class="inventory">
      <ul class="inventoryMenu">
        <li class="food selected">Nourriture</li>
        <li class="toys">Jeux</li>
        <li class="mobis">Décoration</li>
      </ul>
      
      <!--<div class="invElement">
                  <div class="invElementContent">
                    <img src="core/style/images/food/.png?" style="width:50px;height:50px;">
                  </div>
                </div>-->
      
      <div class="inventoryContent">
        <div class="inventoryPart food">
          <div class="inventoryPartContent">
            <?php $invGetFood = $bdd->prepare('SELECT * FROM food_membership WHERE owner_token = ? AND inGarden = 0 AND garden = 0');
            $invGetFood->execute(array($user->info('token')));

            if($invGetFood->rowCount() > 0) {
              
              foreach ($invGetFood as $invFood) {
                
                $tmp[$invFood['code']][] = $invFood['owner_token'];
                
              }
              
              $alimentArray = array();
              
              foreach($tmp as $type => $labels) {
                $alimentArray[] = array(
                    'code' => $type,
                    'owner_token' => $labels
                );
              }
              
              foreach ($alimentArray as $invArrayAliment) {
                
                $invGetAliment = $bdd->prepare('SELECT * FROM food_membership WHERE owner_token = ? AND code = ? AND inGarden = 0 LIMIT 1');
                $invGetAliment->execute(array($user->info('token'),$invArrayAliment['code']));
                
                $invGetAlimentCount = $bdd->prepare('SELECT * FROM food_membership WHERE owner_token = ? AND code = ? AND inGarden = 0');
                $invGetAlimentCount->execute(array($user->info('token'),$invArrayAliment['code']));
                $invAlimentCount = $invGetAlimentCount->rowcount();
                
                while ($invAliment = $invGetAliment->fetch(PDO::FETCH_OBJ)) { ?>
                  
                  <div class="invElement">
                    <div class="invElementContent" data-inventory-add-button="<?= $invAliment->token ?>">
                     <?php if($invAlimentCount > 1) {
                        echo '<div class="invElementCount">'. $invAlimentCount .'</div>';
                      } ?>
                      <div class="invElementAdd" data-element-token="<?= $invAliment->token ?>" data-garden-token="<?= urlVal('garden') ?>" data-element-type="food">Ajouter</div>
                      <img src="core/style/images/food/<?= $invAliment->code ?>.png?" style="width:50px;height:50px;">
                    </div>
                  </div>
                  
               <?php }
                
              }
              
            } else { ?>
              
              <div class="inventoryInfo">Aucune nourriture</div>
              
            <?php } ?>
          </div>
        </div>
      </div>
    </div>
    
    
    <!-- Affichage de la box pour nettoyage -->
    <div class="box" id="boxClean" style="display:none;">
      <div class="boxClose">&times;</div>
      
      <div class="bathroom">
        <div class="bathroomAnimal"></div>
        <div class="bathroomButton"></div>
      </div>
      
      <div class="clean" style="display:none;"></div>
      <div class="finishClean" style="display:none;"></div>
      
    </div>
   
    <!-- Affichage des items, animaux etc... !-->
    <div class="gardenItems">
      <div class="gardenItemsBack"></div>
      
      
      <!-- Affichage des animaux -->
      <?php
        $getAnimals = $bdd->prepare('SELECT * FROM animals_membership WHERE owner_token = ? AND garden = ? AND inGarden = ?');
        $getAnimals->execute(array($user->info('token'),urlVal('garden'),1));
      
        while($gAnimal = $getAnimals->fetch(PDO::FETCH_OBJ)) { ?>
          
          <div class="animal item" id="animal" data-id="<?= $gAnimal->id ?>" data-token="<?= $gAnimal->token ?>" data-type="animal" data-code="<?= $gAnimal->code ?>" data-info="Clique pour choisir des actions" style="top: <?= $gAnimal->pxTop ?>px; left: <?= $gAnimal->pxLeft ?>px; z-index:<?= $gAnimal->zIndex ?>">
           
           <ul class="animalOptions">
             <li onclick="openGardenChoice('<?= $gAnimal->token ?>')"><img src="core/style/images/placeholder.png?" /></li>
             <li onclick="pushAhead('animal','<?= $gAnimal->token ?>')"><img src="core/style/images/plus.png?" /></li>
             <li onclick="pushBack('animal','<?= $gAnimal->token ?>')"><img src="core/style/images/minus.png?" /></li>
           </ul>
           
            <?= $animal->getImage($gAnimal->code, $gAnimal->token); ?>
            
          </div>
          
        <?php } ?>
        
        
    </div>
    
  </div>
</div>

<div class="gardenBottom">
  <ul>
    <li title="Inventaire" onclick="openInventary('<?= $user->info('token') ?>')"><img src="core/style/images/packing.png"></li>
    <li title="Entretenir le jardin" onclick="startMaintenance('<?= $user->info('token') ?>')"><img src="core/style/images/trash.png"></li>
  </ul>
</div>

<?php

require 'includes/right.php';

?>

</div>

<?php

require 'includes/bottom.php';

require 'includes/footer.php';

?>