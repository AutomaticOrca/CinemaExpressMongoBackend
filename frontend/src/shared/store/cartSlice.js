import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload); // 添加新的票
    },
    deleteItem(state, action) {
      // 根据 sessionId 和 ticketType 删除指定的票
      state.cart = state.cart.filter(
        (item) =>
          item.sessionId !== action.payload.sessionId ||
          item.ticketType !== action.payload.ticketType
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) =>
          item.sessionId === action.payload.sessionId &&
          item.ticketType === action.payload.ticketType
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) =>
          item.sessionId === action.payload.sessionId &&
          item.ticketType === action.payload.ticketType
      );
      if (item && item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityBySessionAndType =
  (sessionId, ticketType) => (state) =>
    state.cart.cart.find(
      (item) => item.sessionId === sessionId && item.ticketType === ticketType
    )?.quantity ?? 0;
