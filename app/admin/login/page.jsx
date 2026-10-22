"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS } from "../../../data/config";
import { useAppDispatch } from "../../../store/hooks";
import { adminActions } from "../../../store/slices";
const { Title, Text } = Typography;
export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  return _jsxs("main", {
    className: "admin-login-page",
    children: [
      contextHolder,
      _jsxs(Card, {
        className: "admin-login-card",
        children: [
          _jsx("span", { className: "eyebrow", children: "SK MART OWNER" }),
          _jsx(Title, { level: 2, children: "Welcome back" }),
          _jsx(Text, {
            type: "secondary",
            children: "Sign in to tend your little market.",
          }),
          _jsxs(Form, {
            layout: "vertical",
            className: "admin-login-form",
            onFinish: (values) => {
              if (
                values.username === ADMIN_CREDENTIALS.username &&
                values.password === ADMIN_CREDENTIALS.password
              ) {
                dispatch(adminActions.setAdminAuthenticated(true));
                router.push("/admin");
              } else {
                messageApi.error(
                  "Those login details don't match. Please try again.",
                );
              }
            },
            children: [
              _jsx(Form.Item, {
                name: "username",
                label: "Username",
                rules: [{ required: true }],
                children: _jsx(Input, {
                  prefix: _jsx(UserOutlined, {}),
                  placeholder: "Username",
                  autoComplete: "username",
                }),
              }),
              _jsx(Form.Item, {
                name: "password",
                label: "Password",
                rules: [{ required: true }],
                children: _jsx(Input.Password, {
                  prefix: _jsx(LockOutlined, {}),
                  placeholder: "Password",
                  autoComplete: "current-password",
                }),
              }),
              _jsx(Button, {
                type: "primary",
                size: "large",
                block: true,
                htmlType: "submit",
                children: "Sign in",
              }),
            ],
          }),
          _jsx(Link, {
            className: "back-home",
            href: "/",
            children: "\u2190 Back to SK Mart",
          }),
        ],
      }),
    ],
  });
}
