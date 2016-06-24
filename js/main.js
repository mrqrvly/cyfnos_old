
//  --------------------  GLOBAL & SETUP STUFF  --------------------  //


////////////////////////
//  GLOBAL VARIABLES  //
////////////////////////

var modal         = document.getElementById('myModal'),
    span          = document.getElementsByClassName('begin')[0],
    playerGraphic = document.getElementById('player-graphic'),
    weaponGraphic = document.getElementById('weapon-graphic'),
    playerHp      = document.getElementById('player-hp'),
    slain         = document.getElementById('kills'),
    promptBox     = document.getElementById('prompt-box'),
    // statusCheck   = document.getElementById('status-indicator'),
    enemyGraphic  = document.getElementById('enemy-graphic'),
    enemyHp       = document.getElementById('enemy-hp'),
    go            = document.getElementById('goBtn'),
    kills         = 0,
    creature,
    playerName,
    phaseCounter,
    player;



/////////////////////////////
//  PRINTS RUNNING UPDATE  //
//  ON CURRENT GAME STATE  //
/////////////////////////////

function newMessage(message) {
  var alertPlayer = document.createElement('p');
  alertPlayer.innerText = message;
  promptBox.insertBefore(alertPlayer, promptBox.firstChild);
};



////////////////////////////////////
//  DISPLAYS MODAL FOR CHARACTER  //
//  SELECTION ON BUTTON CLICK &   //
//  CLOSES MODAL ON WINDOW CLICK  //
////////////////////////////////////

document.getElementById('myBtn').onclick = function() {
    modal.style.display = 'block';
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    };
};



//  --------------------  CHARACTER CREATION & PROTOTYPES  --------------------  //



/////////////////////////////////////////////
//  HIDES CHARACTER SELECTION OPTIONS AND  //
//  SELECTS DEFAULTS IF NO INPUT IS GIVEN  //
/////////////////////////////////////////////

span.onclick = function() {
    modal.style.display = 'none';
    document.getElementById('myBtn').style.display = 'none';
    playerName = document.getElementById('character-name').value;
    if (playerName.length === 0) {
      playerName = 'Player';  
    };



//////////////////////////////////////
//  PROTOTYPE NEW PLAYER CHARACTER  //
//////////////////////////////////////

function PlayerCharacter (name, type, hp, attack, defense, weapon, itemsBelt, condition) {
  this.name      = name;
  this.type      = type;
  this.hp        = hp;
  this.attack    = attack;
  this.defense   = defense;
  this.weapon    = weapon;
  this.itemsBelt = itemsBelt;
  this.condition = condition;
};



///////////////////////////////////////
//  INSTALLS CHARACTER GRAPHIC AND   //
//  WEAPON GRAPHIC IN THE PLAY AREA  //
///////////////////////////////////////

    if (document.getElementById('farmer').checked) {
      var farmer              = new PlayerCharacter (playerName, 'Farmer', 18, 5, 5, pitchfork, [sporePod], 'none');
      player                  = farmer;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/pitchfork.jpg">';
    } else if (document.getElementById('smith').checked) {
      var smith               = new PlayerCharacter (playerName, 'Smith', 20, 7, 3, smithingHammer, [spike], 'none');
      player                  = smith;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/smithing-hammer.jpeg">';
    } else if (document.getElementById('builder').checked) {
      var builder             = new PlayerCharacter (playerName, 'Builder', 19, 6, 4, woodAxe, [powderShell], 'none');
      player                  = builder;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/wood-axe.jpg">';
    } else if (document.getElementById('fieldhand').checked) {
      var fieldhand           = new PlayerCharacter (playerName, 'Fieldhand', 17, 5, 5, handScythe, [balmVial], 'none');
      player                  = fieldhand;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/hand-scythe.jpg">';
    } else {
      player                  = farmer;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/pitchfork.jpg">';
    }

    itemsCheck();
    newEnemy();
    newMessage(player.name + '\'s travels through Cyfnos Village begins...');
    phaseCounter = 1;
};



///////////////////////////////////////////
//  PROTOTYPE MONSTER AND MONSTER TYPES  //
///////////////////////////////////////////

function enemyCreature (name, hp, attack, defense, items, condition) {
  this.name      = name;
  this.hp        = hp;
  this.attack    = attack;
  this.defense   = defense;
  this.items     = items;
  this.condition = condition;
};



/////////////////////////////////////////
//  INSTALLS NEW ENEMY INTO PLAY AREA  //
/////////////////////////////////////////


function newEnemy() {
  var enemyGen             = Math.ceil(Math.random() * 5)
  if (enemyGen        === 1) {
    var bogRat             = new enemyCreature ('Bog Rat', 5, 6, 2, [balmVial], 'none');
    creature               = bogRat;
    enemyGraphic.innerHTML = '<img src="images/bog-rat.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 2) {
    var basilisk           = new enemyCreature ('Basilisk', 7, 7, 2, [balmVial], 'none');
    creature               = basilisk;
    enemyGraphic.innerHTML = '<img src="images/basilisk.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 3) {
    var moorHound          = new enemyCreature ('Moor Hound', 10, 8, 4, [balmVial], 'none');
    creature               = moorHound;
    enemyGraphic.innerHTML = '<img src="images/moor-hound.png">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 4) {
    var darkNibilis        = new enemyCreature ('Dark Nibilis', 12, 9, 2, [balmVial, sporePod], 'none');
    creature               = darkNibilis;
    enemyGraphic.innerHTML = '<img src="images/dark-nibilis.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else {
    var cursedMilitia      = new enemyCreature ('Cursed Militia', 15, 10, 4, [balmVial, spike, powderShell], 'none');
    creature               = cursedMilitia;
    enemyGraphic.innerHTML = '<img src="images/cursed-militia.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  }
};



//  --------------------  ACTUAL RUNTIME & GAME PHASES  --------------------  //



/////////////////////////////////////////
//  CONDITIONAL THAT ALLOWS GO BUTTON  //
//  TO CYCLE THROUGH STAGES OF COMBAT  //
/////////////////////////////////////////

go.onclick = function() {
  if (phaseCounter === 1) {
    useItemPhase();
  } else if (phaseCounter === 2) {
    creatureAttackPhase();
  } else {
    playerAttackPhase();
  }
};



/////////////////////////////////////
//  PHASE 1 - PLAYER CAN CHOOSE    //
//  TO USE ITEMS IN THE TOOL BELT  //
/////////////////////////////////////


function useItemPhase() {

  itemBox[0].onclick = function() {
    useItem(0);
  };
  itemBox[1].onclick = function() {
    useItem(1);
  };
  itemBox[2].onclick = function() {
    useItem(2);
  };
  if (player.itemsBelt.length > 0) {
    newMessage('You can use an item before the battle begins.');
  } else {
    newMessage('The next battle awaits...');
  }
  conditionCheck(creature);
  phaseCounter = 2;
};



//////////////////////////////////////
//  MAKES ITEM EFFECTS TRIGGER AND  //
//  MANAGES GRAPHICS IN ITEM BELT   //
//////////////////////////////////////

function useItem(index) {
  if (phaseCounter === 2) {
    if (player.itemsBelt[index].name === 'balm vial') {
      heal(player);
    } else if (player.itemsBelt[index].name === 'powder shell') {
      newMessage(player.name + ' threw a powdershell at the ' + creature.name + '!');
      burn(creature);
    } else if (player.itemsBelt[index].name === 'spike') {
      newMessage(player.name + ' threw a spike at the ' + creature.name + '!');
      pierce(creature);
    } else if (player.itemsBelt[index].name === 'spore pod') {
      newMessage(player.name + ' tossed a spore pod at the ' + creature.name + '!');
      poxChance(creature);
    }
    player.itemsBelt.splice(index, 1);
    itemBox[index].firstChild.remove();
    for (var i = 0; i < 3; i++) {
      itemBox[i].innerHTML = '<p>Empty</p>';
    }
    itemsCheck();
    enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
  } else {
    newMessage(player.name + ' can\'t use an item during this phase!');
  }
  
};


///////////////////////////////////////////
//  CHECKS ITEMS IN ITEMSBELT ARRAY AND  //
//  UPDATES THE ITEM BELT GRAPHICS       //
///////////////////////////////////////////

var itemBox = document.getElementsByClassName('item-box');

function itemsCheck() {
  if (player.itemsBelt.length > 0) {
    for (var i = 0; i < player.itemsBelt.length; i++) {
      itemBox[i].innerHTML = '<img src="' + player.itemsBelt[i].image + '">';
    }
  } else {
    for (var i = 0; i < 3; i++) {
      itemBox[i].innerHTML = '<p>Empty</p>';
    }
  }
};



//  --------------------  COMBAT AND OTHER OUTCOME DETERMINATES  --------------------  //

///////////////////////////////////
//  CHECKS FOR PLAYER DEATH AND  //
//  ENDS GAME IF PLAYER IS DEAD  //
///////////////////////////////////


function playerDeathCheck() {
  if (player.hp < 0) {
    player.hp = 0;
    playerHp.innerText = player.name + ' hit points: ' + player.hp;
    go.style.display = 'none';
    newMessage(player.name + ' died.  GAME OVER');
  } else {
    player.hp = player.hp;
  }
};

///////////////////////////////////
//  CHECKS FOR ENEMY DEATH AND   //
//  CALCULATES ITEM DROP IF ANY  //
///////////////////////////////////


function creatureDeathCheck() {
  if (creature.hp < 0) {
    creature.hp = 0;
    enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
    newMessage(player.name + ' has slain the ' + creature.name + '.');
    kills += 1;
    slain.innerText = 'Enemies slain: ' + kills;
    if (player.itemsBelt.length < 3) {
      itemDrop(creature);
    } else {
      player.itemsBelt = player.itemsBelt;
    }
    newEnemy();
  } else {
    creature.hp = creature.hp;
  }
};

//////////////////////////////////////////
//  WEAPONS & QUEST ITEMS' DEFINITIONS  //
//////////////////////////////////////////

var balmVial = {
  name:         'balm vial',
  image:        'images/balm-vial.png'
};
var powderShell = {
  name:         'powder shell',
  image:        'images/powdershell.jpg'
};
var spike = {
  name:         'spike',
  image:        'images/spike.jpg'
};
var sporePod = {
  name:         'spore pod',
  image:        'images/spore-pod.jpg'
};
var smallRoundShield = {
  name:         'small round shield',
  image:        'images/small-round-shield'
};
var knightsShield = {
  name:         'knight\'s shield',
  image:        'images/knights-shield'
};
var pitchfork = {
  name:         'pitchfork',
  power:        3,
  image:        'images/pitchfork.jpg'
};
var smithingHammer = {
  name:         'smithing hammer',
  power:        4,
  image:        'images/smithing-hammer.jpeg'
};
var woodAxe = {
  name:         'wood axe',
  power:        5,
  image:        'images/wood-axe.jpg'
};
var handScythe = {
  name:         'hand scythe',
  power:        4,
  image:        'images/hand-scythe.jpg' 
};

///////////////////////////////////////////
//  FOLLOWS COMBAT PHASE - IF PLAYER     //
//  HAS A STATUS CONDITION, THIS CHECK   //
//  WILL DEAL APPROPRIATE DAMAGE BEFORE  //
//  THE CURRENT PHASE COMES TO AN END    //
///////////////////////////////////////////


function conditionCheck(target) {
  if (target.condition === 'burned') {
    target.hp -= 1;
    newMessage(target.name + ' took 1 burn damage.');
  } else if (target.condition === 'poxed') {
    var dmg = Math.ceil(Math.random() * 2);
    target.hp -= dmg;
    newMessage(target.name + ' took ' + dmg + ' pox damage.');
  } else if (target.condition === 'bleeding') {
    var dmg = Math.ceil(Math.random() * 3);
    target.hp -= dmg;
    newMessage(target.name + ' took ' + dmg + ' bleed damage.');
  } else {
    target.hp = target.hp;
  }
  if (target === player) {
    playerHp.innerText = player.name + ' hit points: ' + player.hp;
  } else { 
    enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
  }
};

//////////////////////////////////
//  CALCULATES WHICH ITEM WILL  //
//  BE DROPPED BY A DEAD ENEMY  //
//////////////////////////////////

function itemDrop(target) {
  var dropChance = Math.ceil(Math.random() * 4);
  if (dropChance > 1) {
    var dropped = Math.floor(Math.random() * target.items.length);
    player.itemsBelt.push(target.items[dropped]);
    newMessage('The ' + target.name + ' dropped a ' + target.items[dropped].name + '.');
  } else {
    player.itemsBelt = player.itemsBelt;
  }
  itemsCheck();
};









//////////////////////////////////////
//  FUNCTIONS TO CALCULATE EFFECTS  //
//  OF ITEMS, WEAPONS, & CREATURES  //
//////////////////////////////////////

function heal(target) {
  var health         = Math.ceil(Math.random() * 2);
  target.hp          = ( target.hp + 3) + health;
  newMessage(target.name + ' gained ' + (health + 3) + ' and now has ' + target.hp + ' hit points.');
  if (target.condition != 'none') {
    newMessage(target.name + ' is no longer ' + target.condition + '.');
    target.condition = 'none';
  } else {
    target.condition = target.condition;
  }
  playerHp.innerText = player.name + ' hit points: ' + player.hp;
};

function burn(target) {
  var dmg = Math.ceil(Math.random() * 3);
  target.hp = (target.hp - 3) - dmg;
  newMessage(target.name + ' took ' + (dmg + 3) + ' burn damage.');
  if (target === player) {
    playerHp.innerText = player.name + ' hit points: ' + player.hp;
  } else if (target === creature) {
    enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
  }
  burnChance(target);
};

function burnChance(target) {
  var burning        = Math.ceil(Math.random() * 5);
  if (burning > 4) {
    target.condition = 'burned';
    newMessage(target.name + ' is burning!');
  } else {
    target.condition = target.condition;
    return target.condition;
  }
};

function pierce(target) {
  var dmg            = Math.ceil(Math.random() * 2);
  target.hp          = (target.hp - 2) - dmg;
  newMessage(target.name + ' took ' + (dmg + 2) + ' pierce damage.');
  bleedChance(target);
};

function bleedChance(target) {
  var bleeding       = Math.ceil(Math.random() * 8);
  if (bleeding > 7) {
    target.condition = 'bleeding';
    newMessage(target.name + ' is bleeding!');
    return target.condition;
  } else {
    target.condition = target.condition;
    return target.condition;
  }
};

function poxChance(target) {
  var poxing         = Math.ceil(Math.random() * 3);
  if (poxing > 2) {
    target.condition = 'poxed';
    newMessage(target.name + ' has contracted pox!');
    return target.condition
  } else {
    target.condition = target.condition;
    return target.condition;
  }
};

function normalDefenseBoost(target) {
  target.defense += 2;
  return target.defense;
};

function highDefenseBoost(target) {
  target.defense += 4;
  return target.defense;
};

function normalCounterChance(target) {
  var counter        = Math.ceil(Math.random() * 3);
  if (counter > 2) {
    counterStrike(creature);
    return playerName + ' delivered a counterstrike!';

  } else {
    return playerName + ' did not counter.';
  }
};

function highCounterChance(target) {
  var counter        = Math.ceil(Math.random() * 3);
  if (counter > 1) {
    counterStrike(creature);
  } else {
    newMessage(playerName + ' did not counter.');
  }
};

function counterStrike(target) {
  var dmg = Math.ceil(Math.random() * 3);
  target.hp          = target.hp - dmg;
  newMessage(playerName + ' delivered a counterstrike for ' + dmg + '!');
  creatureDeathCheck();
  enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
};

function lowerDefense(target) {
  target.defense     = target.defense - (Math.ceil(Math.random() * 4))
  if (target.defense < 0) {
    target.defense   = 0;
    return target.defense;
  } else {
    target.defense = target.defense;
  }
};



///////////////////////////////////////////
//  FIRST STEP OF THE MAIN COMBAT PHASE  //
//  CALCULATES DAMAGE DONE TO PLAYER     //
///////////////////////////////////////////

function creatureAttackPhase() {
  phaseCounter = 2
  var phaseDefBoost  = Math.floor(Math.random() * 3);
  var phaseAtkPower  = creature.attack - player.defense - phaseDefBoost;
  if (phaseAtkPower < 0) {
    phaseAtkPower    = 0;
  }
  player.hp -= phaseAtkPower;
  newMessage('The ' + creature.name + ' dealt ' + phaseAtkPower + ' damage to ' + player.name + '.');
  playerHp.innerText = player.name + ' hit points: ' + player.hp;
  playerDeathCheck();
  playerAfflictedCheck(creature);
  if (player.weapon === pitchfork) {
    highCounterChance(player);
  } else {
    normalCounterChance(player);
  }
  creatureDeathCheck();
  conditionCheck(creature);
  playerHp.innerText = player.name + ' hit points: ' + player.hp;
  playerDeathCheck();
  phaseCounter = 3;
};



////////////////////////////////////////////
//  SECOND STEP OF THE MAIN COMBAT PHASE  //
//  CALCULATES DAMAGE DONE TO CURRENT     //
//  ENEMY AND/OR GENERATES NEW ENEMY IF   //
//  THE CURRENT ENEMY IS DEFEATED         //
////////////////////////////////////////////

function playerAttackPhase() {
  if (player.weapon === handScythe || player.weapon === smithingHammer) {
    lowerDefense(creature);
  } else {
    creature.defense = creature.defense;
  }
  var phaseAtkPower = (player.attack + player.weapon.power) - creature.defense;
  if (phaseAtkPower < 0) {
    phaseAtkPower = 0;
  } else {
    phaseAtkPower = phaseAtkPower;
  }
  creature.hp -= phaseAtkPower;
  newMessage(player.name + ' dealt ' + phaseAtkPower + ' damage to the ' + creature.name + '.');
  enemyHp.innerText = creature.name + ' hit points: ' + creature.hp;
  creatureDeathCheck();
  conditionCheck(player);
  itemsCheck();
  phaseCounter = 1;
};



/////////////////////////////////////////////
//  CHECKS TO SEE IF PLAYER IS AFFLICTED   //
//  WITH A CONDITION AFTER FIGHTING ENEMY  //
/////////////////////////////////////////////

function playerAfflictedCheck(target) {
  if (target.name === 'Bog Rat') {
    poxChance(player);
  } else if (target.name === 'Basilisk') {
    poxChance(player);
  } else if (target.name === 'Moor Hound') {
    bleedChance(player);
  } else if (target.name === 'Cursed Militia') {
    var throwChance = Math.ceil(Math.random() * 4);
    if (throwChance > 3) {
      newMessage('The Cursed Militia threw a powdershell at ' + player.name + '!');
      burn(player);
    }
  } else {
    player.condition = player.condition;
  }
};
