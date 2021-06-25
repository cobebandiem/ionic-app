import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getHosts = (state: AppState) => {
  return state.listHost.hosts
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredHosts = createSelector(
  getHosts, getSearchText,
  (hosts, searchText) => {
    if (!searchText) {
      return hosts;
    }
    return hosts.filter(
      (host) =>
        (host.fullName &&
          host.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1) ||
        (host.phone &&
          host.phone.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

