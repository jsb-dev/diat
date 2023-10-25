let lock = false;

export const acquireLock = async () => {
  while (lock) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  lock = true;
};

export const releaseLock = () => {
  lock = false;
};
