"use client";
import "@ant-design/v5-patch-for-react-19";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { ConfigProvider, App as AntApp } from "antd";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import {
  appActions,
  adminActions,
  cartActions,
  orderActions,
  productActions,
  userActions,
} from "../store/slices";
const STORAGE_KEY = "sk-mart-state";
const theme = {
  token: {
    colorPrimary: "#4CAF50",
    colorInfo: "#4CAF50",
    colorSuccess: "#4CAF50",
    colorWarning: "#FF9800",
    borderRadius: 16,
    fontFamily: "Arial, sans-serif",
    controlHeight: 44,
  },
  components: {
    Button: { borderRadius: 14, fontWeight: 700 },
    Card: { borderRadiusLG: 22 },
    Input: { borderRadius: 14 },
  },
};
export default function Providers({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) storeRef.current = makeStore();
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.products))
          storeRef.current?.dispatch(
            productActions.setProducts(saved.products),
          );
        if (saved.cart && typeof saved.cart === "object")
          storeRef.current?.dispatch(cartActions.setCart(saved.cart));
        if (saved.user)
          storeRef.current?.dispatch(userActions.setCustomer(saved.user));
        if (Array.isArray(saved.orders))
          storeRef.current?.dispatch(orderActions.setOrders(saved.orders));
        if (saved.admin === true)
          storeRef.current?.dispatch(adminActions.setAdminAuthenticated(true));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    storeRef.current.dispatch(appActions.setHydrated());
    const unsubscribe = storeRef.current.subscribe(() => {
      const state = storeRef.current.getState();
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          products: state.products,
          cart: state.cart,
          user: state.user,
          orders: state.orders,
          admin: state.admin,
        }),
      );
    });
    return unsubscribe;
  }, []);
  return _jsx(Provider, {
    store: storeRef.current,
    children: _jsx(ConfigProvider, {
      theme: theme,
      children: _jsx(AntApp, { children: children }),
    }),
  });
}
