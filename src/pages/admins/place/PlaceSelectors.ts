import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getPlaces = (state: AppState) => {
  return state.listPlace.places
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredPlaces = createSelector(
  getPlaces, getSearchText,
  (places, searchText) => {
    if (!searchText) {
      return places;
    }
    return places.filter(
      (place) =>
        (place.host.companyName &&
          place.host.companyName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (place.serviceProvince &&
          place.serviceProvince.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

