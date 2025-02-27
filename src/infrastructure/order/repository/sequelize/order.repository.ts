
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import { OrderModel } from "./order.model"

import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";


function orderItemModelToOrderItem(orderItemModel: OrderItemModel) {
	return new OrderItem(orderItemModel.id,  orderItemModel.name, orderItemModel.price,orderItemModel.product_id, orderItemModel.quantity);
}
export default class OrderRepository implements OrderRepositoryInterface {
  

  async update(entity: Order): Promise<void> {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total,
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            product_id: item.productId,
          })),
          
        
      },
      {
        where: {
          id: entity.id,
        },
      }
      );
    }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
      include: [{ model: OrderItemModel }],
    });
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    if (!orderModels) {
      return [];
    }

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }
}
