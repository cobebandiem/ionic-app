import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { listTeacherReducer } from '../pages/admins/teacher/listteacher.reducer';
import { listLearnerReducer } from '../pages/admins/learner/listLearner.reducer';
import { listHostReducer } from '../pages/admins/host/listHost.reducer';
import { listPlaceReducer } from '../pages/admins/place/listPlace.reducer';
import { listCourseReducer } from '../pages/admins/course/listCourse.reducer';

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  },
  listteacher: {
    teachers:[],
  },
  listLearner: {
    learners:[],
  },
  listHost: {
    hosts:[],
  },
  listPlace: {
    places:[],
  },
  listCourse: {
    courses:[],
  }
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
  listteacher: listTeacherReducer,
  listLearner: listLearnerReducer,
  listHost: listHostReducer,
  listPlace: listPlaceReducer,
  listCourse: listCourseReducer,
});

export type AppState = ReturnType<typeof reducers>;
