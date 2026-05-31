import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number | string;
  price: number;
  quantity?: number;
  [key: string]: any;
}

interface ItemState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: ItemState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice = Number(
        (
          state.totalPrice + Number(product.price)
        ).toFixed(2)
      );
    },

    removeFromCart: (
      state,
      action: PayloadAction<number | string>
    ) => {
      const id = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );
      if (!existingItem) return;
      state.totalQuantity -= 1;
      state.totalPrice = Number(
        (
          state.totalPrice -
          Number(existingItem.price)
        ).toFixed(2)
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.quantity! -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;