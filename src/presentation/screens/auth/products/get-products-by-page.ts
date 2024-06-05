import { tesloApi } from "../../../../config/api/tesloApi"
import { ProductMapper } from "../../../../infrastructure/interfaces/mappers/product.mapper";
import type { TesloProduct } from "../../../../infrastructure/interfaces/teslo-products.response"



export const getProductsByPage = async (page: number, limit: number = 20) => {

    try {

        const {data} = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * 10}&limit=${limit }`);

        const products = data.map(ProductMapper.tesloProductToEntity);
        console.log(products[0])
        return products;
        
    } catch(error){
        console.log(error)
        throw new Error('Error getting products')

    }

};