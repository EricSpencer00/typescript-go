class Queue {
    items = [];
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        if (this.items.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
const q = new Queue();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue()); // 1
