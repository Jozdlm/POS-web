import * as CategoryController from './categories.api';
import * as PromotionTypeController from './promotion-type.api';
import * as SchoolGradeController from './school-grades.api';
import * as SessionController from './session.api';
import * as EducationCenterController from './educational-center.api';

export const API = {
  ...SessionController,
  ...CategoryController,
  ...PromotionTypeController,
  ...SchoolGradeController,
  ...EducationCenterController,
};
