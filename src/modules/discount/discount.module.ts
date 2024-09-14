import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Discount} from "./entity/discount.entity";
import {ProductModule} from "../product/product.module";
import {DiscountController} from "./discount.controller";
import {DiscountService} from "./discount.service";

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService, TypeOrmModule],
})
export class DiscountModule {}
