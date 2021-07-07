import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  IonInput,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "../../../data/connect";
import { asyncRequests } from "../../../data/dataApi";
import "../../style.scss";
import { loadListCourse } from "./listCourse.actions";
import { Course } from "./Course";
import moment from "moment";
import { loadPlaces, loadTeachers } from "./courseConfig";
import { Storage } from '@capacitor/storage';
import { AuthService } from "../../../data/dataApi";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listCourseOptions: Course[];
}

interface DispatchProps {
  loadListCourse: typeof loadListCourse;
}

type CourseProps = OwnProps & StateProps & DispatchProps;

const AddCoursePage: React.FC<CourseProps> = ({
  loadListCourse,
  history,
}) => {

  const [place, setPlace] = useState(Object);
  const [placeError, setPlaceError] = useState(false);
  const [dataPlace, setDataPlace] = useState([]);
  const [startDate, setStartDate] = useState(moment().toISOString());
  const [endDate, setEndDate] = useState(moment().toISOString());
  const [timeSlotEnd, setTimeSlotEnd] = useState(moment().toISOString());
  const [timeSlotStart, setTimeSlotStart] = useState(moment().toISOString());
  // const [priceAdminTotal, setPriceAdminTotal] = useState<string>("0");
  const [priceAgentTotal, setPriceAgentTotal] = useState<string>("0");
  // const [priceHostTotal, setPriceHostTotal] = useState<string>("0");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const [currentUser, setCurrentUser] = useState(Object);

  useEffect(() => {
    AuthService.current().then((user: any) => {
      setCurrentUser(user);
    });
    loadPlaces().then((place: any) => {
      if (place) {
        setDataPlace(place.data);
      }
    });
  }, []);

  const [day, setDay] = useState<string>();

  return (
    <IonPage id="edituser-page" className="addcourse-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Thêm Khoá Học</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate>
          <IonList>
          <IonItem>
            <IonLabel>Ngày dạy trong tuần: </IonLabel>
            <IonSelect value={day} placeholder="Vui lòng chọn ngày dạy" onIonChange={e => setDay(e.detail.value)}>
              <IonSelectOption value="t2">Thứ 2</IonSelectOption>
              <IonSelectOption value="t3">Thứ 3</IonSelectOption>
              <IonSelectOption value="t4">Thứ 4</IonSelectOption>
              <IonSelectOption value="t5">Thứ 5</IonSelectOption>
              <IonSelectOption value="t6">Thứ 6</IonSelectOption>
              <IonSelectOption value="t7">Thứ 7</IonSelectOption>
              <IonSelectOption value="cn">Chủ Nhật</IonSelectOption>
            </IonSelect>
          </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Trung Tâm
              </IonLabel>
              <IonSelect
                value={place}
                placeholder="Chọn Trung Tâm"
                onIonChange={(e) => setPlace(e.detail.value!)}
              >
                {dataPlace
                  ? dataPlace.map((data: any) => (
                      <IonSelectOption key={data.id} value={data}>
                        {data.host.companyName} - {data.name}
                      </IonSelectOption>
                    ))
                  : null}
              </IonSelect>
              {formSubmitted && placeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Chọn Trung Tâm!</p>
              </IonText>
            )}
            </IonItem>
            <IonRow>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày bắt đầu (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={startDate}
                onIonChange={(e) => setStartDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày kết thúc (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={endDate}
                onIonChange={(e) => setEndDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Giờ bắt đầu (*)
              </IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                placeholder="Chọn giờ bắt đầu"
                value={timeSlotStart}
                onIonChange={(e) => setTimeSlotStart(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Giờ kết thúc (*)
              </IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                placeholder="Chọn giờ kết thúc"
                value={timeSlotEnd}
                onIonChange={(e) => setTimeSlotEnd(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
            </IonRow>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Giá tiền huấn luyện viên
              </IonLabel>
              <IonInput value={priceAgentTotal} placeholder="Tổng giá cho huấn luyện viên" onIonChange={e => setPriceAgentTotal(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="button" expand="block">
                Gửi duyệt
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/teacher/listCourse" color="light" expand="block">
                Trở về
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={messageResult}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListCourse,
  },
  component: AddCoursePage,
});
