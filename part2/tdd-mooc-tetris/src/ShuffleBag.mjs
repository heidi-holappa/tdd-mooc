export class ShuffleBag {
    constructor() {
        this.items = []
        this.nextItem = 0
    }

    add(item, amount) {
        for (let i = 0; i < amount; i++) {
            this.items.push(item)
            this.resetNextItem()
        }
    }

    itemCount() {
        return this.items.length
    }

    resetNextItem() {
        this.nextItem = this.itemCount() -1 
    }

    getItem() {
        if (this.nextItem < 1) {
            this.resetNextItem()
            return this.items[0]
        }
        let swappableItemIndex = Math.floor(Math.random()*this.nextItem)
        let currentItemIndex = this.nextItem
        this.swapItems(currentItemIndex, swappableItemIndex)
        this.nextItem -= 1
        return this.items[currentItemIndex]
    }

    swapItems(item, swappableItem) {
        [this.items[item], this.items[swappableItem]] = [this.items[swappableItem], this.items[item]]
    }
}