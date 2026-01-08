import { CustomerRepository } from "../../../src/infrastructure/repositories/customerRepository";
import { OrderRepository } from "../../../src/infrastructure/repositories/orderRepository";
import { ProductRepository } from "../../../src/infrastructure/repositories/productRepository";

export function mockOrderRepo(): OrderRepository { 
    return { 
        findAll: jest.fn(), 
        findById: jest.fn(), 
        save: jest.fn(), 
    }; 
}

export function mockProductRepo(): ProductRepository {
    return {
        findAll: jest.fn(), 
        findById: jest.fn(), 
        save: jest.fn(), 
    }
}

export function mockCustomerRepo(): CustomerRepository {
    return {
        findAll: jest.fn(), 
        findById: jest.fn(), 
        save: jest.fn(),  
    }
}
