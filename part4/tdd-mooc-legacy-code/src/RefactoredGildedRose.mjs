export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = [], exceptions = new Set()) {
    this.items = items;
    this.exceptions = exceptions;
    this.exceptions.add("Aged Brie");
    this.exceptions.add("Backstage passes to a TAFKAL80ETC concert");
    this.exceptions.add("Sulfuras, Hand of Ragnaros");
    this.exceptions.add("Conjured item");
    this.min_quality = 0;
    this.max_quality = 50;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (!this.exceptions.has(item.name)) {
        item = this.decreaseQuality(item);
      } else {
        this.handleExceptions(item);
      }
      item.sellIn -= 1;
    }
    return this.items;
  }

  decreaseQuality(item) {
    item.quality = Math.max(item.quality - 1, this.min_quality);
    if (item.sellIn < 0) {
      item.quality = Math.max(item.quality - 1, this.min_quality);
    }
    return item;
  }

  handleExceptions(item) {
    if (item.name === "Aged Brie") {
      if (item.sellIn >= 0) {
        item.quality = Math.min(item.quality + 1, this.max_quality);
      } else {
        item.quality += 2;
      }
    }
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn >= 11) {
        item.quality = Math.min(item.quality + 1, this.max_quality);
      } else if (item.sellIn >= 6) {
        item.quality = Math.min(item.quality + 2, this.max_quality);
      } else if (item.sellIn >= 0) {
        item.quality = Math.min(item.quality + 3, this.max_quality);
      } else {
        item.quality = 0;
      }
    }
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      item.sellIn += 1;
    }
    if (item.name === "Conjured item") {
      item = this.decreaseQuality(item);
      item = this.decreaseQuality(item);
    }
  }
}
