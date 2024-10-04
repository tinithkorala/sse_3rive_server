import { loggerConfig } from './../config/appConfig.js'; 

describe('loggerConfig', () => {
  beforeEach(() => {
    delete process.env.LEVEL;
    delete process.env.FILENAME;
  });

  it('should use default values when environment variables are not set', () => {
    const config = loggerConfig;
    expect(config.level).toBe('info');
    expect(config.filename).toBe('src/logs/app.log');
  });

  it('should use environment variables when set', () => {
    process.env.LEVEL = 'info';
    process.env.FILENAME = 'src/logs/app.log';
    const config = loggerConfig;
    expect(config.level).toBe('info');
    expect(config.filename).toBe('src/logs/app.log');
  });

  it('should default to "info" if LEVEL is empty', () => {
    process.env.LEVEL = '';
    const config = loggerConfig;
    expect(config.level).toBe('info');
    expect(config.filename).toBe('src/logs/app.log');
  });

  it('should default to "src/logs/app.log" if FILENAME is empty', () => {
    process.env.FILENAME = '';
    const config = loggerConfig;
    expect(config.level).toBe('info');
    expect(config.filename).toBe('src/logs/app.log');
  });
});