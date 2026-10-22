"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import { Button, Card, InputNumber, Tag, Typography, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAppDispatch } from "../store/hooks";
import { cartActions } from "../store/slices";
const { Text } = Typography;
export default function ProductCard({ product, index = 0 }) {
  const [quantity, setQuantity] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const add = () => {
    dispatch(cartActions.addToCart({ id: product.id, quantity }));
    messageApi.success(`${product.name} added to your basket`);
    setQuantity(1);
  };
  return _jsxs(_Fragment, {
    children: [
      contextHolder,
      _jsx(motion.div, {
        className: "product-motion",
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.38, delay: Math.min(index % 4, 3) * 0.045 },
        whileHover: { y: -5 },
        children: _jsxs(Card, {
          className: "product-card",
          cover: _jsx("div", {
            className: "product-picture",
            children: _jsx("img", {
              src: product.image,
              alt: product.name,
              loading: "lazy",
            }),
          }),
          children: [
            product.offer &&
              _jsx(Tag, {
                color: product.offer === "bogo" ? "orange" : "green",
                className: "offer-tag",
                children: product.offer === "bogo" ? "BUY 1 GET 1" : "10% OFF",
              }),
            _jsx("div", { className: "product-name", children: product.name }),
            _jsxs(Text, {
              className: "product-price",
              children: [
                "\u20B9",
                product.price,
                _jsxs("small", { children: [" / ", product.unit] }),
              ],
            }),
            _jsxs("div", {
              className: "product-actions",
              children: [
                _jsxs("div", {
                  className: "quantity-control",
                  children: [
                    _jsx(Button, {
                      size: "small",
                      shape: "circle",
                      icon: _jsx(MinusOutlined, {}),
                      "aria-label": `Reduce ${product.name} quantity`,
                      onClick: () =>
                        setQuantity((value) => Math.max(1, value - 1)),
                    }),
                    _jsx(InputNumber, {
                      size: "small",
                      min: 1,
                      controls: false,
                      value: quantity,
                      onChange: (value) => setQuantity(value ?? 1),
                      "aria-label": `${product.name} quantity`,
                    }),
                    _jsx(Button, {
                      size: "small",
                      shape: "circle",
                      icon: _jsx(PlusOutlined, {}),
                      "aria-label": `Increase ${product.name} quantity`,
                      onClick: () => setQuantity((value) => value + 1),
                    }),
                  ],
                }),
                _jsx(Button, {
                  type: "primary",
                  size: "large",
                  block: true,
                  onClick: add,
                  children: "Add to basket",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
