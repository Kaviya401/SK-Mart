"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Result, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartActions, orderActions, userActions } from "../store/slices";
import { calculateOffers } from "../utils/offers";
const { Title, Text } = Typography;
export default function CheckoutForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [profileOpen, setProfileOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const customer = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.products);
  const cart = useAppSelector((state) => state.cart);
  const totals = useMemo(
    () => calculateOffers(products, cart),
    [products, cart],
  );
  const items = Object.entries(cart).flatMap(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return product ? [{ product, quantity }] : [];
  });
  const addressLabel = customer?.address ?? "";
  useEffect(() => {
    if (!customer && items.length > 0) setProfileOpen(true);
  }, [customer, items.length]);
  const showProfile = () => {
    if (customer) form.setFieldsValue(customer);
    setProfileOpen(true);
  };
  const saveCustomer = (values) => {
    const cleaned = {
      phone: values.phone,
      address: customer
        ? (values.address ?? "")
        : [values.name, values.street, values.area, values.city, values.pincode]
            .filter(Boolean)
            .join(", "),
    };
    dispatch(userActions.setCustomer(cleaned));
    setProfileOpen(false);
    if (!customer && items.length > 0) placeOrder(cleaned);
    return cleaned;
  };
  const placeOrder = (customerOverride = customer) => {
    if (!customerOverride) {
      setProfileOpen(true);
      return;
    }
    if (items.length === 0) {
      messageApi.warning("Add something to your basket first.");
      return;
    }
    const order = {
      id: `SK${Date.now().toString().slice(-8)}`,
      phone: customerOverride.phone,
      address: customerOverride.address,
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        quantity,
        price: product.price,
      })),
      total: totals.total,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };
    dispatch(orderActions.addOrder(order));
    dispatch(cartActions.clearCart());
    setPlacedOrder(order);
    window.localStorage.setItem("sk-mart-last-order", JSON.stringify(order));
  };
  if (placedOrder) {
    return _jsxs("main", {
      className: "page-shell",
      children: [
        contextHolder,
        _jsx(Result, {
          status: "success",
          title: "Your order is on its way!",
          subTitle: _jsxs("span", {
            children: [
              "Order ID: ",
              _jsx("strong", { children: placedOrder.id }),
              " \u00B7 Delivering to ",
              placedOrder.address,
            ],
          }),
          extra: _jsx(Button, {
            type: "primary",
            size: "large",
            onClick: () => router.push("/"),
            children: "Back to the market",
          }),
        }),
      ],
    });
  }
  return _jsxs("main", {
    className: "page-shell checkout-page",
    children: [
      contextHolder,
      _jsxs("section", {
        className: "checkout-card",
        children: [
          _jsx("span", { className: "eyebrow", children: "ONE LAST STEP" }),
          _jsx(Title, { level: 1, children: "Review your basket" }),
          items.length === 0
            ? _jsxs("div", {
                className: "empty-checkout",
                children: [
                  _jsx(Text, { children: "Your basket is empty." }),
                  _jsx(Button, {
                    type: "primary",
                    onClick: () => router.push("/"),
                    children: "Browse the market",
                  }),
                ],
              })
            : items.map(({ product, quantity }) =>
                _jsxs(
                  "div",
                  {
                    className: "checkout-item",
                    children: [
                      _jsxs("span", {
                        children: [product.name, " \u00D7 ", quantity],
                      }),
                      _jsxs("strong", {
                        children: [
                          "\u20B9",
                          (product.price * quantity).toFixed(2),
                        ],
                      }),
                    ],
                  },
                  product.id,
                ),
              ),
          totals.discount > 0 &&
            _jsxs("div", {
              className: "checkout-item discount",
              children: [
                _jsx("span", { children: "Offer savings" }),
                _jsxs("strong", {
                  children: ["\u2212\u20B9", totals.discount.toFixed(2)],
                }),
              ],
            }),
          totals.qualifiesForGift &&
            _jsxs("div", {
              className: "checkout-item",
              children: [
                _jsx("span", { children: "\uD83C\uDF81 Surprise Market Gift" }),
                _jsx("strong", { children: "FREE" }),
              ],
            }),
          _jsxs("div", {
            className: "checkout-total",
            children: [
              _jsx("span", { children: "Total" }),
              _jsxs("strong", {
                children: ["\u20B9", totals.total.toFixed(2)],
              }),
            ],
          }),
          customer
            ? _jsxs("div", {
                className: "delivery-box",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx(Text, { strong: true, children: "Delivering to:" }),
                      _jsx("div", { children: addressLabel }),
                      _jsxs(Text, {
                        type: "secondary",
                        children: ["+91 ", customer.phone],
                      }),
                    ],
                  }),
                  _jsx(Button, {
                    type: "link",
                    onClick: showProfile,
                    children: "Change",
                  }),
                ],
              })
            : _jsxs("div", {
                className: "delivery-box",
                children: [
                  _jsx(Text, {
                    children: "Add your delivery details to continue.",
                  }),
                  _jsx(Button, {
                    type: "link",
                    onClick: showProfile,
                    children: "Add details",
                  }),
                ],
              }),
          _jsx(Button, {
            type: "primary",
            size: "large",
            block: true,
            disabled: items.length === 0,
            onClick: () => placeOrder(),
            children: "Place Order",
          }),
        ],
      }),
      _jsx(Modal, {
        title: "Where should we deliver?",
        open: profileOpen,
        onCancel: () => setProfileOpen(false),
        footer: null,
        destroyOnHidden: true,
        children: _jsxs(Form, {
          form: form,
          layout: "vertical",
          onFinish: saveCustomer,
          initialValues: customer ?? undefined,
          children: [
            _jsx(Form.Item, {
              name: "phone",
              label: "Phone number",
              rules: [
                { required: true, message: "Enter your phone number" },
                {
                  pattern: /^\d{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              ],
              children: _jsx(Input, {
                inputMode: "numeric",
                maxLength: 10,
                prefix: "+91",
                placeholder: "10-digit mobile number",
              }),
            }),
            !customer &&
              _jsxs(_Fragment, {
                children: [
                  _jsx(Form.Item, {
                    name: "name",
                    label: "Name",
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Enter your name",
                      },
                    ],
                    children: _jsx(Input, { placeholder: "Your name" }),
                  }),
                  _jsx(Form.Item, {
                    name: "street",
                    label: "House / street",
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Enter your house or street",
                      },
                    ],
                    children: _jsx(Input, {
                      placeholder: "House number and street",
                    }),
                  }),
                  _jsx(Form.Item, {
                    name: "area",
                    label: "Area",
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Enter your area",
                      },
                    ],
                    children: _jsx(Input, { placeholder: "Area or locality" }),
                  }),
                  _jsx(Form.Item, {
                    name: "city",
                    label: "City",
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Enter your city",
                      },
                    ],
                    children: _jsx(Input, { placeholder: "City" }),
                  }),
                  _jsx(Form.Item, {
                    name: "pincode",
                    label: "Pincode",
                    rules: [
                      {
                        required: true,
                        pattern: /^\d{6}$/,
                        message: "Enter a valid 6-digit pincode",
                      },
                    ],
                    children: _jsx(Input, {
                      inputMode: "numeric",
                      maxLength: 6,
                      placeholder: "6-digit pincode",
                    }),
                  }),
                ],
              }),
            customer &&
              _jsx(Form.Item, {
                name: "address",
                label: "Delivery address",
                rules: [
                  { required: true, message: "Enter your delivery address" },
                ],
                children: _jsx(Input.TextArea, { rows: 3 }),
              }),
            _jsx(Button, {
              type: "primary",
              size: "large",
              block: true,
              htmlType: "submit",
              children: customer ? "Save changes" : "Save and continue",
            }),
          ],
        }),
      }),
    ],
  });
}
