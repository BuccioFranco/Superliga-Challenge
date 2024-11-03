import { readFileSync } from 'fs';
import path from 'path';
import { Socio } from '../models/types/sociosTypes';

export class SocioService {
  private static readonly dataPath = path.join(__dirname, '../data/socios.json');

  public static cargarSocios(): Socio[] {
    const data = readFileSync(this.dataPath, 'utf-8');
    return JSON.parse(data);
  }
}