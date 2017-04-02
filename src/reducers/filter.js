import { SET_FILTER,
  FORECAST_TYPES_FILTER_ID,
  FORECAST_SORT_ID,
  FORECAST_CATEGORY_SORT_ID,
  SANPSHOTS_SORT_KEY,
  MEDIA_ITEM_PAGE_SORT_KEY,
  COLUMN_SORT_KEY,
  ASSESSMENTS_SORT_KEY,
  CREATED_SORT_ID,
  THEMES_SORT_ID,
  THEME_SORT_ID } from '../constants';

const initialState = {
  [FORECAST_TYPES_FILTER_ID]: [],
  [FORECAST_SORT_ID]: 'type',
  [FORECAST_CATEGORY_SORT_ID]: 'DESC',
  [ASSESSMENTS_SORT_KEY]: 'DESC',
  [SANPSHOTS_SORT_KEY]: 'DESC',
  [MEDIA_ITEM_PAGE_SORT_KEY]: 'DESC',
  [COLUMN_SORT_KEY]: 'DESC',
  [CREATED_SORT_ID]: 'DESC',
  [THEMES_SORT_ID]: 'DESC',
  [THEME_SORT_ID]: 'DESC',
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
