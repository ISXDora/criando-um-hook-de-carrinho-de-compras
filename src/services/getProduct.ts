import axios from "axios";
import { Product } from "../types";
import { api } from "./api";
import { toast } from "react-toastify";


export const getProduct = async (id: number) => {
   try {

    const {data} = await api.get<Product>(`/products/${id}`)
  
    return data
  
    
   } catch (error) {

    if(axios.isAxiosError(error)){
          toast.error('Erro na adição do produto')
         throw error
    }else if(error instanceof Error){
         throw error
    }
    
   }
}
