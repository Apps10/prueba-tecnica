export class ProcessOrderDto {
  orderId: string
  amount: number
  emailHolder: string
  creditCard: {
    number: string,
    exp_month: string,
    exp_year: string
    cvc: string,
    card_holder: string
  }
}