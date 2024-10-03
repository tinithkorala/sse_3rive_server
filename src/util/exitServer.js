const exitServer = (delay = 100) => {
  setTimeout(() => {
    process.exit(1);
  }, delay);
};

export default exitServer;
