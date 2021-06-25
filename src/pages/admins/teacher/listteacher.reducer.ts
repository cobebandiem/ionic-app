import { ListTeacherState } from './listteacher.state';
import { ListTeacherActions } from './listteacher.actions';

export const listTeacherReducer = (state: ListTeacherState, action: ListTeacherActions): ListTeacherState => {
  switch (action.type) {
    case 'set-list-teacher-data': {
      return { ...state, ...action.teachers };
    }
  }
}
