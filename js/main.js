


//  PROTOTYPE NEW PLAYER CHARACTER  //
//////////////////////////////////////

var playerName;

function playerCharacter (name, hp, xp, level, attack, defense, weapons, itemsBelt, playerConditionsEffect) {
  this.name                   = name;
  this.hp                     = hp;
  this.attack                 = attack;
  this.defense                = defense;
  this.level                  = level;
  this.weapons                = weapons;
  this.itemsBelt              = itemsBelt;
  this.playerConditionsEffect = playerConditionsEffect;
};





//  CHARACTER STARTING CLASSES DEFINED  //
//////////////////////////////////////////

var farmer    = new playerCharacter (playerName, 18, 0, 1, 6, 6, [pitchfork], [sporePod], 'none');
var smith     = new playerCharacter (playerName, 20, 0, 1, 8, 4, [smithingHammer], [spike], 'none');
var builder   = new playerCharacter (playerName, 19, 0, 1, 7, 6, [woodAxe], [powderShell], 'none');
var fieldhand = new playerCharacter (playerName, 17, 0, 1, 5, 5, [handScythe], [balmVial], 'none');





//  WEAPONS & QUEST ITEMS DEFINITIONS  //
/////////////////////////////////////////

var balmVial: {
  name:         'balm vial',
  price:        9,
  playerEffect: heal()
};

var powderShell: {
  name:         'powder shell',
  price:        15,
  enemyEffect:  fire()
};

var spike: {
  name:         'spike',
  price:        7,
  enemyEffect:  [pierce(), bleedChance()]
};

var sporePod: {
  name:         'spore pod',
  price:        6,
  enemyEffect:  poxChance()
};

var smallRoundShield: {
  name:         'small round shield',
  price:        25,
  playerEffect: boostDefense()
};

var knightsShield: {
  name:         'knight\'s shield',
  price:        35,
  playerEffect: boostDefense()
};

var pitchfork: {
  name:         'pitchfork',
  power:        3,
  playerEffect: boostCounterChance()
}

var smithingHammer: {
  name:         'smithing hammer',
  power:        4,
  enemyEffect:  lowerDefense()
}





//  FUNCTION TO CALCULATE ITEM & WEAPON EFFECTS  //
///////////////////////////////////////////////////







//  MERCHANT NPC CHARACTER OBJECT  //
/////////////////////////////////////

var merchant = {
  name: 'Merchant',
  itemsForSale: [balmVial, powderShell, spike, sporePod, smallRoundShield, knightsShield, pitchfork, smithingHammer, woodAxe, handScythe]
}





//  PROTOTYPE MONSTER AND MONSTER TYPES  //
///////////////////////////////////////////

function enemyCreature (name, hp, attack, defense, itemsDrop, enemyConditionsEffect, enemyConditionsCause) {
  this.name                   = name;
  this.hp                     = hp;
  this.attack                 = attack;
  this.defense                = defense;
  this.itemsDrop              = itemsDrop;
  this.enemyConditionsEffect  = enemyConditionsEffect;
  this.enemyConditionsCause   = enemyConditionsCause;
};





//  CREATURE TYPES  //
//////////////////////

var bogRat         = new enemyCreature ('bog rat', 5, 2, 2, [balmVial], 'none', pox);
var basilisk       = new enemyCreature ('basilisk', 7, 3, 2, [balmVial], 'none', pox);
var moorHound      = new enemyCreature ('moor hound', 10, 4, 6, [balmVial], 'none', bleed);
var dark nibilis   = new enemyCreature ('dark nibilis', 12, 5, 2, [sporePod], 'none', 'none');
var cursed militia = new enemyCreature ('cursed militia', 20, 6, 7, [balmVial, spike, powderShell], 'none', burn);




































