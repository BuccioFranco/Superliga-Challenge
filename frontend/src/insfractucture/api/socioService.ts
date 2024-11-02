import { Socio } from "../../domain/models/SocioType";

export const getSocios = async (): Promise<Socio[]> => {
  const response = await fetch("/api/socios");
  return response.json();
};
