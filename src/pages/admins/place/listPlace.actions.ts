import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListPlaceState } from './listPlace.state';

export const loadListPlace = () => async (dispatch: React.Dispatch<any>) => {
  const places = await asyncRequests.get("/places?all=true&include=host");
  // const places = hosts.map((place:any) => place.user);
  dispatch(setListPlaceData({ places: places.data }));
};

export const setListPlaceData = (places: Partial<ListPlaceState>) => ({
  type: 'set-list-place-data',
  places
} as const);



export type ListPlaceActions =
  ActionType<typeof setListPlaceData>



