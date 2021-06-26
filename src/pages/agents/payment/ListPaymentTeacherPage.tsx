import React, { useState, useRef, useEffect } from 'react';
import { IonIcon, IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as courseselectors from './PaymentTeacherSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Payment } from './Payment';
import { loadListPayment } from './listPaymentTeacher.actions';
import { add } from 'ionicons/icons';

interface OwnProps { }

interface StateProps {
  listPayments: Payment[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListPayment: typeof loadListPayment;
}


type ListPaymentPageProps = OwnProps & StateProps & DispatchProps;

const ListPaymentPage: React.FC<ListPaymentPageProps> = ({ listPayments, setSearchText, loadListPayment, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  useEffect(() => {
    loadListPayment();
  }, []);

  var paymentTypeObj = {
    0: { color: 'light-success', name: 'Thanh toán' },
    1: { color: 'light-secondary', name: 'Rút tiền' },
  };

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Thanh Toán</IonTitle>
        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonLoading message="Please wait..." duration={0} isOpen={(listPayments ? false : true)} />
        <IonList>
          {listPayments && listPayments.map((course, index: number) => (
            <IonItemSliding key={course.id}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src="/assets/img/person-green-icon.svg"/>
                </IonAvatar>

                <IonLabel>

                  <h3>Người thanh toán: {course.payer.fullName}</h3>
                  <p>
                    Tổng tiền: {course.amount}
                  </p>
                  {/* <p>
                    Loại: {paymentTypeObj[course.type].name}
                  </p> */}
                </IonLabel>
              </IonItem>
              <IonPopover
                isOpen={showPopover}
                cssClass=''
                onDidDismiss={e => setShowPopover(false)}
              >
                <p>This is popover content</p>
              </IonPopover>
            </IonItemSliding>


          ))}
        </IonList>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}>
      </IonModal>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listPayments: courseselectors.getFilteredPayments(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListPayment
  },
  component: React.memo(ListPaymentPage)
});
