import React, { useState, useRef, useEffect } from 'react';
import { IonIcon, IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as courseselectors from './CourseSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Course } from './Course';
import { loadListCourse } from './listCourse.actions';
import { add } from 'ionicons/icons';

interface OwnProps { }

interface StateProps {
  listCourses: Course[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListCourse: typeof loadListCourse;
}


type ListCoursePageProps = OwnProps & StateProps & DispatchProps;

const ListCoursePage: React.FC<ListCoursePageProps> = ({ listCourses, setSearchText, loadListCourse, mode }) => {
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
    loadListCourse();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Khoá Học</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={'/addCourse'}>
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
        <IonLoading message="Please wait..." duration={0} isOpen={(listCourses ? false : true)} />
        <IonList>
          {listCourses && listCourses.map((course, index: number) => (
            <IonItemSliding key={course.id}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src="/assets/img/person-green-icon.svg"/>
                </IonAvatar>

                <IonLabel>
                  <h3>Huấn luyện viên: {course.agent.user.fullName}</h3>
                  <p>
                    Trung tâm: {course.place ? course.place.host.companyName : null} - {course.place ? course.place.name : null}
                  </p>
                  <p>
                    Ngày bắt đầu: {course.startDate}
                  </p>
                  <p>
                    Ngày kết thúc: {course.endDate}
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
    listCourses: courseselectors.getFilteredCourses(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListCourse
  },
  component: React.memo(ListCoursePage)
});
