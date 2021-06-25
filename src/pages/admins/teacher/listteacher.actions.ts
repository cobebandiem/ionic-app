import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListTeacherState } from './listteacher.state';

export const loadListTeacher = () => async (dispatch: React.Dispatch<any>) => {
  const teachers = await asyncRequests.get("/agents?all=true&include=user");
  // const teachers = users.map((teacher:any) => teacher.user);
  dispatch(setListTeacherData({ teachers: teachers.data }));
};

export const setListTeacherData = (teachers: Partial<ListTeacherState>) => ({
  type: 'set-list-teacher-data',
  teachers
} as const);



export type ListTeacherActions =
  ActionType<typeof setListTeacherData>



