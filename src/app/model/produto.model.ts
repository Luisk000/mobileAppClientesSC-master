/* eslint-disable @typescript-eslint/naming-convention */
export interface Produto{
  cD_CLIENTE: number;
  cD_PEDIDO: number;
  cD_PRODUTO: number;
  cD_ITEM: number;
  nM_PRODUTO: string;
  nM_FANTASIA: string;
  qT_QTDENAEMBALAGEM: number;
  qT_PRODUTO?: number;
  dT_PEDIDO: Date;
  dT_ENTREGA?: Date;
  imagem: any;

  dataPrevistaString: string;
  dataPedidoString: string;
  dataEntregaString: string;
  entregue: boolean;
}
