import {ApiProperty} from "@nestjs/swagger";

export class AddDiscountToBasketDto {
  @ApiProperty()
  code: string;
}
