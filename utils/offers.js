import { FREE_GIFT_THRESHOLD } from "../data/config";
export function calculateOffers(products, cart) {
  let subtotal = 0;
  let discount = 0;
  for (const [id, quantity] of Object.entries(cart)) {
    const product = products.find((item) => item.id === id);
    if (!product || quantity <= 0) continue;
    const lineTotal = product.price * quantity;
    subtotal += lineTotal;
    if (product.offer === "bogo") {
      discount += Math.floor(quantity / 2) * product.price;
    } else if (product.offer === "vegetable10") {
      discount += lineTotal * 0.1;
    }
  }
  const total = Math.max(0, subtotal - discount);
  const giftThreshold = FREE_GIFT_THRESHOLD + 0.01;
  return {
    subtotal,
    discount,
    total,
    qualifiesForGift: total > FREE_GIFT_THRESHOLD,
    amountToGift: Math.max(0, giftThreshold - total),
  };
}
