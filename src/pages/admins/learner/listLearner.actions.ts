import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListLearnerState } from './listLearner.state';

export const loadListLearner = () => async (dispatch: React.Dispatch<any>) => {
  const learners = await asyncRequests.get("/customers?all=true&include=user");
  // const learners = users.map((learner:any) => learner.user);
  dispatch(setListLearnerData({ learners: learners.data }));
};

export const setListLearnerData = (learners: Partial<ListLearnerState>) => ({
  type: 'set-list-learner-data',
  learners
} as const);



export type ListLearnerActions =
  ActionType<typeof setListLearnerData>



