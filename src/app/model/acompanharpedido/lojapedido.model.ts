/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { PedidoCab } from "./pedidocab.model";

/* eslint-disable @typescript-eslint/naming-convention */
export class LojaPedido {
  CD_CLIENTE: number;
  NM_FANTASIA: string;
  pedidosCab: PedidoCab[];
  esconder: boolean = false;
  pedidoMaisRecente: number;
}
