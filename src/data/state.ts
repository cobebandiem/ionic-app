import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { listTeacherReducer } from '../pages/admins/teacher/listteacher.reducer';

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
  }
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
  listteacher: listTeacherReducer,
});

export type AppState = ReturnType<typeof reducers>;
