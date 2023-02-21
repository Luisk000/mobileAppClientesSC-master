import { Produto } from 'src/app/model/produto.model';
/* eslint-disable @typescript-eslint/quotes */

/* eslint-disable @typescript-eslint/naming-convention */
export class PedidoCarrinho{
  cD_CLIENTE: number;
  nM_FANTASIA: string;
  produtosCarrinho: Produto[];
}
