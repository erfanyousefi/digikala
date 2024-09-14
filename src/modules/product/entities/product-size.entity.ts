import {Basket} from "src/modules/basket/entity/basket.entity";
import {OrderItems} from "src/modules/order/entity/order-items.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  productId: number;
  @Column()
  size: string;
  @Column()
  count: number;
  @Column({type: "decimal"})
  price: number;
  @Column({type: "decimal", default: 0})
  discount: number;
  @Column({default: false})
  active_discount: boolean;
  @ManyToOne(() => Product, (product) => product.sizes, {onDelete: "CASCADE"})
  product: Product;
  @OneToMany(() => Basket, (basket) => basket.size)
  baskets: Basket[];
  @OneToMany(() => OrderItems, (order) => order.size)
  orders: OrderItems[];
}
