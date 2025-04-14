class Queue<T> {
    private items: T[] = [];
  
    enqueue(item: T): void {
      this.items.push(item);
    }
  
    dequeue(): T {
      if (this.items.length === 0) {
        throw new Error("Queue is empty");
      }
      return this.items.shift()!;
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  const q = new Queue<number>();
  q.enqueue(1);
  q.enqueue(2);
  console.log(q.dequeue()); // 1
  