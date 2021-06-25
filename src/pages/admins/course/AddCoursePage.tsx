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
        toast("Thêm Khoá Học Thành Công!");
        history.push("/listCourse");
        loadListCourse();
      } else {
        toast("Lỗi Lưu trữ!");
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
          <IonTitle className='c-white'>Thêm Khoá Học</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddCourse}>
          <IonList>
          <IonItem>
              <IonLabel position="stacked" color="success">
                Huấn luyện viên
              </IonLabel>
              <IonSelect
                value={teacher}
                placeholder="Chọn huấn luyện viên"
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
                <p className="ion-padding-start">Vui Lòng Chọn Huấn Luyện Viên!</p>
              </IonText>
            )}
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
                        {data.host.companyName}
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
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên khoá học
              </IonLabel>
              <IonInput
                value={courseName}
                placeholder="Nhập tên khoá học"
                onIonChange={(e) => setCourseName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {formSubmitted && courseNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Tên Khoá Học!</p>
              </IonText>
            )}
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
            <IonItem>
              <IonLabel position="stacked" color="success">
              Tổng giá cho Y&M
              </IonLabel>
              <IonInput value={priceAdminTotal} placeholder="Tổng giá cho Y&M" onIonChange={e => setPriceAdminTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Tổng giá cho huấn luyên viên
              </IonLabel>
              <IonInput value={priceAgentTotal} placeholder="Tổng giá cho huấn luyên viên" onIonChange={e => setPriceAgentTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Tổng giá cho trung tâm
              </IonLabel>
              <IonInput value={priceHostTotal} placeholder="Tổng giá cho trung tâm" onIonChange={e => setPriceHostTotal(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Tóm tắt khoá học
              </IonLabel>
              <IonTextarea value={descriptionCourse} onIonChange={e => setDescriptionCourse(e.detail.value!)}></IonTextarea>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Thêm
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listCourse" color="light" expand="block">
                Bỏ Qua
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
