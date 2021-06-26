import { createSelector } from 'reselect';
import { AppState } from '../../../data/state';

const getPayments = (state: AppState) => {
  return state.listPayment.payments
};

const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredPayments = createSelector(
  getPayments, getSearchText,
  (payments, searchText) => {
    if (!searchText) {
      return payments;
    }
    return payments.filter(
      (payment) =>
        (payment.payer.fullName &&
          payment.payer.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1)
        //     ||
        // (payment.payer.companyName &&
        //   payment.payer.companyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    );
  }
)

