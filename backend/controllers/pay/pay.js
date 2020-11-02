const checkout = require("./checkout");
const transactions = require("./transactions");
const boleto = require("./boleto");

const {
    getCompoundInterest,
    getSuggestPrice,
} = require("../../utils/number/getCompoundInterest");
/* NOTAS
1.
Comprador Teste:
Email: c82394317961096588498@sandbox.pagseguro.com.br
Senha: 1188g5251aD87F1P

2.
Cartão de crédito de testes:
N*: 4111111111111111
Bandeira: VISA
Validade: 12/2030
CVV: 123

3.
Independentemente do formato de dados utilizado, a codificação de caracteres padrão para a integração é a ISO-8859-1. Tome o cuidado de sempre enviar os dados com este encoding de caracteres. Os dados enviados pelo PagSeguro sempre estarão neste encoding.

5. Tipos de meio de pagamentos e seus códigos
1   Cartão de crédito: o comprador escolheu pagar a transação com cartão de crédito.
2   Boleto: o comprador optou por pagar com um boleto bancário.
3   Débito online (TEF): o comprador optou por pagar a transação com débito online de algum dos bancos conveniados.
4   Saldo PagSeguro: o comprador optou por pagar a transação utilizando o saldo de sua conta PagSeguro.
5   Oi Paggo *: o comprador escolheu pagar sua transação através de seu celular Oi.
7   Depósito em conta: o comprador optou por fazer um depósito na conta corrente do PagSeguro. Ele precisará ir até uma agência bancária, fazer o depósito, guardar o comprovante e retornar ao PagSeguro para informar os dados do pagamento. A transação será confirmada somente após a finalização deste processo, que pode levar de 2 a 13 dias úteis.

6. Código identificador do meio de pagamento.
101 Cartão de crédito Visa.
102 Cartão de crédito MasterCard.
103 Cartão de crédito American Express.
104 Cartão de crédito Diners.
105 Cartão de crédito Hipercard.
106 Cartão de crédito Aura.
107 Cartão de crédito Elo.
108 Cartão de crédito PLENOCard.
109 Cartão de crédito PersonalCard.
110 Cartão de crédito JCB.
111 Cartão de crédito Discover.
112 Cartão de crédito BrasilCard.
113 Cartão de crédito FORTBRASIL.
114 Cartão de crédito CARDBAN.
115 Cartão de crédito VALECARD.
116 Cartão de crédito Cabal.
117 Cartão de crédito Mais!.
118 Cartão de crédito Avista.
119 Cartão de crédito GRANDCARD.
120 Cartão de crédito Sorocred.
122 Cartão de crédito Up Policard.
123 Cartão de crédito Banese Card.
201 Boleto Bradesco. (X)
202 Boleto Santander.
301 Débito online Bradesco.
302 Débito online Itaú.
303 Débito online Unibanco.
304 Débito online Banco do Brasil.
305 Débito online Banco Real.
306 Débito online Banrisul.
307 Débito online HSBC.
401 Saldo PagSeguro. (X)
501 Oi Paggo. (X)
701 Depósito em conta - Banco do Brasil (X)

7. Tipos de Status de Transição OK
1 Aguardando pagamento - O comprador iniciou a transação, mas até o momento o PagSeguro não recebeu nenhuma informação sobre o pagamento. Quando a resposta da instituição financeira é muito rápida, omitimos esta notificação.
Transições:
Para Paga: Quando a operação é confirmada pela instituição financeira.
Para Em análise: Quando a operação entra em uma fila para que sejam feitas análises adicionais pela equipe do PagSeguro.
Para Cancelada: Quando a operação é negada pela instituição financeira ou quando o PagSeguro não recebe uma confirmação após um intervalo de tempo.

2 Em análise - O comprador optou por pagar com um cartão de crédito e o PagSeguro está analisando o risco da transação.
Transições:
Para Paga: Quando tanto o PagSeguro quanto a operadora de cartões de crédito aprovam a transação.
Para Cancelada: Quando o PagSeguro ou a operadora de cartões de crédito negam a transação.

3 Paga - A transação foi paga pelo comprador e o PagSeguro já recebeu uma confirmação da instituição financeira responsável pelo processamento. Quando uma transação tem seu status alterado para Paga, isso significa que você já pode liberar o produto vendido ou prestar o serviço contratado. Porém, note que o valor da transação pode ainda não estar disponível para retirada de sua conta, pois o PagSeguro pode esperar o fim do prazo de liberação da transação.
Transições:
Para Em disputa: Quando o comprador, dentro do prazo de liberação da transação, indicar que não recebeu o produto ou serviço adquirido, ou que o mesmo foi entregue com problemas. Este processo é chamado de disputa e é mediado pela equipe do PagSeguro. Para saber mais, veja a página de explicação sobre disputas.
Para Devolvida: Quando você entrar em acordo com o comprador para devolver o valor da transação, pois não possui mais o produto em estoque ou não pode mais prestar o serviço contratado.
Para Disponível: Quando a transação chega ao final de seu prazo de liberação sem ter sido retornada e não há nenhuma disputa aberta.

4 Disponível - A transação foi paga e chegou ao final de seu prazo de liberação sem ter sido retornada e sem que haja nenhuma disputa aberta. Este status indica que o valor da transação está disponível para saque.
Transições:
Para Devolvida: Quando você entrar em acordo com o comprador para devolver o valor da transação, pois não possui mais o produto em estoque ou não pode mais prestar o serviço contratado.
Para Em disputa: Quando o comprador indicar que não recebeu o produto ou serviço adquirido, ou que o mesmo foi entregue com problemas. Este processo é chamado de disputa e é mediado pela equipe do PagSeguro. Para saber mais, veja a página de explicação sobre disputas. Uma transação pode entrar em disputa, mesmo após a finalização do prazo de liberação do pagamento.

5 Em disputa - O comprador, dentro do prazo de liberação da transação, abriu uma disputa direto com a PagSeguro. A disputa é um processo iniciado pelo comprador para indicar que não recebeu o produto ou serviço adquirido, ou que o mesmo foi entregue com problemas. Este é um mecanismo de segurança oferecido pelo PagSeguro. A equipe do PagSeguro é responsável por mediar a resolução de todas as disputas, quando solicitado pelo comprador. Para mais informações, veja a página de explicação sobre disputas.
Transições:
Para Disponível: Quando a disputa é resolvida em favor do vendedor, indicando que o produto ou serviço foi efetivamente entregue corretamente.
Para Devolvida: Quando a disputa é resolvida em favor do comprador, indicando que o produto não foi entregue ou foi entregue fora das especificações e deve ser devolvido.
Para Paga: Quando a disputa é resolvida em favor do vendedor, porém antes da finalização do prazo de liberação do pagamento.

6. Devolvida - O *valor da transação foi devolvido para o comprador. Se você não possui mais o produto vendido em estoque, ou não pode por alguma razão prestar o serviço contratado, você pode devolver o valor da transação para o comprador. Esta também é a ação tomada quando uma disputa é resolvida em favor do comprador.
7. Cancelada - A transação foi cancelada sem ter sido finalizada. Quando o comprador opta por pagar com débito online ou boleto bancário e não finaliza o pagamento, a transação assume este status. Isso também ocorre quando o comprador escolhe pagar com um cartão de crédito e o pagamento não é aprovado pelo PagSeguro ou pela operadora.

8 Debitado - Chargeback (estorno) debitado após status Em retenção. O valor da transação foi devolvido para o comprador.
9 Em Retenção temporária / Em contestação - O comprador abriu uma solicitação de chargeback junto à operadora do cartão de crédito.


reference: https://dev.pagseguro.uol.com.br/docs/api-notificacao-v1

TAXAS:
Recebimento em 14 dias (Plano Atual):
4.99% à vista.
4.99% parcelado.
+ Valor fixo de R$ 0,40 por venda

p.e Para pagamento de R$ 100, tem taxa de R$ 5.99 (4.99% + R$ 0,40), sobra R$ 94.61

Recebimento em 30 dias:
2.19% à vista.
3.79% parcelado.

Valor mínimo por parcela: R$ 5,00.

Vendas com a bandeira Diners serão pagas somente em 30 dias.

Transferência para conta bancária
1 solicitação gratuita por dia.
A partir da 2ª solicitação no dia, será cobrada uma tarifa de R$ 3,50 por solicitação.

O PagSeguro trabalha com juros montantes compostos em relação a venda parcelada, no qual cobre juros sobre juros, conforme quantidade de parcelas.

O comprador pode pagar parcelado no cartão até 18 vezes.
Sendo as duas primeiras cobradas pelo vendedor e as demais para o comprador.
*/

const getPagseguroPay = (paidValue, options = {}) => {
    const { noFeeMonthlyInstallments = 2, totalInstallments = 1 } = options;

    const PERC_14_DAYS = 0.0499; // taxa de intermediação
    const FIXED_VALUE = 0.4;
    const INSTALLMENT_RATE = 0.0299; // Taxa de parcelamento vendedor 2,99% ao mês
    const PAID_BIZ_INSTALLMENT = 2;

    let installmentAmount = 0;
    let suggestPrice = paidValue;
    let monthlyInstallBizRate = 0;

    if (totalInstallments >= PAID_BIZ_INSTALLMENT) {
        const bizCharge = PAID_BIZ_INSTALLMENT - 1;
        monthlyInstallBizRate = getCompoundInterest(
            paidValue,
            bizCharge,
            INSTALLMENT_RATE
        );
        installmentAmount =
            getCompoundInterest(
                paidValue,
                totalInstallments - bizCharge,
                INSTALLMENT_RATE
            ) - monthlyInstallBizRate;
        suggestPrice = getSuggestPrice(paidValue, totalInstallments);
    }

    let rate = PERC_14_DAYS * paidValue + FIXED_VALUE + installmentAmount;

    const receivable = paidValue - rate;

    return {
        rate: rate.toFixed(2),
        monthlyInstallBizRate,
        receivable: receivable.toFixed(2),
        suggestPrice: suggestPrice.toFixed(2),
    };
};
// const simulation = getPagseguroPay(100, { totalInstallments: 18 });

module.exports = {
    checkout,
    transactions,
    boleto,
};

// exports.generateBoleto = (req, res) => {
//     //https://ws.pagseguro.uol.com.br/recurring-payment/boletos?email=__seu_email__
// // &token=__seu_token__
// }
