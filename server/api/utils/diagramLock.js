class Lock {
  constructor() {
    this.lock = Promise.resolve();
  }

  async acquire() {
    let release;
    const willLock = new Promise((resolve) => {
      release = resolve;
    });

    const willRelease = this.lock.then(() => release);

    this.lock = this.lock.then(() => willLock);

    return willRelease;
  }
}

export const diagramLock = new Lock();
