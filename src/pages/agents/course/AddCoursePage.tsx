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
          <IonTitle className='c-white'>Th??m Khoa?? Ho??c</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate>
          <IonList>
          <IonItem>
            <IonLabel>Nga??y da??y trong tu????n: </IonLabel>
            <IonSelect value={day} placeholder="Vui lo??ng cho??n nga??y da??y" onIonChange={e => setDay(e.detail.value)}>
              <IonSelectOption value="t2">Th???? 2</IonSelectOption>
              <IonSelectOption value="t3">Th???? 3</IonSelectOption>
              <IonSelectOption value="t4">Th???? 4</IonSelectOption>
              <IonSelectOption value="t5">Th???? 5</IonSelectOption>
              <IonSelectOption value="t6">Th???? 6</IonSelectOption>
              <IonSelectOption value="t7">Th???? 7</IonSelectOption>
              <IonSelectOption value="cn">Chu?? Nh????t</IonSelectOption>
            </IonSelect>
          </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Trung T??m
              </IonLabel>
              <IonSelect
                value={place}
                placeholder="Ch???n Trung T??m"
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
                <p className="ion-padding-start">Vui L??ng Cho??n Trung T??m!</p>
              </IonText>
            )}
            </IonItem>
            <IonRow>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Nga??y b????t ??????u (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={startDate}
                onIonChange={(e) => setStartDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Nga??y k????t thu??c (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
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
                Gi???? b????t ??????u (*)
              </IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                placeholder="Ch???n gi???? b????t ??????u"
                value={timeSlotStart}
                onIonChange={(e) => setTimeSlotStart(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
              <IonCol size="6">
              <IonItem>
              <IonLabel position="stacked" color="success">
                Gi???? k????t thu??c (*)
              </IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                placeholder="Ch???n gi???? k????t thu??c"
                value={timeSlotEnd}
                onIonChange={(e) => setTimeSlotEnd(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
              </IonCol>
            </IonRow>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Gia?? ti????n hu????n luy????n vi??n
              </IonLabel>
              <IonInput value={priceAgentTotal} placeholder="T???ng gi?? cho hu???n luy????n vi??n" onIonChange={e => setPriceAgentTotal(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="button" expand="block">
                G????i duy????t
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/teacher/listCourse" color="light" expand="block">
                Tr???? v????
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
