import { Request, Response } from 'express';
import { SocioModel } from '../models/local-file/socioModel';
import { Socio } from '../models/types/sociosTypes'; 
import csvParser from 'csv-parser';
import { Readable } from 'stream'; 

export class SocioController {
  static async procesarArchivo(req: Request, res: Response) {
    const results: Socio[] = [];

    if (!req.file) {
      res.status(400).send('No se ha subido ningún archivo.');
      return;
    }

    const buffer = req.file.buffer;
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csvParser())
      .on('data', (data) => {
        const socio: Socio = {
          nombre: data.nombre,
          edad: parseInt(data.edad, 10),
          equipo: data.equipo,
          estadoCivil: data.estadoCivil,
          nivelEstudios: data.estudios,
        };
        results.push(socio);
      })
      .on('end', async () => {
        console.log(`Total de socios leídos del archivo: ${results.length}`);
        await SocioModel.procesarDatos(results); // Guarda los datos en el modelo
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error al procesar el archivo:', error);
        res.status(500).send('Error al procesar el archivo');
      });
  }

  static async getTotalSocios(_req: Request, res: Response) {
    const total = await SocioModel.getTotalSocios();
    res.json({ total });
  }

  static getPromedioEdadRacing(_req: Request, res: Response) {
    const promedioEdad = SocioModel.getPromedioEdadRacing();
    res.json({ promedioEdad });
  }

  static getCasadosConEstudios(_req: Request, res: Response) {
    const casadosConEstudios = SocioModel.getCasadosConEstudios();
    res.json(casadosConEstudios);
  }

  static getNombresComunesRiver (_req: Request, res: Response) {
    const nombresComunes = SocioModel.getNombresComunesRiver();
    res.json(nombresComunes);
  }

  static getEstadisticasPorEquipo(_req: Request, res: Response) {
    const estadisticas = SocioModel.getEstadisticasPorEquipo();
    res.json(estadisticas);
  }

  
}
