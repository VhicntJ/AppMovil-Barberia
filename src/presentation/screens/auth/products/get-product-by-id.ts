import { tesloApi } from 'src/config/api/tesloApi';
import { TesloProduct } from '../../../../infrastructure/interfaces/teslo-products.response';
import { ProductMapper } from 'src/infrastructure/interfaces/mappers/product.mapper';
import { Product } from 'src/domain/entities/product';

export const getProductById = async (id: string):Promise<Product> => {

    try{
        const {data} = await tesloApi.get<TesloProduct>(`/products/${id}`);

        return ProductMapper.tesloProductToEntity(data)

    } catch (error) {
        console.log(error);
        throw new Error(`Error al obtener el producto por id: ${id}`)
    }

}