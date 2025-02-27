import { Sequelize } from 'sequelize-typescript';
import ProductModel from "./product.model";


import Product from '../../../../domain/product/entity/product';
import ProductRepository from './product.repository';

describe("Product repository test", () => {
    let sequelize: Sequelize; // Corrected variable name

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        
        sequelize.addModels([ProductModel]); // Corrected variable name
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close(); // Corrected variable name
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const producModel=await ProductModel.findOne({where:{id:"1"}});
        expect(producModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });

        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);
        const producModel2=await ProductModel.findOne({where:{id:"1"}});
        expect(producModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        });
    });
    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const producModel=await ProductModel.findOne({where:{id:"1"}});
        expect(producModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
        const product2 = await productRepository.find("1");
        expect(product2).toStrictEqual(product);

    });
    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product);
        await productRepository.create(product2);
        const producModel=await ProductModel.findAll();
        expect(producModel).toHaveLength(2);
    })
});