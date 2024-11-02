import fs from 'fs'
import csv from 'csv-parser'
import { Socio } from "./models/socioType";

export const parseCSV = async (filePath: string): Promise<Socio[]> => {
  const socios: Socio[] = [];

  const stream = fs.createReadStream(filePath).pipe(csv({ separator: ';' }));

  try {
    for await (const data of stream) {
      const socio: Socio = {
        nombre: data.Nombre,
        edad: parseInt(data.Edad, 10),
        equipo: data.Equipo,
        estadoCivil: data['Estado Civil'],
        nivelEstudios: data['Nivel de Estudios'],
      };
      socios.push(socio);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error procesando el archivo CSV: ${error.message}`);
    }
  }

  return socios;
}