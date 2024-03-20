import { QuotationItem } from './quotation-item';

function getItemIndex(array: QuotationItem[], equalsTo: number): number {
  const index = array.findIndex((el) => el.productId == equalsTo);

  if (index === -1) {
    throw new Error("The quote item doesn't exist on the provided array");
  }

  return index;
}

export function increaseItemQty(
  array: QuotationItem[],
  productId: number,
): QuotationItem[] {
  const itemIndex = getItemIndex(array, productId);
  const currItem = array[itemIndex];

  currItem.quantity = currItem.quantity + 1;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  array[itemIndex] = currItem;
  return [...array];
}

export function decreaseItemQty(
  array: QuotationItem[],
  productId: number,
): QuotationItem[] {
  const itemIndex = getItemIndex(array, productId);
  const currItem = array[itemIndex];
  const { quantity } = currItem;

  currItem.quantity = quantity > 1 ? quantity - 1 : quantity;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  array[itemIndex] = currItem;
  return [...array];
}

export function updateItemPrice(
  array: QuotationItem[],
  productId: number,
  newPrice: number,
): QuotationItem[] {
  const itemIndex = getItemIndex(array, productId);
  const currItem = array[itemIndex];

  currItem.price = newPrice > 0.01 ? newPrice : currItem.price;
  currItem.ammount = currItem.quantity * (currItem.price - currItem.discount);

  array[itemIndex] = currItem;
  return [...array];
}

export function addItemDiscount(item: QuotationItem): QuotationItem {
  const discount = item.ammount * 0.1;
  const ammount = item.ammount - discount;

  return {
    ...item,
    discount,
    ammount,
  };
}

export function removeItemDiscount(item: QuotationItem): QuotationItem {
  const discount = 0;
  const ammount = item.quantity * item.price;

  return {
    ...item,
    discount,
    ammount,
  };
}
