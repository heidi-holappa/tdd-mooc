export class LinesClearedObserver {
    
    constructor() {
        this.subscribers = []
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber)
    }

    unsubscribe(subscriber) {
        this.subscribers = this.subscribers
            .filter((item) => item != subscriber)
    }

    getNumberOfSubscribers() {
        return this.subscribers.length
    }

    notifyLinesCleared(lines) {
        // console.log(`Function called. Lines = ${lines}, Subscribers: ${this.subscribers.size}`) 
        this.subscribers.forEach((key) => {
            key.setPoints(lines)
        })
    }

}