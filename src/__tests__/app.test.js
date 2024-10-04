import request from 'supertest';
import "dotenv/config";
import app from '../app.js'; // Import your Express app

describe('Express App', () => {
  it('should respond with 200 on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      message: 'Health ok !',
    });
  });

});