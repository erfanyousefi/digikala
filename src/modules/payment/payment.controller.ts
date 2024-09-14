import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {PaymentService} from "./payment.service";

class AddressDto {
  @ApiProperty()
  address: string;
}

@Controller("payment")
@ApiTags("Payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post()
  create(@Body() addressDto: AddressDto) {
    return this.paymentService.create(addressDto.address);
  }
  @Get("/")
  find() {
    return this.paymentService.find();
  }
  @Get("/verify")
  async verify(
    @Query("Authority") authority: string,
    @Query("Status") status: string,
    @Res() res: Response
  ) {
    const url = await this.paymentService.verify(authority, status);
    return res.redirect(url);
  }
}
