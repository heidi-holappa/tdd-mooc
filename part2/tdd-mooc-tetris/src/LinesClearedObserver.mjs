export class LinesClearedObserver {
    
    constructor() {
        this.subscribers = new Set()
    }

    subscribe(subscriber) {
        this.subscribers.add(subscriber)
    }

    unsubscribe(subscriber) {
        this.subscribers.delete(subscriber)
    }

    notifyLinesCleared(lines) {
        this.subscribers.forEach((key) => {
            key.setPoints(lines)
        })
    }
}