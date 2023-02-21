/* eslint-disable @typescript-eslint/quotes */
import { Cliente } from "../model/cliente.models";

/* eslint-disable @typescript-eslint/naming-convention */
export class User {
  email?: string;
  passwordHash?: string;
  cpf?: string;
  userName?: string;
  redeLoja?: string;
  ativo?: boolean;

  editando?: boolean;
}
