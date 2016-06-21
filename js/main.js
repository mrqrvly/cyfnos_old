




/////////////////////////////////////////////////////////
//  MODAL TO SELECT NAME AND STARTING CHARACTER CLASS  //
/////////////////////////////////////////////////////////

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName('begin')[0];
var playerName;
var player;
btn.onclick = function() {
    modal.style.display = 'block';
};

span.onclick = function() {
    modal.style.display = 'none';
    btn.style.display = 'none';

    playerName = document.getElementById('character-name').value;
    if (playerName.length === 0) {
      playerName = 'Player';  
    };

  
    if (document.getElementById('farmer').checked) {
      var farmer    = new PlayerCharacter (playerName, 'Farmer', 18, 0, 1, 6, 6, [pitchfork], [sporePod], 'none');
      player = farmer;
    } else if (document.getElementById('smith').checked) {
      var smith     = new PlayerCharacter (playerName, 'Smith', 20, 0, 1, 8, 4, [smithingHammer], [spike], 'none');
      player = smith;
    } else if (document.getElementById('builder').checked) {
      var builder   = new PlayerCharacter (playerName, 'Builder', 19, 0, 1, 7, 6, [woodAxe], [powderShell], 'none');
      player = builder;
    } else if (document.getElementById('fieldhand').checked) {
      var fieldhand = new PlayerCharacter (playerName, 'Fieldhand', 17, 0, 1, 5, 5, [handScythe], [balmVial], 'none');
      player = fieldhand;
    } else {
      player = farmer;
    }

    console.log(playerName);
    console.log(player.type);
    console.log(player);
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    };
};





//////////////////////////////////////
//  PROTOTYPE NEW PLAYER CHARACTER  //
//////////////////////////////////////

function PlayerCharacter (name, type, hp, xp, level, attack, defense, weapons, itemsBelt, conditionsEffect) {
  this.name                   = name;
  this.type                   = type;
  this.hp                     = hp;
  this.attack                 = attack;
  this.defense                = defense;
  this.level                  = level;
  this.weapons                = weapons;
  this.itemsBelt              = itemsBelt;
  this.conditionsEffect       = conditionsEffect;
};





//////////////////////////////////////////
//  WEAPONS & QUEST ITEMS' DEFINITIONS  //
//////////////////////////////////////////

var balmVial = {
  name:         'balm vial',
  price:        9,
  playerEffect: 'heal'
};
var powderShell = {
  name:         'powder shell',
  price:        15,
  enemyEffect:  'burn'
};
var spike = {
  name:         'spike',
  price:        7,
  enemyEffect:  'bleed'
};
var sporePod = {
  name:         'spore pod',
  price:        6,
  enemyEffect:  'pox'
};
var smallRoundShield = {
  name:         'small round shield',
  price:        25,
  playerEffect: 'boost defense'
};
var knightsShield = {
  name:         'knight\'s shield',
  price:        35,
  playerEffect: 'boost defense 2'
};
var pitchfork = {
  name:         'pitchfork',
  power:        3,
  playerEffect: 'boost counter'
};
var smithingHammer = {
  name:         'smithing hammer',
  power:        4,
  enemyEffect:  'lower defense'
};
var woodAxe = {
  name:         'wood axe',
  power:        5,
  enemyEffect:  'bleed'
};
var handScythe = {
  name:         'hand scythe',
  power:        4,
  enemyEffect:  'lower defense'
};





////////////////////////////////////////////////////
//  FUNCTIONS TO CALCULATE ITEM & WEAPON EFFECTS  //
////////////////////////////////////////////////////

function heal(target) {
  target.hp = ( target.hp + 3) + Math.ceil(Math.random() * 2);
  return target.hp;
};

function burn(target) {
  target.hp = (target.hp - 3) - Math.ceil(Math.random() * 3);
  burnChance(target);
  return target.hp;
};
function burnChance(target) {
  var burning = Math.ceil(Math.random() * 5);
  if (burning > 4) {
    target.conditionsEffect = 'burned';
    // console.log('Burning!');
    return target.conditionsEffect;
  } else {
    target.conditionsEffect = target.conditionsEffect;
    return target.conditionsEffect;
  }
};

function pierce(target) {
  target.hp = (target.hp - 2) - Math.ceil(Math.random() * 2);
  bleedChance(target);
  return target.hp;
};
function bleedChance(target) {
  var bleeding = Math.ceil(Math.random() * 8);
  if (bleeding > 7) {
    target.conditionsEffect = 'bleeding';
    // console.log('Bleeding!');
    return target.conditionsEffect;
  } else {
    target.conditionsEffect = target.conditionsEffect;
    return target.conditionsEffect;
  }
};

function poxChance(target) {
  var poxing = Math.ceil(Math.random() * 5);
  if (poxing > 4) {
    target.conditionsEffect = 'poxed';
    // console.log('Contracted pox!');
    return target.conditionsEffect
  } else {
    target.conditionsEffect = target.conditionsEffect;
    return target.conditionsEffect;
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
  var counter = Math.ceil(Math.random() * 3);
  if (counter > 2) {
    counterStrike(target);
    return playerName + ' delivered a counterstrike!';
  } else {
    return playerName + ' did not counter.';
  }
};
function highCounterChance(target) {
  var counter = Math.ceil(Math.random() * 3);
  if (counter > 1) {
    counterStrike(target);
    return playerName + ' delivered a counterstrike!';
  } else {
    return playerName + ' did not counter.';
  }
};
function counterStrike(target) {
  target.hp = target.hp - (Math.ceil(Math.random() * 3));
  return target.hp; 
};

function lowerDefense(target) {
  target.defense = target.defense - (Math.ceil(Math.random() * 4))
  if (target.defense < 0) {
    target.defense = 0;
    return target.defense;
  } else {
    return target.defense;
  }
};





/////////////////////////////////////
//  MERCHANT NPC CHARACTER OBJECT  //   !!!  THIS FEATURE IS CURRENTLY NOT ACTIVE  !!!
/////////////////////////////////////

// var merchant = {
//   name: 'Merchant',
//   itemsForSale: [balmVial, powderShell, spike, sporePod, smallRoundShield, knightsShield, pitchfork, smithingHammer, woodAxe, handScythe]
// }





///////////////////////////////////////////
//  PROTOTYPE MONSTER AND MONSTER TYPES  //
///////////////////////////////////////////

function enemyCreature (name, hp, attack, defense, itemsDrop, conditionsEffect) {
  this.name                   = name;
  this.hp                     = hp;
  this.attack                 = attack;
  this.defense                = defense;
  this.itemsDrop              = itemsDrop;
  this.conditionsEffect       = conditionsEffect;
};





//////////////////////
//  CREATURE TYPES  //
//////////////////////

var bogRat        = new enemyCreature ('bog rat', 5, 4, 2, [balmVial], 'none');
var basilisk      = new enemyCreature ('basilisk', 7, 6, 2, [balmVial], 'none');
var moorHound     = new enemyCreature ('moor hound', 10, 8, 6, [balmVial], 'none');
var darkNibilis   = new enemyCreature ('dark nibilis', 12, 10, 2, [sporePod], 'none');
var cursedMilitia = new enemyCreature ('cursed militia', 20, 12, 7, [balmVial, spike, powderShell], 'none');
















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
