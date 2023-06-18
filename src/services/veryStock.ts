import axios from "axios";
import { Stock } from "../types";
import { api } from "./api";

export const verifyStock = async (id: number) => {
    
    try {
        const data = await api.get<Stock>(`/stock/${id}`)
        return data
        
    } catch (error) {
        if(axios.isAxiosError(error)){
             throw error
        }else if(error instanceof Error){
             throw error
        }
    }

}
