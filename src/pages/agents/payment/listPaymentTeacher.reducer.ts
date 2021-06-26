import { ListPaymentState } from './listPaymentTeacher.state';
import { ListPaymentActions } from './listPaymentTeacher.actions';

export const listPaymentReducer = (state: ListPaymentState, action: ListPaymentActions): ListPaymentState => {
  switch (action.type) {
    case 'set-list-payment-data': {
      return { ...state, ...action.payments };
    }
  }
}
