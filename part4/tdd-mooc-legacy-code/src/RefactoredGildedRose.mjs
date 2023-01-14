export class RefactoredItem {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class RefactoredShop {
  constructor(items = []) {
    this.items = items;
  }
}
