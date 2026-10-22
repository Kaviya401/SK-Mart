import { createSlice } from "@reduxjs/toolkit";
import productsData from "../data/products.json";
const initialProducts = productsData;
const productsSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {
    setProducts: (_state, action) => action.payload,
    saveProduct: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index < 0) state.push(action.payload);
      else state[index] = action.payload;
    },
    deleteProduct: (state, action) =>
      state.filter((item) => item.id !== action.payload),
  },
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    setCart: (_state, action) => action.payload,
    addToCart: (state, action) => {
      state[action.payload.id] =
        (state[action.payload.id] ?? 0) + (action.payload.quantity ?? 1);
    },
    changeQuantity: (state, action) => {
      if (action.payload.quantity <= 0) delete state[action.payload.id];
      else state[action.payload.id] = action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      delete state[action.payload];
    },
    clearCart: () => ({}),
  },
});
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setCustomer: (_state, action) => action.payload,
  },
});
const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrders: (_state, action) => action.payload,
    addOrder: (state, action) => [action.payload, ...state],
    updateOrderStatus: (state, action) => {
      const order = state.find((item) => item.id === action.payload.id);
      if (order) order.status = action.payload.status;
    },
  },
});
const adminSlice = createSlice({
  name: "admin",
  initialState: false,
  reducers: {
    setAdminAuthenticated: (_state, action) => action.payload,
  },
});
const appSlice = createSlice({
  name: "app",
  initialState: { hydrated: false },
  reducers: {
    setHydrated: (state) => {
      state.hydrated = true;
    },
  },
});
export const productActions = productsSlice.actions;
export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const orderActions = ordersSlice.actions;
export const adminActions = adminSlice.actions;
export const appActions = appSlice.actions;
export const reducers = {
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer,
  admin: adminSlice.reducer,
  app: appSlice.reducer,
};
