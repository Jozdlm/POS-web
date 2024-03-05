import * as CategoryController from './categories.api';
import * as PromotionTypeController from './promotion-type.api';
import * as SchoolGradeController from './school-grades.api';
import * as SessionController from './session.api';
import * as EducationalCenterController from './educational-center.api';
import * as QuotesController from './quotes.api';
import * as ProductController from './products.api';

export const API = {
  ...SessionController,
  ...CategoryController,
  ...PromotionTypeController,
  ...SchoolGradeController,
  ...EducationalCenterController,
  ...QuotesController,
  ...ProductController,
};
