import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonIcon, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as teacherselectors from './TeacherSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Teacher } from './Teacher';
import { loadListTeacher } from './listteacher.actions';
import { add } from 'ionicons/icons';


interface OwnProps { }

interface StateProps {
  listTeachers: Teacher[];
  mode: 'ios' | 'md';
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListTeacher: typeof loadListTeacher;
}


type ListTeacherPageProps = OwnProps & StateProps & DispatchProps;

const ListTeacherPage: React.FC<ListTeacherPageProps> = ({ listTeachers, setSearchText, loadListTeacher, mode }) => {
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
    loadListTeacher()
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Huấn Luyện Viên</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={'/addTeacher'}>
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
        <IonLoading message="Please wait..." duration={0} isOpen={(listTeachers ? false : true)} />
        <IonList>
          {listTeachers && listTeachers.map((teacher, index: number) => (
            <IonItemSliding key={teacher.id}>
              {/* <IonItem routerLink={`/editTeacher/${teacher.id}`}> */}
              <IonItem>
                <IonAvatar slot="start">
                  <img src="/assets/img/person-green-icon.svg" alt="avatar user"/>
                </IonAvatar>

                <IonLabel>

                  <h3>{teacher.user.fullName}</h3>
                  <p>
                    Email: {teacher.user.email}
                  </p>
                  <p>
                    Phone: {teacher.user.phone}
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
    listTeachers: teacherselectors.getFilteredTeachers(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListTeacher
  },
  component: React.memo(ListTeacherPage)
});
