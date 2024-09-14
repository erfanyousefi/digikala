import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Order} from "../../order/entity/order.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  amount: number;
  @Column({default: false})
  status: boolean;
  @Column({unique: true})
  invoice_number: string;
  @Column({nullable: true})
  refId: string;
  @Column({nullable: true})
  authority: string;
  @Column({nullable: true})
  orderId: number;
  @CreateDateColumn()
  created_at: Date;
  @OneToOne(() => Order, (order) => order.payment, {onDelete: "CASCADE"})
  order: Order;
}
