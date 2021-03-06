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
  IonTextarea
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "../../../data/connect";
import { asyncRequests } from "../../../data/dataApi";
import "../../style.scss";
import { loadListCourse } from "./listCourse.actions";
import { Course } from "./Course";
import moment from "moment";
import { toast } from "../../../toast";
import { loadPlaces, loadTeachers } from "./courseConfig";


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
  const [courseName, setCourseName] = useState<string>();
  const [courseNameError, setCourseNameError] = useState(false);
  const [place, setPlace] = useState(Object);
  const [placeError, setPlaceError] = useState(false);
  const [dataPlace, setDataPlace] = useState([]);
  const [teacher, setTeacher] = useState(Object);
  const [teacherError, setTeacherError] = useState(false);
  const [dataTeacher, setDataTeacher] = useState([]);
  const [startDate, setStartDate] = useState(moment().toISOString());
  const [endDate, setEndDate] = useState(moment().toISOString());
  const [timeSlotEnd, setTimeSlotEnd] = useState(moment().toISOString());
  const [timeSlotStart, setTimeSlotStart] = useState(moment().toISOString());
  const [priceAdminTotal, setPriceAdminTotal] = useState<string>("0");
  const [priceAgentTotal, setPriceAgentTotal] = useState<string>("0");
  const [priceHostTotal, setPriceHostTotal] = useState<string>("0");
  const [descriptionCourse, setDescriptionCourse] = useState<string>();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  useEffect(() => {
    loadPlaces().then((place: any) => {
      if (place) {
        setDataPlace(place.data);
      }
    });
    loadTeachers().then((teacher: any) => {
      if (teacher) {
        setDataTeacher(teacher.data);
      }
    });
  }, []);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!courseName) {
      setCourseNameError(true);
    }
    if (!place) {
      setPlaceError(true);
    }
    if (!teacher) {
      setTeacherError(true);
    }

    var url = "/courses";
    var bodyObject = {
      placeId: place ? place.id : null,
      agentId: teacher ? teacher.id : null,
      name: courseName,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      timeSlotStart: moment(timeSlotStart).format("YYYY-MM-DD HH:mm:ss"),
      timeSlotEnd: moment(timeSlotEnd).format("YYYY-MM-DD HH:mm:ss"),
      priceAdminTotal: priceAdminTotal,
      priceAgentTotal : priceAgentTotal,
      priceHostTotal : priceHostTotal,
      description : descriptionCourse,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Th??m Khoa?? Ho??c Th??nh C??ng!");
        history.push("/listCourse");
        loadListCourse();
      } else {
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };

  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Th??m Khoa?? Ho??c</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddCourse}>
          <IonList>
          <IonItem>
              <IonLabel position="stacked" color="success">
                Hu????n luy????n vi??n
              </IonLabel>
              <IonSelect
                value={teacher}
                placeholder="Ch???n hu????n luy????n vi??n"
                onIonChange={(e) => setTeacher(e.detail.value!)}
              >
                {dataTeacher
                  ? dataTeacher.map((data: any) => (
                      <IonSelectOption key={data.id} value={data}>
                        {data.user.fullName}
                      </IonSelectOption>
                    ))
                  : null}
              </IonSelect>
              {formSubmitted && teacherError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Cho??n Hu????n Luy????n Vi??n!</p>
              </IonText>
            )}
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
                        {data.host.companyName}
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
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n khoa?? ho??c
              </IonLabel>
              <IonInput
                value={courseName}
                placeholder="Nh????p t??n khoa?? ho??c"
                onIonChange={(e) => setCourseName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {formSubmitted && courseNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p T??n Khoa?? Ho??c!</p>
              </IonText>
            )}
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
            <IonItem>
              <IonLabel position="stacked" color="success">
              T???ng gi?? cho Y&M
              </IonLabel>
              <IonInput value={priceAdminTotal} placeholder="T???ng gi?? cho Y&M" onIonChange={e => setPriceAdminTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              T???ng gi?? cho hu???n luy??n vi??n
              </IonLabel>
              <IonInput value={priceAgentTotal} placeholder="T???ng gi?? cho hu???n luy??n vi??n" onIonChange={e => setPriceAgentTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              T???ng gi?? cho trung t??m
              </IonLabel>
              <IonInput value={priceHostTotal} placeholder="T???ng gi?? cho trung t??m" onIonChange={e => setPriceHostTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              To??m t????t khoa?? ho??c
              </IonLabel>
              <IonTextarea value={descriptionCourse} onIonChange={e => setDescriptionCourse(e.detail.value!)}></IonTextarea>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Th??m
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listCourse" color="light" expand="block">
                B??? Qua
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
