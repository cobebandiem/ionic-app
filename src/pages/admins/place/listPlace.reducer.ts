import { ListPlaceState } from './listPlace.state';
import { ListPlaceActions } from './listPlace.actions';

export const listPlaceReducer = (state: ListPlaceState, action: ListPlaceActions): ListPlaceState => {
  switch (action.type) {
    case 'set-list-place-data': {
      return { ...state, ...action.places };
    }
  }
}
