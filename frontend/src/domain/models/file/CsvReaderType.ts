import { Socio } from "../SocioType";

export interface CsvReaderProps {
  onDataLoad: (data: Socio[]) => void;
  onClearData: () => void;
}