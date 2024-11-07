import { Request, Response } from 'express';
import { Socio } from '../types/sociosTypes';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';
import iconv from 'iconv-lite';
import path from 'path';
import { CustomError } from '../utils/CustomError';

export class CsvController {
  static async procesarArchivo(req: Request, res: Response) {
    if (!req.file) {
      throw new CustomError('No se ha subido ningún archivo.', 400); 
    }

    const results: Socio[] = [];
    const stream = Readable.from(iconv.decode(req.file.buffer, 'latin1'));

    try {
      stream
        .pipe(csvParser({ separator: ';', headers: false }))
        .on('data', (data) => {
          const socio: Socio = {
            id: results.length + 1,
            nombre: data[0] || '',
            edad: data[1] ? parseInt(data[1], 10) : 0,
            equipo: data[2] || '',
            estadoCivil: data[3] || '',
            nivelEstudios: data[4] || '',
          };
          results.push(socio);
        })
        .on('end', () => {
          CsvController.guardarSociosEnJson(results);
          res.json(results);
        })
        .on('error', (error) => {
          console.error('Error al procesar el archivo CSV:', error);
          res.status(500).send('Error al procesar el archivo');
        });
    } catch (error) {
      console.error('Error inesperado al procesar el archivo:', error);
      res.status(500).send('Error inesperado al procesar el archivo');
    }
  }

  private static guardarSociosEnJson(socios: Socio[]) {
    const jsonFilePath = path.join(__dirname, '../data/socios.json');
    try {
      writeFileSync(jsonFilePath, JSON.stringify(socios, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar el archivo JSON:', error);
    }
  }
}
