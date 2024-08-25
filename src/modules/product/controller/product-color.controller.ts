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
import {AddColorDto, UpdateColorDto} from "../dto/color.dto";
import {ProductColorService} from "../service/product-color.service";

@Controller("product-color")
@ApiTags("Product-color")
export class ProductColorController {
  constructor(private productColorService: ProductColorService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() colorDto: AddColorDto) {
    return this.productColorService.create(colorDto);
  }
  @Get("/product/:productId")
  find(@Param("productId", ParseIntPipe) productId: number) {
    return this.productColorService.find(productId);
  }
  @Put("/:id")
  @ApiConsumes("application/x-www-form-urlencoded")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() colorDto: UpdateColorDto
  ) {
    return this.productColorService.update(id, colorDto);
  }
  @Delete("/:id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.productColorService.delete(id);
  }
}
