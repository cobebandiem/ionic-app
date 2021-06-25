import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListHostState } from './listHost.state';

export const loadListHost = () => async (dispatch: React.Dispatch<any>) => {
  const hosts = await asyncRequests.get("/hosts?all=true&include=user");
  // const hosts = users.map((host:any) => host.user);
  dispatch(setListHostData({ hosts: hosts.data }));
};

export const setListHostData = (hosts: Partial<ListHostState>) => ({
  type: 'set-list-host-data',
  hosts
} as const);



export type ListHostActions =
  ActionType<typeof setListHostData>



