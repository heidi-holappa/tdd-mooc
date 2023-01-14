import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";
import { RefactoredItem, RefactoredShop } from "../src/RefactoredGildedRose.mjs";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  // Accidentally started refactoring tests too soon.
  // it("When an Item is placed in the store, it should be found from the store catalog", () => {
  //   const RefactoredGildedRose = new RefactoredShop([new RefactoredItem("Amulet of Wisdom", 0, 0)]);
  //   const items = RefactoredGildedRose.items;
  //   expect(items[0].name).to.equal("Amulet of Wisdom");
  // });

  it("foo should have zero quality", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Aged Brie's quality increases", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  it("Backstage pass quality increases by 2 when prize is below 11 and above 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  it("Backstage pass quality increases by 3 when prize is below 6 and above 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });

  it("A product with a negative price and has a decreasing quality if it is not Sulfuras, Hand of Ragnaros", () => {
    const gildedRose = new Shop([new Item("bar", -5, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Backstage pass with a negative price has zero quality", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -5, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Aged Brie's quality increases when price is negative", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });
});
