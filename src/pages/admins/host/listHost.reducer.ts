import { ListHostState } from './listHost.state';
import { ListHostActions } from './listHost.actions';

export const listHostReducer = (state: ListHostState, action: ListHostActions): ListHostState => {
  switch (action.type) {
    case 'set-list-host-data': {
      return { ...state, ...action.hosts };
    }
  }
}
