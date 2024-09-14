import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";
import {ProductColor} from "src/modules/product/entities/product-color.entity";
import {ProductSize} from "src/modules/product/entities/product-size.entity";
import {Product} from "src/modules/product/entities/product.entity";

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  orderId: number;
  @Column()
  productId: number;
  @Column({nullable: true})
  colorId: number;
  @Column({nullable: true})
  sizeId: number;
  @Column({nullable: true})
  count: number;
  
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;
  @ManyToOne(() => ProductSize, (size) => size.orders)
  size: ProductSize;
  @ManyToOne(() => ProductColor, (color) => color.orders)
  color: ProductColor;
}
