import { Request, Response, NextFunction } from 'express';
import { SocioModel } from '../models/repositories/socioModel';
import { CustomError } from '../utils/CustomError'; 

export class SocioController {
  static async getSocios(_req: Request, res: Response, next: NextFunction) {
    try {
      const socios = await SocioModel.cargarDatos(); 
      res.json(socios); 
    } catch (error) {
      next(error); 
    }
  }

  static async getTotalSocios(_req: Request, res: Response, next: NextFunction) {
    try {
      const { total, ultimoId } = await SocioModel.getTotalSocios();
      res.json({ total, ultimoId });
    } catch (error) {
      next(new CustomError('Error al obtener el total de socios', 500)); 
    }
  }

  static async getPromedioEdadPorEquipo(_req: Request, res: Response, next: NextFunction) {
    try {
      const estadisticas = await SocioModel.getPromedioEdadPorEquipo();
      res.json(estadisticas);
    } catch (error) {
      next(new CustomError('Error al obtener el promedio de edad de Racing', 500)); 
    }
  }

  static async getCasadosConEstudios(_req: Request, res: Response, next: NextFunction) {
    try {
      const casadosConEstudios = await SocioModel.getCasadosConEstudios();
      res.json(casadosConEstudios);
    } catch (error) {
      next(new CustomError('Error al obtener socios casados con estudios universitarios', 500)); 
    }
  }

  static async getNombresComunesPorEquipo(_req: Request, res: Response, next: NextFunction) {
    try {
      const nombresComunes = await SocioModel.getNombresComunesPorEquipo();
      res.json({ nombresComunes });
    } catch (error) {
      next(new CustomError('Error al obtener los nombres comunes de hinchas de River', 500)); 
    }
  }

  static async getEstadisticasPorEquipo(_req: Request, res: Response, next: NextFunction) {
    try {
      const estadisticas = await SocioModel.getEstadisticasPorEquipo();
      res.json(estadisticas);
    } catch (error) {
      next(new CustomError('Error al obtener estadísticas por equipo', 500)); 
    }
  }
}
