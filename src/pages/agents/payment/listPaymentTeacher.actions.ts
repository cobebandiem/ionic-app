import { ActionType } from '../../../util/types';
import { asyncRequests } from '../../../data/dataApi';
import { ListPaymentState } from './listPaymentTeacher.state';

export const loadListPayment = () => async (dispatch: React.Dispatch<any>) => {
  const payments = await asyncRequests.get("/payments?include=payer");
  dispatch(setListPaymentData({ payments: payments.data }));
};

export const setListPaymentData = (payments: Partial<ListPaymentState>) => ({
  type: 'set-list-payment-data',
  payments
} as const);



export type ListPaymentActions =
  ActionType<typeof setListPaymentData>



