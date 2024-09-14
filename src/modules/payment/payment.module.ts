import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BasketService} from "../basket/basket.service";
import {Basket} from "../basket/entity/basket.entity";
import {DiscountModule} from "../discount/discount.module";
import {HttpApiModule} from "../http/http.module";
import {OrderItems} from "../order/entity/order-items.entity";
import {Order} from "../order/entity/order.entity";
import {ProductModule} from "../product/product.module";
import {Payment} from "./entity/payment.entity";
import {PaymentController} from "./payment.controller";
import {PaymentService} from "./payment.service";

@Module({
  imports: [
    ProductModule,
    DiscountModule,
    HttpApiModule,
    TypeOrmModule.forFeature([Payment, Basket, Order, OrderItems]),
  ],
  controllers: [PaymentController],
  providers: [BasketService, PaymentService],
  exports: [],
})
export class PaymentModule {}
