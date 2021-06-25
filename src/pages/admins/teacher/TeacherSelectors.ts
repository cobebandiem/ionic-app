import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getTeachers = (state: AppState) => {
  return state.listteacher.teachers
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredTeachers = createSelector(
  getTeachers, getSearchText,
  (teachers, searchText) => {
    if (!searchText) {
      return teachers;
    }
    return teachers.filter(
      (teacher) =>
        (teacher.fullName &&
          teacher.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (teacher.phone &&
          teacher.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

