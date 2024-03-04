import * as CategoryController from './categories.api';
import * as PromotionTypeController from './promotion-type.api';
import * as SchoolGradeController from './school-grades.api';
import * as SessionController from './session.api';

export const API = {
  ...SessionController,
  ...CategoryController,
  ...PromotionTypeController,
  ...SchoolGradeController,
};
