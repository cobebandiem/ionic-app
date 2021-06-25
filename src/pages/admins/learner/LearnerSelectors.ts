import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getLearners = (state: AppState) => {
  return state.listLearner.learners
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredLearners = createSelector(
  getLearners, getSearchText,
  (learners, searchText) => {
    if (!searchText) {
      return learners;
    }
    return learners.filter(
      (learner) =>
        (learner.fullName &&
          learner.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (learner.phone &&
          learner.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

