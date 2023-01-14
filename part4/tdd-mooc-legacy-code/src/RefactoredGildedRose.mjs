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
    this.min_quality = 0;
    this.max_quality = 50;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.exceptions.has(this.items[i].name)) {
        this.items[i].quality = Math.max(this.items[i].quality - 1, this.min_quality);
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = Math.max(this.items[i].quality - 1, this.min_quality);
        }
      } else {
        // Handle exceptions here
        if (this.items[i].name === "Aged Brie") {
          if (this.items[i].sellIn >= 0) {
            this.items[i].quality = Math.min(this.items[i].quality + 1, this.max_quality);
          } else {
            this.items[i].quality += 2;
          }
        }
        if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
          if (this.items[i].sellIn >= 11) {
            this.items[i].quality = Math.min(this.items[i].quality + 1, this.max_quality);
          } else if (this.items[i].sellIn >= 6) {
            this.items[i].quality = Math.min(this.items[i].quality + 2, this.max_quality);
          } else if (this.items[i].sellIn >= 0) {
            this.items[i].quality = Math.min(this.items[i].quality + 3, this.max_quality);
          } else {
            this.items[i].quality = 0;
          }
        }
        if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
          this.items[i].sellIn += 1;
        }
      }
      this.items[i].sellIn -= 1;
    }
    return this.items;
  }
}
