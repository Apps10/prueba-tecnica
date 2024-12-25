import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator"
class CreditCard {
    @IsString()
    @IsNotEmpty()
    number: string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    exp_month: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(2)
    exp_year: string
    
    @IsNotEmpty()
    @IsString()
    cvc: string
    
    @IsString()
    @MaxLength(30)
    card_holder:string
  }

export class ProcessOrderHttpDto {
    @IsString()
    @IsNotEmpty()
    // @IsUUID()
    orderId: string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @Type(()=>CreditCard)
    @ValidateNested()
    creditCard: CreditCard
    
    @IsString()
    @IsNotEmpty()
    emailHolder: string
}