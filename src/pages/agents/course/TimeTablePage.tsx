import React, { useState, useRef, useEffect } from 'react';
import { IonIcon, IonRow, IonImg, IonCol, IonToolbar, IonContent, IonPage, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../../data/connect';
import '../../style.scss'
import * as courseselectors from './CourseSelectors';
import { setSearchText } from '../../../data/sessions/sessions.actions';
import { Course } from './Course';
import { loadListCourse } from './listCourse.actions';
import { add, chevronForwardOutline } from 'ionicons/icons';
import styles from "./CharacterItem.module.scss";


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
    <IonPage id="list-course-page" className="list-page list-course-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Môn Học</IonTitle>
          <IonButtons slot="end">
          <IonButton routerLink="/teacher/profile">
            <div className="button-container-img">
              <img
                src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
                alt="avatar"
              />
            </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm kiếm môn học"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
        <IonRow>
        <IonCol size='6'>
                <IonItem detail={ false } routerLink={'/teacher/subjectDetail'} lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga6.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga Thư Giãn</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
            <IonCol size='6'>
                <IonItem detail={ false } lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga4.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga Bà Bầu</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
            <IonCol size='6'>
                <IonItem detail={ false } lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga8.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga Người Lớn Tuổi</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
            <IonCol size='6'>
                <IonItem detail={ false } lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga8.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga Tại Nhà</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
            <IonCol size='6'>
                <IonItem detail={ false } lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga6.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga </IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
            <IonCol size='6'>
                <IonItem detail={ false } lines="none" className={ styles.characterContainer }>
                    <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga6.jpg"/>
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>Yoga Ấn Độ</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
        </IonRow>
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
