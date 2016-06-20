

//  ============================  C Y F N O S  ============================  //
//  Cyfnos is a browser-based game wherein the player is faced with an       //
//  interminable horde of monsters which she must face using only the tools  //
//  she discovers along her way. She may discover items such as balms or     //
//  powdershells to help her in her struggle to survive, but she must also   //
//  beware the dangers of adventuring which include pox, lacerations, and    //
//  burns. Adventure awaits, but so does certain death!                      //
//  =======================================================================  //



//  --------------  Player Character Prototype and Functions  -------------  //



//  PROTOTYPE NEW PLAYER CHARACTER  //
//////////////////////////////////////

function playerCharacter (name, hp, xp, level, attack, defense, weapons, itemsBelt, conditionsEffect) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.defense = defense;

  this.xp = xp;
  this.level = level;
  this.weapons = weapons;
  this.items = items;
  this.conditionsEffect = conditionsEffect;
};







//  -------------------  Enemy Prototype and Functions  -------------------  //



//  PROTOTYPE NEW ENEMY MONSTER Type  //
////////////////////////////////////////

function enemyCreature (name, hp, attack, defense, itemsDrop, conditionsCause) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.defense = defense;

  this.itemsDrop = itemsDrop;
  this.conditionsCause = conditionsCause;
};
