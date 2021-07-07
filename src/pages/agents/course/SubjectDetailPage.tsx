import React, { useState, useRef, useEffect } from "react";
import {
  IonIcon,
  IonRow,
  IonImg,
  IonCol,
  IonToolbar,
  IonGrid,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonSearchbar,
  IonHeader,
  getConfig,
  IonTitle,
  IonItem,
  IonLabel
} from "@ionic/react";
import { connect } from "../../../data/connect";
import * as courseselectors from "./CourseSelectors";
import { setSearchText } from "../../../data/sessions/sessions.actions";
import { Course } from "./Course";
import { loadListCourse } from "./listCourse.actions";
import { arrowRedoOutline } from "ionicons/icons";
import styles from "./SubjectDetail.module.scss";
import "../../style.scss";

interface OwnProps {}

interface StateProps {
  listCourses: Course[];
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListCourse: typeof loadListCourse;
}

type ListCoursePageProps = OwnProps & StateProps & DispatchProps;

const SubjectDetailPage: React.FC<ListCoursePageProps> = ({
  listCourses,
  setSearchText,
  loadListCourse,
  mode,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);

  useEffect(() => {
    loadListCourse();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>
          <IonTitle className="c-white">Chi Tiết Môn Học</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton routerLink={'/teacher/addCourse'}>
              <IonIcon className='c-white' slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>

        <IonToolbar className="custom-toolbar">
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm kiếm môn học"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonItem lines="none">
              <IonImg src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga6.jpg" />
              <div className={styles.characterNameContainer}>
                <IonLabel style={{ color: "#fff" }}>Yoga Thư Giãn</IonLabel>
              </div>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <p className="ion-text-justify">
                Những tư thế yoga cơ bản thư giãn thích hợp cho người mới bắt
                đầu bởi động tác không quá khó. Luyện tập thường xuyên để có giấ
                ngủ tốt, cơ thể khoẻ mạnh, tinh thần thoải mãi.
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRow>
            <IonCol>
              <IonButton routerLink="/teacher/addCourse" color="success" expand="block">
                Tạo Khoá Học
                <IonIcon slot="end" icon={ arrowRedoOutline } />
                </IonButton>
            </IonCol>
          </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listCourses: courseselectors.getFilteredCourses(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListCourse,
  },
  component: React.memo(SubjectDetailPage),
});
