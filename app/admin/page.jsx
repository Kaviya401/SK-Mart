"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  AppstoreOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { adminActions, orderActions, productActions } from "../../store/slices";
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const categoryOptions = [
  { value: "vegetables", label: "Vegetables" },
  { value: "girls-accessories", label: "Girls Accessories" },
  { value: "boys-accessories", label: "Boys Accessories" },
  { value: "home-items", label: "Home Items" },
  { value: "kitchen-items", label: "Kitchen Items" },
];
export default function AdminPage() {
  const authenticated = useAppSelector((state) => state.admin);
  const hydrated = useAppSelector((state) => state.app.hydrated);
  const products = useAppSelector((state) => state.products);
  const orders = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [section, setSection] = useState("products");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (hydrated && !authenticated) router.replace("/admin/login");
  }, [authenticated, hydrated, router]);
  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.total, 0),
    [orders],
  );
  const productColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name, product) =>
        _jsxs(Space, {
          children: [
            _jsx("img", {
              className: "admin-product-image",
              src: product.image,
              alt: "",
            }),
            name,
          ],
        }),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.replace(/-/g, " "),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, product) => `₹${price} / ${product.unit}`,
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (offer) =>
        offer
          ? _jsx(Tag, {
              color: "green",
              children: offer === "bogo" ? "Buy 1 Get 1" : "10% vegetables",
            })
          : "—",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) =>
        _jsxs(Space, {
          children: [
            _jsx(Button, {
              type: "link",
              onClick: () => openEdit(product),
              children: "Edit",
            }),
            _jsx(Popconfirm, {
              title: "Delete this product?",
              onConfirm: () =>
                dispatch(productActions.deleteProduct(product.id)),
              children: _jsx(Button, {
                type: "link",
                danger: true,
                children: "Delete",
              }),
            }),
          ],
        }),
    },
  ];
  const orderColumns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address", ellipsis: true },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) =>
        items.map((item) => `${item.name} × ${item.quantity}`).join(", "),
      ellipsis: true,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `₹${total.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, order) =>
        _jsx(Select, {
          value: status,
          style: { minWidth: 120 },
          options: ["Pending", "Packed", "Delivered"].map((value) => ({
            value,
            label: value,
          })),
          onChange: (value) =>
            dispatch(
              orderActions.updateOrderStatus({ id: order.id, status: value }),
            ),
        }),
    },
  ];
  function openEdit(product) {
    setEditing(product ?? null);
    form.resetFields();
    if (product) form.setFieldsValue(product);
    else
      form.setFieldsValue({
        category: "vegetables",
        unit: "piece",
        image: "/images/vegetables/tomato.svg",
      });
    setModalOpen(true);
  }
  function saveProduct(values) {
    const product = { ...values, id: editing?.id ?? `product-${Date.now()}` };
    dispatch(productActions.saveProduct(product));
    setModalOpen(false);
    messageApi.success(editing ? "Product updated" : "Product added");
  }
  if (!hydrated || !authenticated) return null;
  return _jsxs(Layout, {
    className: "admin-layout",
    children: [
      contextHolder,
      _jsxs(Sider, {
        breakpoint: "lg",
        collapsedWidth: "0",
        className: "admin-sider",
        children: [
          _jsx(Link, {
            href: "/",
            className: "admin-brand",
            children: "\uD83C\uDF3F SK Mart",
          }),
          _jsx(Menu, {
            theme: "light",
            mode: "inline",
            selectedKeys: [section],
            items: [
              {
                key: "products",
                icon: _jsx(AppstoreOutlined, {}),
                label: "Products",
                onClick: () => setSection("products"),
              },
              {
                key: "orders",
                icon: _jsx(ShoppingOutlined, {}),
                label: "Orders",
                onClick: () => setSection("orders"),
              },
            ],
          }),
          _jsx(Button, {
            className: "admin-logout",
            icon: _jsx(LogoutOutlined, {}),
            onClick: () => {
              dispatch(adminActions.setAdminAuthenticated(false));
              router.push("/admin/login");
            },
            children: "Sign out",
          }),
        ],
      }),
      _jsxs(Layout, {
        children: [
          _jsx(Header, {
            className: "admin-topbar",
            children: _jsxs("div", {
              children: [
                _jsx(Text, { type: "secondary", children: "SK MART OWNER" }),
                _jsx(Title, {
                  level: 4,
                  children:
                    section === "products"
                      ? "Market products"
                      : "Customer orders",
                }),
              ],
            }),
          }),
          _jsxs(Content, {
            className: "admin-content",
            children: [
              _jsxs("div", {
                className: "stats-grid",
                children: [
                  _jsx("div", {
                    className: "stat-card",
                    children: _jsx(Statistic, {
                      title: "Total orders",
                      value: orders.length,
                    }),
                  }),
                  _jsx("div", {
                    className: "stat-card",
                    children: _jsx(Statistic, {
                      title: "Revenue",
                      value: revenue,
                      prefix: "\u20B9",
                      precision: 2,
                    }),
                  }),
                  _jsx("div", {
                    className: "stat-card",
                    children: _jsx(Statistic, {
                      title: "Products",
                      value: products.length,
                    }),
                  }),
                ],
              }),
              _jsxs("div", {
                className: "admin-table-heading",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx(Title, {
                        level: 3,
                        children:
                          section === "products"
                            ? "Your products"
                            : "Recent orders",
                      }),
                      _jsx(Text, {
                        type: "secondary",
                        children:
                          section === "products"
                            ? "Keep your market shelf up to date."
                            : "Track each basket as it makes its way home.",
                      }),
                    ],
                  }),
                  section === "products" &&
                    _jsx(Button, {
                      type: "primary",
                      size: "large",
                      onClick: () => openEdit(),
                      children: "+ Add product",
                    }),
                ],
              }),
              _jsx("div", {
                className: "admin-table-wrap",
                children:
                  section === "products"
                    ? _jsx(Table, {
                        rowKey: "id",
                        columns: productColumns,
                        dataSource: products,
                        scroll: { x: 760 },
                        pagination: { pageSize: 8 },
                        locale: { emptyText: "No products found." },
                      })
                    : _jsx(Table, {
                        rowKey: "id",
                        columns: orderColumns,
                        dataSource: orders,
                        scroll: { x: 760 },
                        pagination: { pageSize: 8 },
                        locale: { emptyText: "No orders yet." },
                      }),
              }),
            ],
          }),
        ],
      }),
      _jsx(Modal, {
        title: editing ? "Edit product" : "Add a product",
        open: modalOpen,
        onCancel: () => setModalOpen(false),
        onOk: () => form.submit(),
        okText: "Save product",
        destroyOnClose: true,
        children: _jsxs(Form, {
          form: form,
          layout: "vertical",
          onFinish: saveProduct,
          children: [
            _jsx(Form.Item, {
              name: "name",
              label: "Product name",
              rules: [{ required: true }],
              children: _jsx(Input, {}),
            }),
            _jsx(Form.Item, {
              name: "category",
              label: "Category",
              rules: [{ required: true }],
              children: _jsx(Select, { options: categoryOptions }),
            }),
            _jsxs(Space, {
              className: "admin-form-row",
              align: "start",
              children: [
                _jsx(Form.Item, {
                  name: "price",
                  label: "Price (\u20B9)",
                  rules: [{ required: true }],
                  children: _jsx(InputNumber, { min: 1 }),
                }),
                _jsx(Form.Item, {
                  name: "unit",
                  label: "Unit",
                  rules: [{ required: true }],
                  children: _jsx(Input, { placeholder: "kg, piece, set..." }),
                }),
                _jsx(Form.Item, {
                  name: "offer",
                  label: "Offer",
                  children: _jsx(Select, {
                    allowClear: true,
                    options: [
                      { value: "bogo", label: "Buy 1 Get 1" },
                      { value: "vegetable10", label: "10% off vegetables" },
                    ],
                  }),
                }),
              ],
            }),
            _jsx(Form.Item, {
              name: "image",
              label: "Image path",
              rules: [{ required: true }],
              children: _jsx(Input, {
                placeholder: "/images/category/product.svg",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
