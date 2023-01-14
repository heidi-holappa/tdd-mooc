/*
Testing randomness is difficult. Perhaps introduce a shufflebag to make testing robust
Give an option to test given parameters to validate that conditions work. 
*/

function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue(die1 = diceRoll(), die2 = diceRoll()) {
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
export class shuffleBag {
  constructor() {
    this.shuffleItems = [];
    this.nextItem = 0;
  }

  add(item, amount) {
    for (let i = 0; i < amount; i++) {
      this.shuffleItems.push(item);
      this.resetNextItem();
    }
  }

  resetNextItem() {
    this.nextItem = this.shuffleItems.length - 1;
  }

  itemCount() {
    return this.shuffleItems.length;
  }

  getItem() {
    if (this.nextItem < 1) {
      this.resetNextItem();
      return this.shuffleItems[0];
    }
    let swappableItemIndex = Math.floor(Math.random() * this.nextItem);
    let currentItemIndex = this.nextItem;
    this.swapItems(currentItemIndex, swappableItemIndex);
    this.nextItem -= 1;
    return this.shuffleItems[currentItemIndex];
  }

  swapItems(item, swappableItem) {
    [this.shuffleItems[item], this.shuffleItems[swappableItem]] = [
      this.shuffleItems[swappableItem],
      this.shuffleItems[item],
    ];
  }
}
