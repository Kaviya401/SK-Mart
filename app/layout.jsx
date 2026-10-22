import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "../components/Providers";
import SiteHeader from "../components/SiteHeader";
import "./globals.css";
export const metadata = {
  title: "SK Mart — Fresh from our village",
  description: "A little village market for your home, pantry and kitchen.",
};
export default function RootLayout({ children }) {
  return _jsx("html", {
    lang: "en",
    "data-scroll-behavior": "smooth",
    children: _jsx("body", {
      children: _jsx(AntdRegistry, {
        children: _jsxs(Providers, {
          children: [
            _jsx(SiteHeader, {}),
            children,
            _jsxs("footer", {
              className: "site-footer",
              children: [
                "Made with care at SK Mart ",
                _jsx("span", { children: "\uD83C\uDF3C" }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}
