import { SocioModel } from '../../models/repositories/socioModel';
import { CustomError } from '../../utils/CustomError';
import { Socio } from '../../types/sociosTypes';

jest.mock('fs');
const mockCargarDatos = jest.spyOn(SocioModel as any, 'cargarDatos');

const mockSocios: Socio[] = [
  { id: 1, nombre: 'Juan', edad: 30, equipo: 'River', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
  { id: 2, nombre: 'Ana', edad: 25, equipo: 'Boca', estadoCivil: 'Soltero', nivelEstudios: 'Terciario' },
  { id: 3, nombre: 'Luis', edad: 40, equipo: 'River', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
  { id: 4, nombre: 'Maria', edad: 22, equipo: 'Boca', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
  { id: 5, nombre: 'Pedro', edad: 35, equipo: 'River', estadoCivil: 'Soltero', nivelEstudios: 'Universitario' },
];

describe('SocioModel', () => {
  beforeAll(() => {
    mockCargarDatos.mockResolvedValue(mockSocios); 
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('debería obtener el total de socios y el último ID correctamente', async () => {
    const result = await SocioModel.getTotalSocios();
    expect(result).toEqual({ total: 5, ultimoId: '5' });
  });

  it('debería devolver socios casados con estudios universitarios, ordenados por edad', async () => {
    const result = await SocioModel.getCasadosConEstudios();
    expect(result).toEqual([
      { id: 4, nombre: 'Maria', edad: 22, equipo: 'Boca', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
      { id: 1, nombre: 'Juan', edad: 30, equipo: 'River', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
      { id: 3, nombre: 'Luis', edad: 40, equipo: 'River', estadoCivil: 'Casado', nivelEstudios: 'Universitario' },
    ]);
  });

  it('debería devolver estadísticas por equipo correctamente', async () => {
    const result = await SocioModel.getEstadisticasPorEquipo();
    expect(result).toEqual([
      { _id: 'River', count: 3, averageAge: 35, minAge: 30, maxAge: 40 },
      { _id: 'Boca', count: 2, averageAge: 24, minAge: 22, maxAge: 25 },
    ]);
  });

  it('debería devolver el promedio de edad por equipo correctamente', async () => {
    const result = await SocioModel.getPromedioEdadPorEquipo();
    expect(result).toEqual([
      { equipo: 'River', promedioEdad: 35 },
      { equipo: 'Boca', promedioEdad: 23 },
    ]);
  });

  it('debería devolver los nombres comunes por equipo correctamente', async () => {
    const result = await SocioModel.getNombresComunesPorEquipo();
    expect(result).toEqual([
      { equipo: 'River', nombresComunes: [{ nombre: 'Juan', count: 1 }, { nombre: 'Luis', count: 1 }, { nombre: 'Pedro', count: 1 }] },
      { equipo: 'Boca', nombresComunes: [{ nombre: 'Ana', count: 1 }, { nombre: 'Maria', count: 1 }] },
    ]);
  });

  it('debería manejar errores y lanzar CustomError', async () => {
    mockCargarDatos.mockRejectedValueOnce(new CustomError('Error al cargar datos', 500));
    try {
      await SocioModel.getTotalSocios();
    } catch (error) {
      const customError = error as CustomError; 
      expect(customError).toBeInstanceOf(CustomError);
      expect(customError.message).toBe('Error al obtener el total de socios');
    }
  });
});