import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {BasketService} from "./basket.service";
import {AddDiscountToBasketDto} from "./dto/discount.dto";
import {BasketDto} from "./dto/product.dto";

@Controller("basket")
@ApiTags("Basket")
export class BasketController {
  constructor(private basketService: BasketService) {}
  @Get()
  basket() {
    return this.basketService.getBasket();
  }
  @Post("/add")
  addToBasket(@Body() basketDto: BasketDto) {
    return this.basketService.addToBasket(basketDto);
  }
  @Post("/add-discount")
  addDiscountToBasket(@Body() discountDto: AddDiscountToBasketDto) {
    return this.basketService.addCodeToBasket(discountDto);
  }
  @Delete("/remove")
  removeFromBasket(@Body() basketDto: BasketDto) {
    return this.basketService.removeFromBasket(basketDto);
  }
  @Delete("/remove/:id")
  removeFromBasketById(@Param("id", ParseIntPipe) id: number) {
    return this.basketService.removeFromBasketById(id);
  }
  @Delete("/remove-discount")
  removeDiscountFromBasket(@Body() discountDto: AddDiscountToBasketDto) {
    return this.basketService.removeCodeFromBasket(discountDto);
  }
}
