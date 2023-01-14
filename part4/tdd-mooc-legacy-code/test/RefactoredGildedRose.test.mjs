import { expect } from "chai";
import { Item, Shop } from "../src/RefactoredGildedRose.mjs";

describe("Gilded Rose", () => {
  it("If no items are given, an array for store items is created", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items instanceof Array).to.equal(true);
  });

  it("If no items are given, created array is empty", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  it("Store items are stored in an array", () => {
    const gildedRose = new Shop([new Item("Amulet of Wisdom", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items instanceof Array).to.equal(true);
  });

  // it("Shop array contains instances of Item class", () => {
  //   const gildedRose = new Shop([new Item("Amulet of Wisdom", 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0] instanceof Item).to.equal(true);
  // });

  it("When an Item is placed in the store, it should be found from the store catalog", () => {
    const GildedRose = new Shop([new Item("Amulet of Wisdom", 0, 0)]);
    const items = GildedRose.items;
    expect(items[0].name).to.equal("Amulet of Wisdom");
  });

  it("Updating quality returns a list of items", () => {
    const gildedRose = new Shop([new Item("Amulet of Wisdom", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Amulet of Wisdom");
  });

  it("A product with a zero price decreases by 1 in quality", () => {
    const gildedRose = new Shop([new Item("Cursed Amulet of Hunger", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  it("A product with a negative price decreases by 2 in quality", () => {
    const gildedRose = new Shop([new Item("Cursed Amulet of Hunger", -5, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Item's quality does not decrease below zero", () => {
    const gildedRose = new Shop([new Item("Amulet of Wisdom", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("If quality is one, it drops to zero", () => {
    const gildedRose = new Shop([new Item("Cheap candle", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Aged Brie's quality increases", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  it("If Aged Brie's quality is 50, it does not increase", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Aged Brie's quality increases by two when price is negative", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  it("sellIn value for Aged Brie decreases by one", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("Backstage pass quality does not increase when quality is 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.not.equal(51);
  });

  it("Backstage pass quality increases by 1 when prize is 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  it("Backstage pass quality increases by 2 when prize is below 11 and above 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  it("Backstage pass quality increases by 2 when prize is 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  it("Backstage pass quality increases by 3 when prize is below 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });

  it("Backstage pass quality increases by 3 when prize is 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });

  it("sellIn value must be a number", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.be.a("number");
  });

  it("Backstage pass with a negative price has zero quality", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -5, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Backstage pass with a quality of 49 and price between 6-11 can only become 50 in quality", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Backstage pass with a negative sellIn value does not decrease in quality", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.not.equal(25);
  });

  it("Quality of Sulfuras, Hand of Ragnaros does not decrease", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  it("sellIn value of Sulfuras, Hand of Ragnaros does not decrease", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  it("Sulfuras, Hand of Ragnaros with a negative sellIn value does not decrease in quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(25);
  });

  it("sellIn value of an nameless item does decrease", () => {
    const gildedRose = new Shop([new Item("", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  it("quality of an nameless item with negative sellIn value decreases by two", () => {
    const gildedRose = new Shop([new Item("", -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
  });
});
