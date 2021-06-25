import { ListLearnerState } from './listLearner.state';
import { ListLearnerActions } from './listLearner.actions';

export const listLearnerReducer = (state: ListLearnerState, action: ListLearnerActions): ListLearnerState => {
  switch (action.type) {
    case 'set-list-learner-data': {
      return { ...state, ...action.learners };
    }
  }
}
