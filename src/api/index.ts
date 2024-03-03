import * as CategoryController from './categories.api';
import * as PromotionTypeController from './promotion-type.api';

export const API = {
  ...CategoryController,
  ...PromotionTypeController,
};
