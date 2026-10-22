"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
const categories = [
  {
    slug: "vegetables",
    title: "Vegetables",
    note: "Fresh from the farm",
    image: "/images/vegetables/tomato.svg",
    color: "#e6f1d9",
  },
  {
    slug: "girls-accessories",
    title: "Girls Accessories",
    note: "Little colorful finds",
    image: "/images/girls-accessories/hair-band.svg",
    color: "#f9e4dd",
  },
  {
    slug: "boys-accessories",
    title: "Boys Accessories",
    note: "Ready for play",
    image: "/images/boys-accessories/toy-car.svg",
    color: "#e3edf1",
  },
  {
    slug: "home-items",
    title: "Home Items",
    note: "For a cozy home",
    image: "/images/home-items/broom.svg",
    color: "#f4ead6",
  },
  {
    slug: "kitchen-items",
    title: "Kitchen Items",
    note: "Happy kitchen days",
    image: "/images/kitchen-items/clay-pot.svg",
    color: "#f6e3d2",
  },
];
export default function CategoryTiles() {
  return _jsx("div", {
    className: "category-tiles",
    children: categories.map((category, index) =>
      _jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: index * 0.06 },
          whileHover: { y: -5 },
          children: _jsxs(Link, {
            href: `/category/${category.slug}`,
            className: "category-tile",
            style: { backgroundColor: category.color },
            children: [
              _jsx("div", {
                className: "category-image",
                children: _jsx("img", { src: category.image, alt: "" }),
              }),
              _jsxs("div", {
                children: [
                  _jsx("strong", { children: category.title }),
                  _jsx("span", { children: category.note }),
                ],
              }),
              _jsx(ArrowRightOutlined, { className: "category-arrow" }),
            ],
          }),
        },
        category.slug,
      ),
    ),
  });
}
