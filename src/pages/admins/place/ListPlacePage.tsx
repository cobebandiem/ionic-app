import React, { useState, useRef, useEffect } from 'react';
import { IonIcon, IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as placeselectors from './PlaceSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Place } from './Place';
import { loadListPlace } from './listPlace.actions';
import { add } from 'ionicons/icons';

interface OwnProps { }

interface StateProps {
  listPlaces: Place[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListPlace: typeof loadListPlace;
}


type ListPlacePageProps = OwnProps & StateProps & DispatchProps;

const ListPlacePage: React.FC<ListPlacePageProps> = ({ listPlaces, setSearchText, loadListPlace, mode }) => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  useEffect(() => {
    loadListPlace();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Địa Điểm</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={'/addPlace'}>
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
        <IonLoading message="Please wait..." duration={0} isOpen={(listPlaces ? false : true)} />
        <IonList>
          {listPlaces && listPlaces.map((place, index: number) => (
            <IonItemSliding key={place.id}>
              <IonItem routerLink={`/editLeaveLetter/${place.id}`}>
                <IonAvatar slot="start">
                  <img src="/assets/img/person-green-icon.svg"/>
                </IonAvatar>

                <IonLabel>

                  <h3>{place.host.companyName}</h3>
                  <p>
                    Địa chỉ: {place.address}
                  </p>
                  <p>
                    Giá theo giờ: {place.pricePerHour}
                  </p>
                </IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listPlaces: placeselectors.getFilteredPlaces(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListPlace
  },
  component: React.memo(ListPlacePage)
});
