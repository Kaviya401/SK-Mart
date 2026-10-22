"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Drawer,
  Empty,
  InputNumber,
  Space,
  Typography,
  message,
} from "antd";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions } from "../store/slices";
import { calculateOffers } from "../utils/offers";
import { FREE_GIFT } from "../data/config";
const { Text, Title } = Typography;
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [bounce, setBounce] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const cart = useAppSelector((state) => state.cart);
  const customer = useAppSelector((state) => state.user);
  const quantityTotal = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totals = calculateOffers(products, cart);
  const cartProducts = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === id),
      quantity,
    }))
    .filter((row) => Boolean(row.product));
  const add = (id) => {
    dispatch(cartActions.addToCart({ id }));
    setBounce(true);
    window.setTimeout(() => setBounce(false), 450);
    messageApi.success("Added to your basket!");
  };
  return _jsxs(_Fragment, {
    children: [
      contextHolder,
      _jsx("div", {
        className: "offer-marquee",
        "aria-label": "Current offers",
        children: _jsxs("div", {
          className: "marquee-track",
          children: [
            _jsx("span", { children: "\uD83C\uDF4A Buy 1 Get 1 Free" }),
            _jsx("span", { children: "\uD83E\uDD6C 10% off on vegetables" }),
            _jsx("span", {
              children: "\uD83C\uDF81 Free gift above \u20B91000",
            }),
            _jsx("span", { children: "\uD83C\uDF4A Buy 1 Get 1 Free" }),
            _jsx("span", { children: "\uD83E\uDD6C 10% off on vegetables" }),
            _jsx("span", {
              children: "\uD83C\uDF81 Free gift above \u20B91000",
            }),
          ],
        }),
      }),
      _jsx("header", {
        className: "site-header",
        children: _jsxs("div", {
          className: "header-inner",
          children: [
            _jsxs(Link, {
              href: "/",
              className: "brand",
              children: [
                _jsx("span", {
                  className: "brand-mark",
                  children: "\uD83C\uDF3F",
                }),
                _jsxs("span", {
                  children: [
                    _jsx("strong", { children: "SK Mart" }),
                    _jsx("small", { children: "Fresh from our village" }),
                  ],
                }),
              ],
            }),
            _jsxs("nav", {
              className: "desktop-nav",
              "aria-label": "Main navigation",
              children: [
                _jsx(Link, { href: "/", children: "Home" }),
                _jsx(Link, {
                  href: "/category/vegetables",
                  children: "Vegetables",
                }),
                _jsx(Link, {
                  href: "/category/kitchen-items",
                  children: "Kitchen",
                }),
              ],
            }),
            _jsxs(Space, {
              size: 12,
              children: [
                customer &&
                  path !== "/admin" &&
                  path !== "/admin/login" &&
                  _jsxs("span", {
                    className: "delivery-label",
                    children: [
                      _jsxs("span", {
                        className: "delivery-address",
                        children: ["Delivering to: ", customer.address],
                      }),
                      _jsx("button", {
                        type: "button",
                        className: "delivery-change",
                        onClick: () => router.push("/checkout"),
                        children: "Change",
                      }),
                    ],
                  }),
                _jsx(motion.div, {
                  animate: bounce ? { y: [0, -8, 0] } : { y: 0 },
                  transition: { duration: 0.35 },
                  children: _jsx(Badge, {
                    count: quantityTotal,
                    overflowCount: 99,
                    color: "#f28c28",
                    children: _jsx(Button, {
                      className: "cart-trigger",
                      shape: "circle",
                      size: "large",
                      "aria-label": "Open shopping basket",
                      icon: _jsx(ShoppingOutlined, {}),
                      onClick: () => setOpen(true),
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      _jsx(Drawer, {
        title: _jsx("span", {
          className: "drawer-title",
          children: "\uD83E\uDDFA Your Basket",
        }),
        placement: "right",
        width: Math.min(
          460,
          typeof window === "undefined" ? 460 : window.innerWidth,
        ),
        open: open,
        onClose: () => setOpen(false),
        footer: cartProducts.length
          ? _jsxs("div", {
              className: "basket-footer",
              children: [
                _jsxs("div", {
                  className: "basket-total-row",
                  children: [
                    _jsx(Text, { children: "Subtotal" }),
                    _jsxs(Text, {
                      children: ["\u20B9", totals.subtotal.toFixed(2)],
                    }),
                  ],
                }),
                totals.discount > 0 &&
                  _jsxs("div", {
                    className: "basket-total-row discount",
                    children: [
                      _jsx(Text, { children: "Offers" }),
                      _jsxs(Text, {
                        children: ["\u2212\u20B9", totals.discount.toFixed(2)],
                      }),
                    ],
                  }),
                _jsxs("div", {
                  className: "basket-total-row",
                  children: [
                    _jsx(Text, { children: "Free gift" }),
                    _jsx(Text, {
                      children: totals.qualifiesForGift ? FREE_GIFT.name : "—",
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "basket-total-row total",
                  children: [
                    _jsx(Text, { strong: true, children: "Total" }),
                    _jsxs(Text, {
                      strong: true,
                      children: ["\u20B9", totals.total.toFixed(2)],
                    }),
                  ],
                }),
                customer &&
                  _jsxs(Text, {
                    type: "secondary",
                    className: "basket-address",
                    children: ["Delivering to: ", customer.address],
                  }),
                _jsxs(Button, {
                  type: "primary",
                  block: true,
                  size: "large",
                  onClick: () => {
                    setOpen(false);
                    router.push("/checkout");
                  },
                  children: [
                    "Place Order \u00B7 \u20B9",
                    totals.total.toFixed(2),
                  ],
                }),
              ],
            })
          : null,
        children:
          cartProducts.length === 0
            ? _jsx(Empty, { description: "Your basket is waiting for goodies" })
            : _jsxs(_Fragment, {
                children: [
                  _jsxs("div", {
                    className: "gift-progress",
                    children: [
                      _jsx(Text, {
                        children: totals.qualifiesForGift
                          ? "Your free gift is in the basket! 🎁"
                          : `Add ₹${totals.amountToGift.toFixed(0)} more to get a free gift`,
                      }),
                      _jsx("div", {
                        className: "progress-track",
                        children: _jsx("span", {
                          style: {
                            width: `${Math.min(100, (totals.total / 1000.01) * 100)}%`,
                          },
                        }),
                      }),
                    ],
                  }),
                  totals.qualifiesForGift &&
                    _jsxs("div", {
                      className: "gift-line",
                      children: [
                        _jsx("img", {
                          src: FREE_GIFT.image,
                          alt: "Free surprise gift",
                        }),
                        _jsx("span", { children: FREE_GIFT.name }),
                        _jsx("strong", { children: "FREE" }),
                      ],
                    }),
                  _jsx("div", {
                    className: "basket-items",
                    children: cartProducts.map(({ product, quantity }) =>
                      _jsxs(
                        "div",
                        {
                          className: "basket-item",
                          children: [
                            _jsx("img", {
                              src: product.image,
                              alt: product.name,
                            }),
                            _jsxs("div", {
                              className: "basket-item-info",
                              children: [
                                _jsx(Text, {
                                  strong: true,
                                  children: product.name,
                                }),
                                _jsxs(Text, {
                                  type: "secondary",
                                  children: [
                                    "\u20B9",
                                    product.price,
                                    " / ",
                                    product.unit,
                                  ],
                                }),
                                _jsxs(Space, {
                                  size: 4,
                                  children: [
                                    _jsx(Button, {
                                      size: "small",
                                      shape: "circle",
                                      icon: _jsx(MinusOutlined, {}),
                                      "aria-label": `Decrease ${product.name}`,
                                      onClick: () =>
                                        dispatch(
                                          cartActions.changeQuantity({
                                            id: product.id,
                                            quantity: quantity - 1,
                                          }),
                                        ),
                                    }),
                                    _jsx(InputNumber, {
                                      size: "small",
                                      min: 1,
                                      controls: false,
                                      value: quantity,
                                      onChange: (value) =>
                                        value &&
                                        dispatch(
                                          cartActions.changeQuantity({
                                            id: product.id,
                                            quantity: value,
                                          }),
                                        ),
                                    }),
                                    _jsx(Button, {
                                      size: "small",
                                      shape: "circle",
                                      icon: _jsx(PlusOutlined, {}),
                                      "aria-label": `Increase ${product.name}`,
                                      onClick: () => add(product.id),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            _jsxs("div", {
                              className: "basket-item-end",
                              children: [
                                _jsxs(Text, {
                                  strong: true,
                                  children: [
                                    "\u20B9",
                                    (product.price * quantity).toFixed(2),
                                  ],
                                }),
                                _jsx(Button, {
                                  type: "text",
                                  danger: true,
                                  icon: _jsx(DeleteOutlined, {}),
                                  "aria-label": `Remove ${product.name}`,
                                  onClick: () =>
                                    dispatch(
                                      cartActions.removeFromCart(product.id),
                                    ),
                                }),
                              ],
                            }),
                          ],
                        },
                        product.id,
                      ),
                    ),
                  }),
                ],
              }),
      }),
    ],
  });
}
export function OffersStrip() {
  return _jsx("div", {
    className: "offer-note",
    children:
      "\uD83C\uDF31 Market fresh \u2022 Fair prices \u2022 Delivered with care",
  });
}
