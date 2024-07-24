function Pokemon(name, type, evolutionStage) {
  this.name = name;
  this.type = type;
  this.evolutionStage = evolutionStage;
}

Pokemon.prototype.isType = function (type) {
  return this.type === type;
}


let pokemonCards = {
  collection: [],
  add(name, type, evolutionStage) {
    let pokemon = new Pokemon(name, type, evolutionStage);
    this.collection.push(pokemon);
  },
  getUnevolved() {
    return this.collection.filter(pokemon => pokemon.evolutionStage === 1);
  },
  filterByType(type) {
    return this.collection.filter(pokemon => pokemon.isType(type));
  },
};

pokemonCards.add('char', 'dog', 1);
pokemonCards.add('me', 'ghd', 3);

console.log(pokemonCards.filterByType('dog'));