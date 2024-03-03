import * as CategoryController from './categories.api';
import * as PromotionTypeController from './promotion-type.api';
import * as SchoolGradeController from './school-grades.api';

export const API = {
  ...CategoryController,
  ...PromotionTypeController,
  ...SchoolGradeController,
};
