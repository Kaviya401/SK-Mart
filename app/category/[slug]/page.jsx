import { jsx as _jsx } from "react/jsx-runtime";
import { notFound } from "next/navigation";
import ProductGrid from "../../../components/ProductGrid";
const categories = [
  "vegetables",
  "girls-accessories",
  "boys-accessories",
  "home-items",
  "kitchen-items",
];
export function generateStaticParams() {
  return categories.map((slug) => ({ slug }));
}
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  if (!categories.includes(slug)) notFound();
  return _jsx(ProductGrid, { category: slug });
}
