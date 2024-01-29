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
