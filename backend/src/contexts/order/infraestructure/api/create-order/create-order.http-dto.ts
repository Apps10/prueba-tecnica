
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "src/contexts/order/application/shared/dto/order-item.dto";


export class CreateOrderHttpDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true}) //validar cada elemento del  array
    @Type(()=> OrderItemDto)
    items: OrderItemDto[] 
}
