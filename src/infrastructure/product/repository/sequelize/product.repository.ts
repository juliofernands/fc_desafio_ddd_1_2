import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface {
    findbyName(name: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Product> {
        const producModel=await ProductModel.findOne({where: {id:id}});
        return new Product(producModel.id, producModel.name, producModel.price);
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price 
        })
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            },
        });
    }

    
    
}