import {Payment} from "src/modules/payment/entity/payment.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {OrderStatus} from "../enum/order.enum";
import {OrderItems} from "./order-items.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({type: "enum", enum: OrderStatus, default: OrderStatus.Pending})
  status: string;
  @Column()
  address: string;
  @Column({nullable: true})
  paymentId: number;
  @Column()
  final_amount: number;
  @Column()
  discount_amount: number;
  @Column()
  total_amount: number;
  @CreateDateColumn()
  created_at: Date;
  @OneToMany(() => OrderItems, (item) => item.orderId, {onDelete: "CASCADE"})
  items: OrderItems[];
  @OneToOne(() => Payment, (payment) => payment.order, {onDelete: "SET NULL"})
  @JoinColumn()
  payment: Payment;
}
