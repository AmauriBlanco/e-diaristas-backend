import { Param } from '@nestjs/common';
import { Express } from 'express';
import DiariaStatus from 'src/diarias/diaria-status.enum';

export class Helpers {
  async helperHbs(exp: Express) {
    const helpers = {
      token: () => {
        return exp.locals.expreq.csrfToken();
      },
      userMenu: () => {
        const user = exp.locals.expreq;
        return user['user']['nome'];
      },
      menuSuperior: (classe, view1, view2) => {
        const url: string = exp.locals.expreq['originalUrl'];
        if (url === view1 || url === view2) {
          return classe;
        }
        return '';
      },
      menuSubItem: (view) => {
        const url: string = exp.locals.expreq['originalUrl'];
        if (url === view) {
          return 'active';
        }
        return '';
      },
      exibirStatus: (status: number) => {
        switch (status) {
          case 1:
            return 'Aguardando Pagamento';
          case 2:
            return 'PAGO';
          case 3:
            return 'Diarista Selecionado';
          case 4:
            return 'Presençca Confirmada';
          case 5:
            return 'Cancelada';
          case 6:
            return 'Avaliada';
          case 7:
            return 'Transferido para Diarista';
          default:
            return 'SEM STATUS';
        }
      },
      converterData: (data: Date) => {
        const dataAtendimento = new Date(data);
        return `${dataAtendimento.toLocaleString('pt-BR')}`;
      },
      converterReal: (valor: number) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return formatter.format(valor / 100);
      },
      calcularTransferencia: (preco: number, comissao: number) => {
        const valorTransferencia = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const calculoTransferencia = preco - comissao;
        return valorTransferencia.format(calculoTransferencia / 100);
      },
      validarPagamento: (status: number, id: number) => {
        if (
          status === DiariaStatus.CONCLUIDO ||
          status === DiariaStatus.AVALIADO
        ) {
          return `href="${id}/pagar" class="btn btn-primary"`;
        }
        return 'class="btn btn-danger disabled"';
      },
      getParamCliente: (param: string) => {
        const protocol = exp.locals.expreq.protocol;
        const host = exp.locals.expreq.hostname;
        const url = exp.locals.expreq.originalUrl;
        const port = 3000;

        const fullUrl = new URL(`${protocol}://${host}:${port}${url}`);
        return fullUrl.searchParams.get(param);
      },
      getParamStatus: (param: string, value: string) => {
        const protocol = exp.locals.expreq.protocol;
        const host = exp.locals.expreq.hostname;
        const url = exp.locals.expreq.originalUrl;
        const port = 3000;
        const fullUrl = new URL(`${protocol}://${host}:${port}${url}`);
        const paramFilter = fullUrl.searchParams.get(param);
        if (paramFilter === value) {
          return 'selected';
        }
        return '';
      },
    };
    return helpers;
  }
}
