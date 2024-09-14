import {Controller} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {OrderService} from "./order.service";

@Controller("order")
@ApiTags("order")
export class OrderController {
  constructor(private orderService: OrderService) {}
}
