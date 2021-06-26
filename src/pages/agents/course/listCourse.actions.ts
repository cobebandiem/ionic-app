import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListCourseState } from './listCourse.state';

export const loadListCourse = () => async (dispatch: React.Dispatch<any>) => {
  const courses = await asyncRequests.get("/courses?all=true&include=agent,agent.user,place,place.host");
  // const courses = hosts.map((place:any) => place.user);
  dispatch(setListCourseData({ courses: courses.data }));
};

export const setListCourseData = (courses: Partial<ListCourseState>) => ({
  type: 'set-list-course-data',
  courses
} as const);



export type ListCourseActions =
  ActionType<typeof setListCourseData>



