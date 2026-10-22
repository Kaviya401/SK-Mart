"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Col, Empty, Input, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../store/hooks";
const { Title, Paragraph } = Typography;
const titles = {
  vegetables: {
    title: "Fresh Vegetables",
    intro: "Picked with care from nearby farms, brought fresh to your table.",
  },
  "girls-accessories": {
    title: "Girls Accessories",
    intro: "Little everyday treats and colorful finds for little ones.",
  },
  "boys-accessories": {
    title: "Boys Accessories",
    intro: "Playtime favorites and useful little essentials.",
  },
  "home-items": {
    title: "Home Items",
    intro: "Simple helpers to make your home feel even more like home.",
  },
  "kitchen-items": {
    title: "Kitchen Items",
    intro: "Handy kitchen companions for the heart of your home.",
  },
};
export default function ProductGrid({ category }) {
  const [query, setQuery] = useState("");
  const products = useAppSelector((state) => state.products);
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === category &&
          product.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [products, category, query],
  );
  const copy = titles[category] ?? {
    title: "Market Finds",
    intro: "Lovely finds for your home.",
  };
  return _jsxs("main", {
    className: "page-shell category-page",
    children: [
      _jsxs("div", {
        className: "section-heading",
        children: [
          _jsx("span", {
            className: "eyebrow",
            children: "STRAIGHT FROM THE MARKET",
          }),
          _jsx(Title, { level: 1, children: copy.title }),
          _jsx(Paragraph, { children: copy.intro }),
        ],
      }),
      _jsx(Input.Search, {
        className: "product-search",
        placeholder: `Search ${copy.title.toLowerCase()}...`,
        allowClear: true,
        size: "large",
        prefix: _jsx(SearchOutlined, {}),
        value: query,
        onChange: (event) => setQuery(event.target.value),
        "aria-label": `Search ${copy.title}`,
      }),
      filtered.length
        ? _jsx(Row, {
            gutter: [20, 26],
            children: filtered.map((product, index) =>
              _jsx(
                Col,
                {
                  xs: 12,
                  sm: 8,
                  md: 6,
                  lg: 6,
                  xl: 4,
                  children: _jsx(ProductCard, {
                    product: product,
                    index: index,
                  }),
                },
                product.id,
              ),
            ),
          })
        : _jsx(Empty, { description: "No goodies found. Try another search." }),
    ],
  });
}
