import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getCourses = (state: AppState) => {
  return state.listCourse.courses
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredCourses = createSelector(
  getCourses, getSearchText,
  (courses, searchText) => {
    if (!searchText) {
      return courses;
    }
    return courses.filter(
      (course) =>
        (course.agent.user.fullName &&
          course.agent.user.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (course.place.host.companyName &&
          course.place.host.companyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

