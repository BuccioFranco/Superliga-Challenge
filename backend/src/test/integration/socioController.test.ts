import request from 'supertest';
import app from '../../index';

describe('Pruebas de integración de SocioController', () => {
  it('debería devolver la lista de socios', async () => {
    const response = await request(app).get('/api/socios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('debería procesar y almacenar un archivo correctamente', async () => {
    const csvContent = 'Daniel;38;Newells;Casado;Terciario\nMartín;46;River;Casado;Terciario';
    const response = await request(app)
      .post('/api/socios/upload')
      .attach('file', Buffer.from(csvContent), 'socios.csv');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); 
  });
});
