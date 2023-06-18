import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product} from '../types';
import { getProduct } from '../services/getProduct';
import { verifyStock } from '../services/veryStock';
import axios from 'axios';


interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });
  const addProduct = async (productId: number) => {
    
    try {
      const productExist = await getProduct(productId) 
      const stock = await verifyStock(productId)
      const productInCart = cart.find(product => product.id === productId)

      if(!productExist){
        throw new Error('Erro na adição do produto')
      }
      if(productInCart && stock && productInCart?.amount >= stock?.data.amount){
        throw new Error('Quantidade solicitada fora de estoque')
      }

      if(productExist && !productInCart){
        const product = {...productExist, amount: 1}
        setCart(state => [...state, product])
        localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart,{...product}]))
      }
      if(productInCart && stock && productInCart.amount <= stock.data.amount){
        const updatedCart = cart.map((product) => {
          if(product.id === productId){
            return {...product, amount: product.amount + 1}
          }
          return product
        })
        setCart(updatedCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
      }

    } catch (error){      
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}



