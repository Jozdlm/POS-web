import { QuotationItem } from './models/quotation-item';

export function increaseItemQty(
  array: QuotationItem[],
  productId: number,
): QuotationItem[] {
  const itemIndex = array.findIndex((el) => el.productId == productId);

  if (itemIndex === -1) {
    throw new Error("The quote item doesn't exist on the provided array");
  }

  const currItem = array[itemIndex];

  currItem.quantity = currItem.quantity + 1;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  const newArr = [...array];
  newArr[itemIndex] = currItem;

  return newArr;
}

export function decreaseItemQty(
  array: QuotationItem[],
  productId: number,
): QuotationItem[] {
  const itemIndex = array.findIndex((el) => el.productId == productId);

  if (itemIndex === -1) {
    throw new Error("The quote item doesn't exist on the provided array");
  }

  const currItem = array[itemIndex];
  const { quantity } = currItem;

  currItem.quantity = quantity > 1 ? quantity - 1 : quantity;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  const newArr = [...array];
  newArr[itemIndex] = currItem;

  return newArr;
}

export function updateItemPrice(
  array: QuotationItem[],
  productId: number,
  newPrice: number,
): QuotationItem[] {
  const itemIndex = array.findIndex((el) => el.productId == productId);

  if (itemIndex === -1) {
    throw new Error("The quote item doesn't exist on the provided array");
  }

  const currItem = array[itemIndex];

  currItem.price = newPrice > 0.01 ? newPrice : currItem.price;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  const newArr = [...array];
  newArr[itemIndex] = currItem;

  return newArr;
}
