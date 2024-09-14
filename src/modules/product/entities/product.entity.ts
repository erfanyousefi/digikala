import {Basket} from "src/modules/basket/entity/basket.entity";
import {OrderItems} from "src/modules/order/entity/order-items.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {ProductType} from "../enum/type.enum";
import {ProductColor} from "./product-color.entity";
import {ProductDetail} from "./product-detail.entity";
import {ProductSize} from "./product-size.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  slug: string;
  @Column()
  code: string;
  @Column({enum: ProductType})
  type: string;
  @Column({default: 0})
  count: number;
  @Column({type: "decimal", nullable: true})
  price: number;
  @Column({type: "decimal", nullable: true, default: 0})
  discount: number;
  @Column({nullable: true, default: false})
  active_discount: boolean;
  @CreateDateColumn()
  created_at: Date;
  @OneToMany(() => ProductDetail, (detail) => detail.product)
  details: ProductDetail[];
  @OneToMany(() => ProductColor, (color) => color.product)
  colors: ProductColor[];
  @OneToMany(() => ProductSize, (size) => size.product)
  sizes: ProductSize[];
  @OneToMany(() => Basket, (basket) => basket.discount)
  baskets: Basket[];
  @OneToMany(() => OrderItems, (order) => order.product)
  orders: OrderItems[];
}
