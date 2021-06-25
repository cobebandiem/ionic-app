import React, { useState, useRef, useEffect } from 'react';
import { IonIcon , IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as hostselectors from './HostSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Host } from './Host';
import { loadListHost } from './listHost.actions';
import { add } from 'ionicons/icons';

interface OwnProps { }

interface StateProps {
  listHosts: Host[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListHost: typeof loadListHost;
}


type ListTeacherPageProps = OwnProps & StateProps & DispatchProps;

const ListTeacherPage: React.FC<ListTeacherPageProps> = ({ listHosts, setSearchText, loadListHost, mode }) => {
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
    loadListHost();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Trung Tâm</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={'/addHost'}>
              <IonIcon className='c-white' slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
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
        <IonLoading message="Please wait..." duration={0} isOpen={(listHosts ? false : true)} />
        <IonList>
          {listHosts && listHosts.map((host, index: number) => (
            <IonItemSliding key={host.id}>
              <IonItem routerLink={`/editLeaveLetter/${host.id}`}>
                <IonAvatar slot="start">
                  <img src="/assets/img/person-green-icon.svg"/>
                </IonAvatar>

                <IonLabel>

                  <h3>{host.user.fullName}</h3>
                  <p>
                    Email: {host.user.email}
                  </p>
                  <p>
                    Số điện thoại: {host.user.phone}
                  </p>
                  <p>
                    Địa chỉ trung tâm: {host.taxAddress}
                  </p>
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
    listHosts: hostselectors.getFilteredHosts(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListHost
  },
  component: React.memo(ListTeacherPage)
});
