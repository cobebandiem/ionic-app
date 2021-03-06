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
import { RouteComponentProps, useParams } from "react-router";
import { connect } from "../../../data/connect";
import { asyncRequests } from "../../../data/dataApi";
import "../../style.scss";
import { loadListTeacher } from "./listteacher.actions";
import { Teacher } from "./Teacher";
import moment from "moment";
import { toast } from "../../../toast";
import { isEmpty  } from "lodash";
import { loadTeacherById } from "./teacherConfig";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listTeacherOptions: Teacher[];
}

interface DispatchProps {
  loadListTeacher: typeof loadListTeacher;
}

type AddTeacherProps = OwnProps & StateProps & DispatchProps;

const AddTeacherPage: React.FC<AddTeacherProps> = ({
  loadListTeacher,
  history,
}) => {

  const [teacher, setTeacher] = useState(Object);
  const [userName, setUserName] = useState<string>();
  const [userNameError, setUserNameError] = useState(false);
  const [fullName, setFullName] = useState<string>();
  const [fullNameError, setFullNameError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [phoneError, setPhoneError] = useState(false);
  const [userStatus, setUserStatus] = useState("1");
  const [address, setAddress] = useState<string>();
  const [addressError, setAddressError] = useState(false);
  const [cmndNumber, setCmndNumber] = useState<string>();
  const [cmndIssueDate, setCmndIssueDate] = useState(moment().toISOString());
  const [cmndIssuePlace, setCmndIssuePlace] = useState<string>();
  const [skillList, setSkillList] = useState<string>();
  const [serviceProvince, setServiceProvince] = useState<string>();
  const [serviceDistrict, setServiceDistrict] = useState<string>();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const params : any = useParams();

  useEffect(() => {
    loadTeacherById(params.id).then((teacher: any) => {
      if (teacher) {
        setTeacher(teacher);
      }
    });
  }, []);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!userName) {
      setUserNameError(true);
    }
    if (!fullName) {
      setFullNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!phone) {
      setPhoneError(true);
    }
    if (!address) {
      setAddressError(true);
    }
    var url = "/agents";
    var bodyObject = {
      user : {
        id: teacher.user.id,
        username : userName,
        fullName : fullName,
        active : parseInt(userStatus),
        email : email,
        phone : phone,
        address : address,
        cmndNumber : cmndNumber,
        cmndIssueDate: moment(cmndIssueDate).format("YYYY-MM-DD"),
        cmndIssuePlace : cmndIssuePlace,
      },
      skillList : skillList ? skillList.split(',') : [],
      serviceProvince : serviceProvince ? serviceProvince.split(',') : [],
      serviceDistrict : serviceDistrict ? serviceDistrict.split(',') : [],
      // active: {value: 1, label: "Ho???t ?????ng"},
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Chi??nh S????a Hu????n Luy????n Vi??n Th??nh C??ng!");
        history.push("/listTeacher");
        window.location.reload();
      } else {
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };
  //

  var optionUserStatus = [
    { label: "Hoa??t ??????ng", value: "1" },
    { label: "Kh??ng Hoa??t ??????ng", value: "0" },
  ];

  return !isEmpty(teacher) ? (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="success"></IonMenuButton>
          </IonButtons>
          <IonTitle>Chi??nh S????a Hu????n Luy????n Vi??n</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddTeacher}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n ????ng nh????p
              </IonLabel>
              <IonInput value={teacher.user.username} placeholder="Nh????p t??n ????ng nh????p" disabled onIonChange={e => setUserName(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && userNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p T??n ????ng Nh????p!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ho?? va?? t??n
              </IonLabel>
              <IonInput value={teacher.user.fullName} placeholder="Nh????p ho?? va?? t??n" clear-on-edit={true} onIonChange={e => setFullName(e.detail.value!)} clearInput></IonInput>
            </IonItem>
            {formSubmitted && fullNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p Ho?? Va?? T??n!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Email
              </IonLabel>
              <IonInput value={teacher.user.email} placeholder="Nh????p email" type="email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && emailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p Email!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                S???? ??i????n thoa??i
              </IonLabel>
              <IonInput value={teacher.user.phone} placeholder="Nh????p s???? ??i????n thoa??i" type="number" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && phoneError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p S???? ??i????n Thoa??i!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tra??ng tha??i
              </IonLabel>
              <IonSelect
                value={userStatus}
                placeholder="Ch???n Tr???ng Th??i"
                onIonChange={(e) => setUserStatus(e.detail.value!)}
              >
                {optionUserStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                ??i??a chi??
              </IonLabel>
              <IonInput value={teacher.user.address} placeholder="Nh????p ??i??a chi??" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && addressError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p ??i??a Chi??!</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                S???? CMND
              </IonLabel>
              <IonInput value={teacher.user.cmndNumber} placeholder="Nh????p s???? CMND" type="number" onIonChange={e => setCmndNumber(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Nga??y C????p (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={teacher.user.cmndIssueDate}
                onIonChange={(e) => setCmndIssueDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                N??i c????p
              </IonLabel>
              <IonInput value={teacher.user.cmndIssuePlace} placeholder="Nh????p n??i c????p" onIonChange={e => setCmndIssuePlace(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                S???? thi??ch
              </IonLabel>
              <IonInput value={teacher.skillList} placeholder="S???? thi??ch" onIonChange={e => setSkillList(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Di??ch vu?? ta??i qu????n
              </IonLabel>
              <IonInput value={teacher.serviceProvince} placeholder="Di??ch vu?? ta??i qu????n" onIonChange={e => setServiceProvince(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Di??ch vu?? ta??i ????????ng
              </IonLabel>
              <IonInput value={teacher.serviceDistrict} placeholder="Di??ch vu?? ta??i ????????ng" onIonChange={e => setServiceDistrict(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Th??m
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listTeacher" color="light" expand="block">
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
  ) : null;
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListTeacher,
  },
  component: AddTeacherPage,
});
