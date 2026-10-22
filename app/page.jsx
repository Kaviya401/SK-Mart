"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { Button, Typography } from "antd";
import CategoryTiles from "../components/CategoryTiles";
import { OffersStrip } from "../components/SiteHeader";
const { Title, Paragraph } = Typography;
export default function HomePage() {
  return _jsxs("main", {
    className: "page-shell home-page",
    children: [
      _jsxs("section", {
        className: "hero",
        children: [
          _jsxs("div", {
            className: "hero-copy",
            children: [
              _jsx("span", {
                className: "eyebrow",
                children: "A LITTLE MARKET WITH A LOT OF HEART",
              }),
              _jsxs(Title, {
                children: [
                  "Good things for",
                  _jsx("br", {}),
                  _jsx("em", { children: "everyday living." }),
                ],
              }),
              _jsx(Paragraph, {
                children:
                  "Farm-fresh vegetables, thoughtful home finds, and a friendly hello \u2014 all in one little village market.",
              }),
              _jsx(Link, {
                href: "/category/vegetables",
                children: _jsxs(Button, {
                  type: "primary",
                  size: "large",
                  children: [
                    "Shop fresh vegetables ",
                    _jsx("span", { "aria-hidden": "true", children: "\u2192" }),
                  ],
                }),
              }),
              _jsxs("div", {
                className: "hero-trust",
                children: [
                  _jsx("span", { children: "\uD83C\uDF3F Locally loved" }),
                  _jsx("span", { children: "\uD83E\uDDFA Carefully picked" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className: "hero-art",
            "aria-label": "A basket of fresh market vegetables",
            children: [
              _jsx("div", { className: "hero-sun" }),
              _jsxs("div", {
                className: "hero-basket",
                children: [
                  _jsx("span", { children: "\uD83E\uDD6C" }),
                  _jsx("span", { children: "\uD83C\uDF45" }),
                  _jsx("span", { children: "\uD83E\uDD55" }),
                  _jsx("span", { children: "\uD83E\uDDC5" }),
                  _jsx("span", { children: "\uD83E\uDD66" }),
                ],
              }),
              _jsxs("div", {
                className: "hero-sticker",
                children: ["Fresh", _jsx("br", {}), "every day!"],
              }),
              _jsx("div", { className: "hero-ground" }),
            ],
          }),
        ],
      }),
      _jsx(OffersStrip, {}),
      _jsxs("section", {
        className: "home-categories",
        children: [
          _jsxs("div", {
            className: "section-heading section-heading-left",
            children: [
              _jsx("span", { className: "eyebrow", children: "COME ON IN" }),
              _jsx(Title, { level: 2, children: "Find your market basket" }),
              _jsx(Paragraph, {
                children:
                  "Good things for the kitchen, home, and everyone in it.",
              }),
            ],
          }),
          _jsx(CategoryTiles, {}),
        ],
      }),
      _jsxs("section", {
        className: "home-callout",
        children: [
          _jsx("span", { children: "\uD83C\uDF3B" }),
          _jsxs("div", {
            children: [
              _jsx("strong", {
                children: "From our little market to your doorstep",
              }),
              _jsx("p", {
                children:
                  "Fresh picks, fair prices, and a free surprise when your basket reaches \u20B91000.",
              }),
            ],
          }),
          _jsx(Link, {
            href: "/category/vegetables",
            children: "Take a look \u2192",
          }),
        ],
      }),
    ],
  });
}
