import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Basket} from "./entity/basket.entity";
import {BasketController} from "./basket.controller";
import {BasketService} from "./basket.service";
import {ProductModule} from "../product/product.module";
import {DiscountModule} from "../discount/discount.module";

@Module({
  imports: [ProductModule, DiscountModule, TypeOrmModule.forFeature([Basket])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
