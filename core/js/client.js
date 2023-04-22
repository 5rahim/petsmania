/**************************************
*************************************

            _                             _       
           | |                           (_)      
 _ __   ___| |_ ___ _ __ ___   __ _ _ __  _  __ _ 
| '_ \ / _ \ __/ __| '_ ` _ \ / _` | '_ \| |/ _` |
| |_) |  __/ |_\__ \ | | | | | (_| | | | | | (_| |
| .__/ \___|\__|___/_| |_| |_|\__,_|_| |_|_|\__,_|
| |                                               
|_|                                               


/************************************
/***********************************/


var noSess, success, sess, error, initializeTimeAgo, stayConnected, startCleaning, FirebrowserFunctions, pushAhead, Item, openInventary, randomKey;

var actionInProgress = false;
var animalInAction = false;

(function ($) {


  var socket = io.connect('http://localhost:2525');

  // Le joueur est déconnecté
  noSess = function () {
    socket.emit('noSession');
  }

  // Le joueur est connecté
  sess = function (token) {
    socket.emit('startSession', token);
  }

  // Le joueur est connecté
  stayConnected = function () {
    socket.emit('stayConnected');
  }
  
  
  
  function FirebrowserFunctions() {
    this.toastDuration = 2700;
  }
  
  
  /* Log d'avertissement */
  console.log('%cPetsmania', 'font-size:60px');
  console.log('%cJeu par navigateur propulsé par Firebrowser, développé par Kommunity Games', 'font-size: 15px');
  console.log('%cFirebrowser BETA: NodeJS, PHP, jQuery, HTML5, CSS3', 'font-size: 15px');
  console.log('%cCeci est une fonctionnalité pour développeurs, merci de ne pas l\'utiliser au risque de rencontrer des soucis au niveau du fonctionnement du jeu et du site', 'font-size: 20px; color: red');
  
  
  
  /***************
  /* auth Interactions
  /**************/
  
  $('#authToRegister').click(function() {
    $('.loginBox').slideUp(200);
    setTimeout(function() {
      $('.registerBox').slideDown();
    }, 500);
  });
  
  $('#authToLogin').click(function() {
    $('.registerBox').slideUp(200);
    setTimeout(function() {
      $('.loginBox').slideDown();
    }, 500);
  });
  

  /***************
  /* Register
  /**************/

  $('#registerForm').submit(function (e) {

    e.preventDefault();

    var registerData = {
      email: $('#registerEmail').val(),
      password: $('#registerPassword').val(),
      passwordConfirm: $('#registerPasswordConfirm').val(),
      pseudo: $('#registerPseudo').val()
    };

    socket.emit('doRegister', registerData);

  });

  socket.on('registrationFinish', function () {
    $('#registerForm').slideUp();
    setTimeout(function () {
      success('Inscription terminée');
      setTimeout(function () {
        window.location.reload();
      }, 1400);
    }, 500);
  });
  
  
  
  

  /***************
  /* Login
  /**************/

  $('#loginForm').submit(function (e) {

    e.preventDefault();

    var loginData = {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val()
    };

    socket.emit('doLogin', loginData);
  });

  socket.on('ajaxLogin', function (token) {
    $.ajax({
      url: 'login.php',
      type: 'GET',
      cache: false,
      data: 'token=' + token, //form serizlize data
      beforeSend: function () {

      },
      success: function (data) {
        window.location.reload();
      },
      error: function (e) {
        alert(e);
      }
    });
  });
  
  
  
  /************************************
  /************************************
  /* Gestion de l'inventaire
  /************************************
  /***********************************/
  
  openInventary = function(userToken) {
    
    if(!actionInProgress) {
      
      /* On ouvre/ferme l'inventaire */
      $('.inventory').toggleClass('opened');

      $('.gardenItems').click(function() {
        $('.inventory').removeClass('opened');
      });
      
    }
    
  }
  
  
  

  
  
  
  
  
  
  
  
  /************************************
  /************************************
  /* Gestion de l'inventaire
  /************************************
  /***********************************/
  
  var inventoryElement = $('.invElementContent');
  
  inventoryElement.each(function() {
    
    var inventoryAddButtonToken = $(this).data('inventory-add-button');
    
    /* Lorsque la souris est au dessus de l'élément de l'inventaire */
    $(this).hover(function() {
      
      /* On fait apparaitre le button qui a le data-element-token = au inventory-add-button de l'élément */
      $('[data-element-token='+ inventoryAddButtonToken +']').fadeIn(0);
      
    }, function() {
      
      $('[data-element-token='+ inventoryAddButtonToken +']').fadeOut(100);
      
    });
    
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  /************************************
  /************************************
  /* Gestion des items
  /************************************
  /***********************************/
  
  
  var item = $('.item');
    
  var itemNb = item.length;

  /* Pour chaque item, on attribue un Nombre */
  item.each(function() {

    $(this).attr('data-item', itemNb--);

  });

  /* Augmenter le zIndex */
  pushAhead = function(type, elementToken) {

    var elementItemToken;
    var element;

    var maxZIndex = $('.item').length;

    /* Si l'élément selectionné a le type -type-, on restranscrit dans les variables */
    if (type == 'animal') {

      elementItemToken = $('[data-token='+ elementToken +'][id=animal]').data('item');
      element = $('[data-token='+ elementToken +'][id=animal]');

    } else if (type == 'food') {

      elementItemToken = $('[data-token='+ elementToken +'][id=food]').data('item');
      element = $('[data-token='+ elementToken +'][id=food]');

    } else if (type == 'toy') {

      elementItemToken = $('[data-token='+ elementToken +'][id=toy]').data('item');
      element = $('[data-token='+ elementToken +'][id=toy]');

    }

    /* On recupère tous les items - éléments */
    var elements = $('.item');

    /* Pour tous les éléments */
    $(elements).each(function() {

      /* Si un élément a le zIndex maximal */
      if(($(this).css('z-index') == maxZIndex)) {

        /* Et cet élément n'est pas l'élément selectionné */
        if($(this).data('item') != $(element).data('item')) {

          /* Alors on diminue cet élément de -1 */
          $(this).css('z-index', '-=1');

          /* On update son zIndex */
          socket.emit('updateZIndex', $(this).data('token'), $(this).data('type'), $(this).css('z-index'));

        }

      /* Ou sinon si pour chaque élément, cet élément est l'élément selectionné (Condition pour permettre
      d'ajouter du zIndex une seule fois) */
      } else if ($(this).data('item') == $(element).data('item')) {

        /* On lui ajoute 1 au zIndex */
        $(element).css('z-index', '+=1');

        /* On update son zIndex */
        socket.emit('updateZIndex', $(this).data('token'), $(this).data('type'), $(element).css('z-index'));

      }


    });



    /* Si le zIndex est supérieur au nombre d'item, on le remet a la plus grande valeure */
    setInterval(function() {

      if ($(element).css('z-index') > maxZIndex) {

        $(element).css('z-index', maxZIndex);

      }

    }, 200);



  }
  
  
  /* Diminuer le zIndex */
  pushBack = function(type, elementToken) {

    var elementItemToken;
    var element;

    var maxZIndex = $('.item').length;

    /* Si l'élément selectionné a le type -type-, on restranscrit dans les variables */
    if (type == 'animal') {

      elementItemToken = $('[data-token='+ elementToken +'][id=animal]').data('item');
      element = $('[data-token='+ elementToken +'][id=animal]');

    } else if (type == 'food') {

      elementItemToken = $('[data-token='+ elementToken +'][id=food]').data('item');
      element = $('[data-token='+ elementToken +'][id=food]');

    } else if (type == 'toy') {

      elementItemToken = $('[data-token='+ elementToken +'][id=toy]').data('item');
      element = $('[data-token='+ elementToken +'][id=toy]');

    }

    
    /* On lui diminue 1 au zIndex */
    $(element).css('z-index', '-=1');

    /* On update son zIndex */
    socket.emit('updateZIndex', $(element).data('token'), $(element).data('type'), $(element).css('z-index'));



    /* Si le zIndex est inférieur au nombre 0, on le remet a la valeur minimale */
    setInterval(function() {

      if ($(element).css('z-index') < 0) {

        $(element).css('z-index', 0);

      }

    }, 200);



  }
  
  
  
  
  
  
  
  
  
  /************************************
  /************************************
  /* Gestion des animaux
  /************************************
  /***********************************/
  
  
  var animal = $('[id=animal]');
  
  /* Boucle animaux */
  animal.each(function() {
    
    /*Initialiser le draggable sur l'animal */
    $(this).draggable({
      containment: '.gardenItems',
      cursor: 'move',
      stop: LiveDragging
    });

    /* A la fin du dragging, on sauvegarde la position de l'animal */
    function LiveDragging(e, ui) {
      
      var animalToken = $(this).data('token');
      
      socket.emit('animalMove', ui.position, animalToken);
      
    }
    
    /* Lorsqu'on sélectionne un animal */
    $(this).mousedown(function() {
      
      /* On retire la class selected a tous les animaux */
      $('[id=animal]').removeClass('selected');
      
      /* On ajoute la class selected à l'animal */
      $(this).addClass('selected');
      
      /* On emit pour vérifier les informations */
      socket.emit('getAnimal', $(this).data('token'), 'forMove');
      
      /* On affiche la box animalInfos */
      $('.animalInfos').fadeIn();
      
    });
    
    /* Lorsqu'on clique en arrière plan, on retire la class selected à l'animal */
    $('.gardenItemsBack').mousedown(function() {
      $('[id=animal]').removeClass('selected');
      /* On fait disparaitre la box animalInfos */
      $('.animalInfos').fadeOut();
    });
    
  });
  
  
  /* Affichage des informations sur l'animals */
  socket.on('displayAnimalInfos', function(data) {
    
    var animalInfos = $('.animalInfos');
    
    /* Affichage des informations dans la box animalInfos */
    $(animalInfos).find('.animalInfosButtons').html('<a class="animalAction animalActionEat" data-token="'+ data.token +'" title="Nourrir"><i class="fa fa-cutlery"></i></a>\
        <a class="animalAction animalActionPlay" data-token="'+ data.token +'" title="Divertir"><i class="fa fa-futbol-o"></i></a>\
        <a class="animalAction animalActionTraining" data-token="'+ data.token +'" title="Entrainer"><i class="fa fa-paw"></i></a>\
        <a class="animalAction animalActionCaress" data-token="'+ data.token +'" title="Caresser"><i class="fa fa-thumbs-up"></i></a>\
        <a class="animalAction animalActionClean" data-token="'+ data.token +'" title="Nettoyer"><i class="fa fa-tint"></i></a>\
        <a class="animalAction animalActionHeal" data-token="'+ data.token +'" title="Soigner"><i class="fa fa-medkit"></i></a>');
    $(animalInfos).find('.animalInfosName').html(data.name);

    $('.animalStats').find('.statBar.health').css('width', data.health + '%');
    $('.animalStats').find('.statBar.hygiene').css('width', data.hygiene + '%');
    $('.animalStats').find('.statBar.moral').css('width', data.moral + '%');
    
    $('.animalAction').click(function() {
      $(animalInfos).fadeOut(200);
    });
    
    /* On affiche les stats */
    $('.statButton').hover(function() {
      
      $('.animalStats').fadeIn(300);
      
    }, function() {
      
      $('.animalStats').fadeOut(200);
      
    });
    
    
    
    
    
    
    
    /***************
    /* Clean
    /**************/

    /* Lorsqu'on clique sur le bouton nettoyage */
    $('.animalInfos').find('.animalActionClean').click(function() {

      var animalToken = $(this).data('token');

      /* On vérifie les informations de l'animal */
      socket.emit('getAnimal', animalToken, 'forClean');


    });
    
    /* Fermeture de la box clean */
    $('#boxClean').find('.boxClose').click(function() {
      $(this).parent().fadeOut();
      actionInProgress = false;
    });
    
    
    /* On affiche les informations dans la boxClean bathroom */
    socket.on('displayClean', function(data) {
      
      actionInProgress = true;
      
      $('#boxClean').fadeIn();
      $('.bathroom').find('.bathroomAnimal').html('<img src="core/style/images/animals/'+ data.code +'.png?">');
      $('.bathroom').find('.bathroomButton').text('Nettoyer '+ data.name);
      $('.bathroom').find('.bathroomButton').attr('data-token', data.token);
      $('.bathroom').find('.bathroomButton').attr('onclick', 'startCleaning("'+ data.token +'")');

    });
    
    
    /* Au demarrage du nettoyage */
    startCleaning = function(animalToken) {
      
      /* On enlève la bathroom */
      $('.bathroom').slideUp();
      
      /* On retire le bouton annuler */
      $('#boxClean').find('.boxClose').hide();
      
      setTimeout(function() {
        
        /* On affiche la partie nettoyage */
        $('.clean').html('<div class="cleanTub"></div>\
        <div class="cleanAnimalContent"><div class="cleanAnimal"><img src="core/style/images/animals/'+ data.code +'_dirty.png?"></div></div>\
        <div class="cleanBubbles"></div>\
        <div class="cleanTiming"><div class="cleanProgress"><div class="cleanBar" style="width:0%"></div></div></div>\
        <div class="cleanSponge"></div>')
        
        $('.clean').slideDown();
        
        /* Initilisation du RandomVMovements */
        Firebrowser.RandomVMovements($('.cleanAnimalContent'),$('.cleanAnimal'));
        
        /* Lorsqu'on bouge la souris, on déplace l'éponge */
        $('.clean').mousemove( function(e){
          $('.cleanSponge').css({
            left:  e.clientX - $('.clean').offset().left,
            top:   e.clientY - $('.clean').offset().top
          });
        });
        
        /* Lorsqu'on bouge la souris, on augmente la barre d'hygiène */
        $('.cleanAnimal').mousemove(function() {
          
          $('.cleanBar').css('width', '+=0.5');
          
          /* Si la barre atteint 878px, on arrête le nettoyage */
          if($('.cleanBar').width() >= '878') {
            
            $('.clean').slideUp();
            
            setTimeout(function(){
              
              $('.clean').html('');
              
              /* On affiche la partie finishClean */
              $('.finishClean').html('<div class="finishCleanAnimal"><img src="core/style/images/animals/'+ data.code +'.png?"></div>\
              <div class="finishCleanBravo"><img src="core/style/images/bathroom_finish_bravo.png?"></div>\
              <div class="finishCleanText">'+ data.name +' est tout propre</div>');
              
              $('.finishClean').slideDown();
              
              
              /* On ajoute de l'hygiène à l'animal */
              socket.emit('cleanAnimal', data.token);
              
              setTimeout(function() {
                
                actionInProgress = false;
                
                /* On recharge la page */
                window.location.reload();
                
              }, 3000);
              
            }, 300);
            
          }
          
        });
        
        
        
      }, 300);
      
    }
    
    
    
  });
  
  
  
  
  
  
  

  /***************
  /* Firebrowser Features
  /**************/
  
  randomKey = function() {
    socket.emit('randomKey');
  }
  
  socket.on('logRandomKey', function(key) {
    console.log(key);
  });

  initializeTimeAgo = function() {
    var timeagoInstance = new timeago();
    timeagoInstance.render($('.timeAgo'), 'fr');
  };
  
  FirebrowserFunctions.prototype.RandomVMovements = function(container, element) {
    animateDiv();
        
        
        function makeNewPosition(){
    
            // Get viewport dimensions (remove the dimension of the element)
            var h = $(container).height() - 50;
            var w = $(container).width() - 50;

            var nh = Math.floor(Math.random() * h);

            return [nh];    

        }

        function animateDiv(){
            var newq = makeNewPosition();
            var oldq = $(element).offset();
            var speed = calcSpeed([oldq.top, oldq.left], newq);

            $(element).animate({ top: newq[0]}, speed, function(){
              animateDiv();        
            });

        };

        function calcSpeed(prev, next) {

            var x = Math.abs(prev[1] - next[1]);
            var y = Math.abs(prev[0] - next[0]);

            var greatest = x > y ? x : y;

            var speedModifier = 0.1;

            var speed = Math.ceil(greatest/speedModifier);

            return speed;

        }
  }
  
  FirebrowserFunctions.prototype.error = function (msg) {
    var failBox = $('<div class=\"fail\">' + msg + '</div>')
    $('.failContent').html(failBox);
    setTimeout(function () {
      $(failBox).slideUp(function () {
        $(failBox).remove();
      });
    }, this.toastDuration);
  };
  
  FirebrowserFunctions.prototype.success = function (msg) {
    var successBox = $('<div class=\"success\">' + msg + '</div>')
    $('.successContent').html(successBox);
    setTimeout(function () {
      $(successBox).slideUp(function () {
        $(successBox).remove();
      });
    }, this.toastDuration);
  };
  
  FirebrowserFunctions.prototype.gameInfo = function (msg, type) {
    
    if(type = 'warning') {
      
      var infoBox = $('<div class=\"infoBox\" style="display:none;"><img src="core/style/images/warning.png" />' + msg + '</div>');
      
      $('.infoContent').html(infoBox);
      
      setTimeout(function() {
        
        $(infoBox).slideDown(100);
        
        setTimeout(function () {
        
          $(infoBox).slideUp(function () {

            $(infoBox).remove();

          });
        }, 2700);
        
      }, 100);
      
    }
    
  }
  
  /*FirebrowserFunctions.prototype.LiveDragging = function(element, containment, cursor, elementToken, callback) {
    
    $(element).draggable({
      containment: containment,
      cursor: cursor,
      stop: handleDragStop
    });

    function handleDragStop(e, ui) {
      
      var elementToken = elementToken;
      
      return callback;
      
    }
    
  }*/
  
  socket.on('fail', function (msg) {
    Firebrowser.error(msg);
  });
  
  socket.on('success', function (msg) {
    Firebrowser.success(msg);
  });
  
  socket.on('inGameInfo', function(msg) {
    Firebrowser.gameInfo(msg);
  });
  
  var Firebrowser = new FirebrowserFunctions();

})(jQuery);