
//////////////////////////////////////
//  MODAL SETUP - ALLOWS PLAYER TO  //
//  INPUT NAME AND SELECT CLASS     //
//////////////////////////////////////

var modal         = document.getElementById('myModal'),
    span          = document.getElementsByClassName('begin')[0],
    playerGraphic = document.getElementById('player-graphic'),
    weaponGraphic = document.getElementById('weapon-graphic'),
    playerHp      = document.getElementById('player-hp'),
    promptBox     = document.getElementById('prompt-box'),
    playerName,
    phaseCounter,
    player;

function newMessage(message) {
  var alertPlayer = document.createElement('p');
  alertPlayer.innerText = message;
  promptBox.insertBefore(alertPlayer, promptBox.firstChild);
};

//////////////////////////////////////
//  DISPLAYS MODAL ON BUTTON CLICK  //
//////////////////////////////////////

document.getElementById('myBtn').onclick = function() {
    modal.style.display = 'block';
};

span.onclick = function() {
    modal.style.display = 'none';
    document.getElementById('myBtn').style.display = 'none';

    playerName = document.getElementById('character-name').value;
    if (playerName.length === 0) {
      playerName = 'Player';  
    };

///////////////////////////////////////
//  INSTALLS CHARACTER GRAPHIC AND   //
//  WEAPON GRAPHIC IN THE PLAY AREA  //
///////////////////////////////////////

    if (document.getElementById('farmer').checked) {
      var farmer              = new PlayerCharacter (playerName, 'Farmer', 18, 0, 1, 6, 6, pitchfork, [sporePod], 'none');
      player                  = farmer;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/pitchfork.jpg">';
    } else if (document.getElementById('smith').checked) {
      var smith               = new PlayerCharacter (playerName, 'Smith', 20, 0, 1, 8, 4, smithingHammer, [spike], 'none');
      player                  = smith;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/smithing-hammer.jpeg">';
    } else if (document.getElementById('builder').checked) {
      var builder             = new PlayerCharacter (playerName, 'Builder', 19, 0, 1, 7, 6, woodAxe, [powderShell], 'none');
      player                  = builder;
      playerGraphic.innerHTML = '<img src="images/player-image.jpg">';
      playerHp.innerText      = player.name + ' hit points: ' + player.hp;
      weaponGraphic.innerHTML = '<img src="images/wood-axe.jpg">';
    } else if (document.getElementById('fieldhand').checked) {
      var fieldhand           = new PlayerCharacter (playerName, 'Fieldhand', 17, 0, 1, 5, 5, handScythe, [balmVial], 'none');
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

////////////////////////////////////
//  GENERATE FIRST ENEMY TO BE    //
//  FACED IN THE MAIN GAME PHASE  //
////////////////////////////////////

    newEnemy();

/////////////////////////////////////
//  PREPARE GAME ENVIRONMENT FOR   //
//  REPEATING OF MAIN GAME PHASES  //
/////////////////////////////////////

    newMessage('The adventure through Cyfnos Village begins...');

    phaseCounter = 1

};

///////////////////////////////////////////
//  CLICK OUTSIDE THE MODAL TO CLOSE IT  //
///////////////////////////////////////////

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    };
};

//////////////////////////////////////
//  PROTOTYPE NEW PLAYER CHARACTER  //
//////////////////////////////////////

function PlayerCharacter (name, type, hp, xp, level, attack, defense, weapon, itemsBelt, condition) {
  this.name      = name;
  this.type      = type;
  this.hp        = hp;
  this.attack    = attack;
  this.defense   = defense;
  this.level     = level;
  this.weapon    = weapon;
  this.itemsBelt = itemsBelt;
  this.condition = condition;
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
function useItem(index) {
  if (phaseCounter === 1) {
    if (player.itemsBelt[index].name === 'balm vial') {
      heal(player);
    } else if (player.itemsBelt[index].name === 'powdershell') {
      newMessage(player.name + ' threw a powdershell at the ' + creature.name + '!');
      burn(creature);
    } else if (player.itemsBelt[index].name === 'spike') {
      newMessage(player.name + ' threw a spike at the ' + creature.name + '!');
      pierce(creature);
    } else {
      newMessage(player.name + ' tossed a spore pod at the ' + creature.name + '!');
      poxChance(creature);
    }
  } else {
    newMessage(player.name + ' can\'t use an item during this phase!');
  }
  player.itemsBelt.splice(index, 1);
}
////////////////////////////////////////////////////
//  FUNCTIONS TO CALCULATE ITEM & WEAPON EFFECTS  //
////////////////////////////////////////////////////

function heal(target) {
  target.hp          = ( target.hp + 3) + Math.ceil(Math.random() * 2);
  newMessage(target.name + ' has healed and now has ' + target.hp + ' hit points.');
  if (target.condition != 'none') {
    newMessage(target.name + ' is no longer ' + target.condition + '.');
    target.condition = 'none';
  } else {
    target.condition = target.condition;
  }
  playerHp.innerText = player.name + ' hit points: ' + player.hp;
};

function burn(target) {
  target.hp = (target.hp - 3) - Math.ceil(Math.random() * 3);
  burnChance(target);
  return target.hp;
};

function burnChance(target) {
  var burning        = Math.ceil(Math.random() * 5);
  if (burning > 4) {
    target.condition = 'burned';
    // console.log('Burning!');
    return target.condition;
  } else {
    target.condition = target.condition;
    return target.condition;
  }
};

function pierce(target) {
  target.hp          = (target.hp - 2) - Math.ceil(Math.random() * 2);
  bleedChance(target);
  return target.hp;
};

function bleedChance(target) {
  var bleeding       = Math.ceil(Math.random() * 8);
  if (bleeding > 7) {
    target.condition = 'bleeding';
    // console.log('Bleeding!');
    return target.condition;
  } else {
    target.condition = target.condition;
    return target.condition;
  }
};

function poxChance(target) {
  var poxing         = Math.ceil(Math.random() * 5);
  if (poxing > 4) {
    target.condition = 'poxed';
    // console.log('Contracted pox!');
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
    return playerName + ' delivered a counterstrike!';
  } else {
    return playerName + ' did not counter.';
  }
};

function counterStrike(target) {
  target.hp          = target.hp - (Math.ceil(Math.random() * 3));
  return target.hp; 
};

function lowerDefense(target) {
  target.defense     = target.defense - (Math.ceil(Math.random() * 4))
  if (target.defense < 0) {
    target.defense   = 0;
    return target.defense;
  } else {
    return target.defense;
  }
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

var creature,
    enemyGraphic = document.getElementById('enemy-graphic');
    enemyHp      = document.getElementById('enemy-hp')

/////////////////////////////////////////
//  INSTALLS NEW ENEMY INTO PLAY AREA  //
/////////////////////////////////////////

function newEnemy() {
  var enemyGen             = Math.ceil(Math.random() * 5)
  if (enemyGen === 1) {
    var bogRat             = new enemyCreature ('Bog Rat', 5, 4, 2, [balmVial], 'none');
    creature               = bogRat;
    enemyGraphic.innerHTML = '<img src="images/bog-rat.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 2) {
    var basilisk           = new enemyCreature ('Basilisk', 7, 6, 2, [balmVial], 'none');
    creature               = basilisk;
    enemyGraphic.innerHTML = '<img src="images/basilisk.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 3) {
    var moorHound          = new enemyCreature ('Moor Hound', 10, 8, 6, [balmVial], 'none');
    creature               = moorHound;
    enemyGraphic.innerHTML = '<img src="images/moor-hound.png">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else if (enemyGen === 4) {
    var darkNibilis        = new enemyCreature ('Dark Nibilis', 12, 10, 2, [balmVial, sporePod], 'none');
    creature               = darkNibilis;
    enemyGraphic.innerHTML = '<img src="images/dark-nibilis.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  } else {
    var cursedMilitia      = new enemyCreature ('Cursed Militia', 20, 12, 7, [balmVial, spike, powderShell], 'none');
    creature               = cursedMilitia;
    enemyGraphic.innerHTML = '<img src="images/cursed-militia.jpg">';
    enemyHp.innerText      = creature.name + ' hit points: ' + creature.hp; 
  }
};

/////////////////////////////////////////
//  GAME PHASES AND PHASE DEFINITIONS  //
/////////////////////////////////////////

var go = document.getElementById('goBtn');

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

//////////////////////////////////////////////////////
//  MAIN GAME PHASES - THESE PHASES REPEAT AS MANY  //
//  TIMES AS THE PLAYER CAN MAINTAIN BEFORE DYING   //
//////////////////////////////////////////////////////

function useItemPhase() {
  
  itemBox[0].onclick = function() {
    useItem(0);
  }

  itemBox[1].onclick = function() {
    useItem(1);
  }

  itemBox[2].onclick = function() {
    useItem(2);
  }



  if (player.itemsBelt.length > 0) {
    newMessage('You can use an item before the battle begins.');
  } else {
    newMessage('The next battle awaits...');
  }
  conditionCheck(creature);
  phaseCounter = 2;
};



///////////////////////////////////////////
//  CHECKS ITEMS IN ITEMSBELT ARRAY AND  //
//  UPDATES THE ITEM BELT GRAPHICS       //
///////////////////////////////////////////

var itemBox = document.getElementsByClassName('item-box');

function itemsCheck() {
  if (player.itemsBelt.length > 0) {
    for (i = 0; i < player.itemsBelt.length; i++) {
      itemBox[i].innerHTML = '<img src="' + player.itemsBelt[i].image + '">';
    }
  } else {
    for (i = 0; i < player.itemsBelt.length; i++) {
      itemBox[i].innerHTML = '<p>Empty</p>';
    }
  }
};



///////////////////////////////////////////
//  FIRST STEP OF THE MAIN COMBAT PHASE  //
//  CALCULATES DAMAGE DONE TO PLAYER     //
///////////////////////////////////////////

function creatureAttackPhase() {
  var phaseDefBoost  = Math.ceil(Math.random() * 2);
  var phaseAtkPower  = creature.attack - player.defense - phaseDefBoost;
  if (phaseAtkPower < 0) {
    phaseAtkPower    = 0;
  } else {
    phaseAtkPower = phaseAtkPower;
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
  conditionCheck(player);
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
  solveForWeapon(player);
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
  itemsCheck();
  phaseCounter = 1;
};

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

/////////////////////////////////////////////
//  CHECKS TO SEE IF PLAYER IS AFFLICTED   //
//  WITH A CONDITION AFTER FIGHTING ENEMY  //
/////////////////////////////////////////////

var statusCheck = document.getElementById('status-indicator');

function playerAfflictedCheck(target) {
  if (target.name === 'Bog Rat') {
    poxChance(player);
  } else if (target.name === 'Basilisk') {
    poxChance(player);
  } else if (target.name === 'Moor Hound') {
    pierce(player);
  } else if (target.name === 'Cursed Militia') {
    var throwChance = Math.ceil(Math.random() * 4);
    if (throwChance > 3) {
      newMessage('The Cursed Militia threw a powdershell at ' + player.name + '!');
      burn(player);
    }
  } else {
    player.condition = player.condition;
  }
  statusCheck.innerHTML = '<p>Status: ' + target.condition + '</p>';
};

function solveForWeapon(target) {
  if (target.weapon === handScythe || target.weapon === smithingHammer) {
    lowerDefense(creature);
  } else {
    target.defense = target.defense;
  }
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
};

//////////////////////////////////
//  CALCULATES WHICH ITEM WILL  //
//  BE DROPPED BY A DEAD ENEMY  //
//////////////////////////////////

function itemDrop(target) {
  var dropChance = Math.ceil(Math.random() * 2);
  if (dropChance > 1) {
    var dropped = Math.floor(Math.random() * target.items.length);
    player.itemsBelt.push(target.items[dropped]);
    newMessage('The ' + target.name + ' dropped a ' + target.items[dropped].name + '.');
  } else {
    player.itemsBelt = player.itemsBelt;
  }
  itemsCheck();
};

///////////////////////////////
//  T E S T I N G   A R E A  //
// ! ! R A D I A T I O N ! ! //
///////////////////////////////

// var farmer = new PlayerCharacter (playerName, 'Farmer', 18, 0, 1, 6, 6, [pitchfork], [sporePod], 'none');
// player = farmer;
// playerName = 'Marque';
// console.log(heal(player));
// console.log(burn(player));
// console.log(pierce(player));
// console.log(poxChance(player));
// console.log(normalDefenseBoost(player));
// console.log(highDefenseBoost(player));
// console.log(normalCounterChance(player));
// console.log(highCounterChance(player));
// console.log(lowerDefense(player));
