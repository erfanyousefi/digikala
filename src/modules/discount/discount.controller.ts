import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {DiscountService} from "./discount.service";
import {CreateDiscountDto, UpdateDiscountDto} from "./dto/discount.dto";

@Controller("discount")
@ApiTags("discount")
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() discountDto: CreateDiscountDto) {
    return this.discountService.create(discountDto);
  }
  @Get()
  find() {
    return this.discountService.find();
  }
  @Put(":id")
  @ApiConsumes("application/x-www-form-urlencoded")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() discountDto: UpdateDiscountDto
  ) {
    return this.discountService.update(id, discountDto);
  }
  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.discountService.delete(id);
  }
}
