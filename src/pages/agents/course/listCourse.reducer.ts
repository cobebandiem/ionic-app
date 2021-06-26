import { ListCourseState } from './listCourse.state';
import { ListCourseActions } from './listCourse.actions';

export const listCourseReducer = (state: ListCourseState, action: ListCourseActions): ListCourseState => {
  switch (action.type) {
    case 'set-list-course-data': {
      return { ...state, ...action.courses };
    }
  }
}
