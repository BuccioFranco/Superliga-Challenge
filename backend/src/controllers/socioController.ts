import { Request, Response } from 'express';
import { SocioModel } from '../models/local-file/socioModel';
import { Socio } from '../models/types/sociosTypes';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';
import path from 'path';

export class SocioController {
  static async procesarArchivo(req: Request, res: Response) {
    const results: Socio[] = [];

    if (!req.file) {
      res.status(400).send('No se ha subido ningún archivo.');
      return;
    }

    const buffer = req.file.buffer;
    const stream = Readable.from(buffer.toString())

    stream
      .pipe(csvParser({ separator: ';', headers: false }))
      .on('data', (data) => {

        const socio: Socio = {
          id: results.length + 1, // Asigna un ID basado en la longitud actual
          nombre: data[0] || '', // Suponiendo que el nombre está en la primera columna
          edad: data[1] ? parseInt(data[1], 10) : 0, // Asegúrate de convertir la edad
          equipo: data[2] || '', // Asegúrate de que el equipo esté bien mapeado
          estadoCivil: data[3] || '', // Estado civil
          nivelEstudios: data[4] || '', // Nivel de estudios
        };
        results.push(socio);
      })
      .on('end', async () => {
        console.log(`Total de socios leídos del archivo: ${results.length}`);
        const jsonFilePath = path.join(__dirname, '../data/socios.json');
        writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error al procesar el archivo:', error);
        res.status(500).send('Error al procesar el archivo');
      });
  }

  static async getTotalSocios(_req: Request, res: Response) {
    try {
      const { total, ultimoId } = await SocioModel.getTotalSocios();
      res.json({ total, ultimoId }); // Envía ambos valores en la respuesta
    } catch (error) {
      console.error("Error al obtener el total de socios:", error);
      res.status(500).json({ error: 'Error al obtener el total de socios' });
    }
  }

  static async getPromedioEdadRacing(_req: Request, res: Response) {
    try {
      const { promedioEdad } = await SocioModel.getPromedioEdadRacing();
      res.json({ promedioEdad });
    } catch (error) {
      console.error("Error al obtener el promedio:", error);
      res.status(500).json({ error: 'Error al obtener el promedio de edad' });
    }
  }

  static async getCasadosConEstudios(_req: Request, res: Response) {
    const casadosConEstudios = await SocioModel.getCasadosConEstudios();
    res.json(casadosConEstudios);
  }

  static async getNombresComunesRiver(_req: Request, res: Response) {
    try {
      const nombresComunes = await SocioModel.getNombresComunesRiver(); // Llama al método
      res.json({ nombresComunes }); // Envía la respuesta con los nombres comunes
    } catch (error) {
      console.error("Error al obtener los nombres comunes:", error);
      res.status(500).json({ error: 'Error al obtener los nombres comunes de River' });
    }
  }

  static async getEstadisticasPorEquipo(_req: Request, res: Response) {
    const estadisticas = await SocioModel.getEstadisticasPorEquipo();
    res.json(estadisticas);
  }
  
}
