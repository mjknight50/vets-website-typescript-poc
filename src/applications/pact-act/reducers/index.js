import {
  PAW_UPDATE_BURN_PIT_2_1,
  PAW_UPDATE_SERVICE_PERIOD,
  PAW_VIEWED_INTRO_PAGE,
  PAW_VIEWED_RESULTS_PAGE_1,
} from '../constants';
import { SHORT_NAME_MAP } from '../utilities/question-data-map';

export const createFormStore = shortNameMap => {
  const storeObject = {};

  for (const question of Object.keys(shortNameMap)) {
    storeObject[question] = null;
  }

  return storeObject;
};

const initialState = {
  form: createFormStore(SHORT_NAME_MAP),
  viewedIntroPage: false,
  viewedResultsPage1: false,
};

const pactAct = (state = initialState, action) => {
  switch (action.type) {
    case PAW_UPDATE_BURN_PIT_2_1:
      return {
        ...state,
        form: {
          ...state.form,
          BURN_PIT_2_1: action.payload,
        },
      };
    case PAW_UPDATE_SERVICE_PERIOD:
      return {
        ...state,
        form: {
          // When the answer to Service Period is changed, wipe the rest of the form clean
          ...createFormStore(SHORT_NAME_MAP),
          SERVICE_PERIOD: action.payload,
        },
      };
    case PAW_VIEWED_INTRO_PAGE:
      return {
        ...state,
        viewedIntroPage: action.payload,
      };
    case PAW_VIEWED_RESULTS_PAGE_1:
      return {
        ...state,
        viewedResultsPage1: action.payload,
      };
    default:
      return state;
  }
};

export default {
  pactAct,
};
