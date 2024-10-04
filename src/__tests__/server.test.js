describe('Server Initialization', () => {
  it('should handle unhandled exceptions gracefully', async () => {
    process.emit('uncaughtException', new Error('Test uncaught exception'));
  });
});
