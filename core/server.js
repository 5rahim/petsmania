/************************************
/************************************


 /$$$$$$$$ /$$                     /$$                                                                      
| $$_____/|__/                    | $$                                                                      
| $$       /$$  /$$$$$$   /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$  /$$  /$$  /$$  /$$$$$$$  /$$$$$$   /$$$$$$ 
| $$$$$   | $$ /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$| $$ | $$ | $$ /$$_____/ /$$__  $$ /$$__  $$
| $$__/   | $$| $$  \__/| $$$$$$$$| $$  \ $$| $$  \__/| $$  \ $$| $$ | $$ | $$|  $$$$$$ | $$$$$$$$| $$  \__/
| $$      | $$| $$      | $$_____/| $$  | $$| $$      | $$  | $$| $$ | $$ | $$ \____  $$| $$_____/| $$      
| $$      | $$| $$      |  $$$$$$$| $$$$$$$/| $$      |  $$$$$$/|  $$$$$/$$$$/ /$$$$$$$/|  $$$$$$$| $$      
|__/      |__/|__/       \_______/|_______/ |__/       \______/  \_____/\___/ |_______/  \_______/|__/      


*************************************
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

var http = require('http');
var mysql = require('mysql');
var crypto = require('crypto');
var timeago = require("timeago.js");
var cron = require('cron').CronJob;

/************************************
/************************************
/* Configuration de la base de donnée
/************************************
/***********************************/

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'petsmania'
});


connection.connect(function (err) {
  if (err) {
    console.error('Impossible de se connecter', err);
  }
});

/************************************
/************************************
/* HTTPserver
/************************************
/***********************************/

httpServer = http.createServer(function (req, res) {
  console.log('Un utilisateur a affiché la page');
});

httpServer.listen('2525');

var usersCount = 0;

var io = require('socket.io').listen(httpServer);

/************************************
/************************************
/* La gestion des évènements
/************************************
/***********************************/


String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


var FirebrowserFunctions;

function FirebrowserFunctions() {
  
}



io.sockets.on('connection', function (socket) {

socket.setMaxListeners(0);

  // Mes événements lorsque le client est connecté

  // La variable du joueur, vide par défaut = aucun joueur

  var me;


  /***************
  /* Définition des sessions de jeu
  /**************/

  // Si il n'y a pas de SESSION, je vide la variable du joueur
  socket.on('noSession', function () {
    me = false;
  });

  // Si il y a une SESSION, je remplie la variable du joueur
  socket.on('startSession', function (token) {


    connection.query('SELECT * FROM users WHERE token = ?', [token], function(err, res) {
      if (err) {
        console.log(err);
      }

      me = res[0];
      
      
      
      
      /***************
      /* Get Animal
      /**************/
      
      /* On vérifie les informations puis on les retourne */
      socket.on('getAnimal', function(animalToken, forWhat) {
        
        connection.query('SELECT * FROM animals_membership WHERE token = ? AND owner_token = ?', [animalToken,me.token], function(err, res) {
          
          if(err) {
            console.log(err.code);
          }
          
          /* Si c'est pour le deplacer/afficher les infos */
          if(forWhat == 'forMove') {
            
            socket.emit('displayAnimalInfos', res[0]);
            
          /* Si c'est pour le nettoyer */
          } else if (forWhat == 'forClean') {
            
            /* Si l'animal ne fait rien */
            if(res[0].inAction == 0) {
              
              /* Si l'hygiène est à 100 */
              if(res[0].hygiene == 100) {
              
                socket.emit('inGameInfo', res[0].name + ' est déjà propre', 'warning');
              
              /* Si l'animal est sal */
              } else if (res[0].hygiene <= 90) {

                socket.emit('displayClean', res[0]);

              }
              
            /* Si l'animal fait quelque chose */
            } else {
              
              socket.emit('inGameInfo', res[0].name + 'est occupé', 'warning');
              
            }
            
          }
          
        });
        
      });
      
      
      
      
      
      
      /***************
      /* Move animals
      /**************/
      
      /* On met a jour les positions de l'animal */
      socket.on('animalMove', function(data, animalToken) {
        
        connection.query('UPDATE animals_membership SET pxTop = ?, pxLeft = ? WHERE owner_token = ? AND token = ?', [data.top, data.left, me.token, animalToken], function(err, res){
          
          if(err) {
            console.log(err.code);
          }
          
        });
        
      });
      
      
      
      
      
      /***************
      /* Update zIndex
      /**************/
      
      socket.on('updateZIndex', function(token, type, value) {
        
        if(type == 'animal') {
          
          connection.query('UPDATE animals_membership SET zIndex = ? WHERE owner_token = ? AND token = ?', [value, me.token, token], function(err, res){
          
            if(err) {
              console.log(err.code);
            }

          });
          
        }
        
      });
      
    
      
      
      
      
      /***************
      /* Clean animal
      /**************/
      
      /* On ajoute de l'hygiène à l'animal */
      socket.on('cleanAnimal', function(animalToken) {
        
        connection.query('UPDATE animals_membership SET hygiene = 100 WHERE token = ? AND owner_token = ?', [animalToken,me.token], function(err, res) {
          
          if(err) {
            console.log(err.code);
          }
          
          
        });
        
      });
      
		

      
    });


  });
  
  
  new cron('00 01 00 * * 1-7', function() {
    console.log('New day: add 1 to animals age');
    
    connection.query('UPDATE animals_membership SET age = age + 1',function(err, res){
          
      if(err) {
        console.log(err.code);
      }

    });
    
  }, null, true);



  /***************
  /* Register
  /**************/

  socket.on('doRegister', function(data) {

    var illegalChars = new RegExp("^[a-zA-Z0-9]{5,16}$","g");
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

    if (data.email == "" || data.pseudo == "" || data.password == "" || data.passwordConfirm == "") {
      Firebrowser.error('Veuillez remplir tous les champs');
    } else {

      // Je verifie si l'email à la bonne taille
      if (data.email.length > 10) {

        // Je verifie si l'email est correct
        if (regex.test(data.email)) {

          // Je verifie si l'email est déjà utilisée
          connection.query('SELECT * FROM users WHERE email = ?', [data.email], function(err, rows, fields){

            if (err) {
              socket.emit('debugClient', err.code);
              return false;
            }

            if (rows.length == 1 && rows[0].email == data.email) {
              Firebrowser.error('L\'email entrée est déjà utilisée');

            } else {
              //Je verifie si le pseudo fait la bonne taille
              if ((data.pseudo.length > 5 && data.pseudo.length < 16) ) {

                // Je verifie si le pseudo est correct
                if (illegalChars.test(data.pseudo)) {

                  // Je vérifie si les mots de passe font la bonne taille
                  if ((data.password.length > 6) && (data.passwordConfirm.length > 6)) {

                    // Je vérifie si le mot de passe est identique au mot de passe de confirmation
                    if (data.password == data.passwordConfirm) {

                      var finalPassword = crypto.createHash('md5').update(data.password).digest("hex");

                      var registrationToken = crypto.createHash('md5').update(data.email + Date.now()).digest("hex");

                      var now = Date.now();

                      var registrationData = {
                        pseudo: data.pseudo,
                        email: data.email,
                        token: registrationToken,
                        password: finalPassword,
                        join_date: now,
                        money: 500,
                        diamond: 0,
                        ban: 0,
                        hasAnimal: 0
                      };
                      
                      var gardenData = {
                        token: registrationToken,
                        code: 'DEFAULT'
                      }

                      connection.query('INSERT INTO users SET ?', registrationData, function(err, rows) {

                        if (err) {
                          console.log(err.code);
                          return;
                        }
                        
                        connection.query('INSERT INTO garden SET ?', gardenData, function(err, rows) {

                          if (err) {
                            console.log(err.code);
                            return;
                          }

                        });

                        socket.emit('registrationFinish');

                      });

                    } else {
                      Firebrowser.error('Vos mots de passe ne sont pas identiques');

                    }

                  } else {
                    Firebrowser.error('Votre mot de passe doit faire au moins 6 caractères');

                  }

                } else {
                  Firebrowser.error('Votre pseudo ne contient pas de bons caractères');
                }

              } else {
                Firebrowser.error('Votre pseudo doit faire entre 5 et 16 caractères');
              }
            }

          });

        } else {
          Firebrowser.error('Votre email est invalide');
        }

      } else {
        Firebrowser.error('Votre email est trop court');
      }

    }
  });

  /***************
  /* Login
  /**************/

  socket.on('doLogin', function (data) {
    connection.query('SELECT * FROM users WHERE email = ?', [data.email], function (err, res) {
      if (err) {
        console.log(err);
      }
      if (res.length > 0) {
        var loginPassword = crypto.createHash('md5').update(data.password).digest("hex");
        connection.query('SELECT * FROM users WHERE email = ? and password = ?', [data.email, loginPassword], function (err, res) {
          if (err) {
            console.log(err);
          }
          if (res.length > 0) {
            socket.emit('ajaxLogin', res[0].token);
          } else {
            Firebrowser.error('Le mot de passe entré est incorrect');
          }
        });
      } else {
        Firebrowser.error('Cet email n\'existe pas');
      }
    });
  });

  /***************
  /* Firebrowser Features
  /**************/
  
  socket.on('randomKey', function() {
    
    socket.emit('logRandomKey', crypto.createHmac('sha1', 'abc12345').update('R6eCf057jgu485483je45kf3Z9P8VX' + Date.now()).digest("hex"));
    
  });
  
  FirebrowserFunctions.prototype.randomKeyMD5 = function() {
    return crypto.createHmac('md5', 'abc12345').update('R6eCf05qjOovn0u7Vpu3palK11Z9P8VX' + Date.now()).digest("hex")
  }
  FirebrowserFunctions.prototype.randomKeySHA1 = function() {
    return crypto.createHmac('sha1', 'abc12345').update('R6eCf05qjOovn0u7Vpu3palK11Z9P8VX' + Date.now()).digest("hex")
  }

  FirebrowserFunctions.prototype.error = function (msg) {
    socket.emit('fail', msg);
  }

  FirebrowserFunctions.prototype.getDate = function () {
    
    var getDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var ii = today.getMinutes();
    var ss = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    }

    if(hh<10) {
        mm='0'+mm
    }

    if(ii<10) {
        mm='0'+mm
    }

    if(ss<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy+' '+hh+':'+ii+':'+ss;
    return today;
  }
    
  }
  
  
  
  
  var Firebrowser = new FirebrowserFunctions();

});