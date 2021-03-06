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
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "../../../data/connect";
import { asyncRequests } from "../../../data/dataApi";
import "../../style.scss";
import { loadListHost } from "./listHost.actions";
import { Host } from "./Host";
import moment from "moment";
import { toast } from "../../../toast";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listHostOptions: Host[];
}

interface DispatchProps {
  loadListHost: typeof loadListHost;
}

type LabourAttendanceProps = OwnProps & StateProps & DispatchProps;

const AddHostPage: React.FC<LabourAttendanceProps> = ({
  loadListHost,
  history,
}) => {

  const [userName, setUserName] = useState<string>();
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState(false);
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
  const [companyName, setCompanyName] = useState<string>();
  const [taxAddress, setTaxAddress] = useState<string>();
  const [taxNumber, setTaxNumber] = useState<string>();


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");


  const handleAddHost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!userName) {
      setUserNameError(true);
    }
    if (!password) {
      setPasswordError(true);
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

    var url = "/hosts";
    const user = {};
    var bodyObject = {
      user : {
        username : userName,
        password : password,
        fullName : fullName,
        active : parseInt(userStatus),
        email : email,
        phone : phone,
        address : address,
        cmndNumber : cmndNumber,
        cmndIssueDate: moment(cmndIssueDate).format("YYYY-MM-DD"),
        cmndIssuePlace : cmndIssuePlace,
      },
      companyName : companyName,
      taxAddress : taxAddress,
      taxNumber : taxNumber
      // active: {value: 1, label: "Ho???t ?????ng"},
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Th??m Trung T??m Th??nh C??ng!");
        history.push("/listHost");
        loadListHost();
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

  return  (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Th??m Trung T??m</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddHost}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n ????ng nh????p
              </IonLabel>
              <IonInput value={userName} placeholder="Nh????p t??n ????ng nh????p" onIonChange={e => setUserName(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && userNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p T??n ????ng Nh????p!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                M????t kh????u
              </IonLabel>
              <IonInput value={password} placeholder="Nh????p m????t kh????u" type="password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p T??n ????ng Nh????p!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ho?? va?? t??n
              </IonLabel>
              <IonInput value={fullName} placeholder="Nh????p ho?? va?? t??n" onIonChange={e => setFullName(e.detail.value!)}></IonInput>
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
              <IonInput value={email} placeholder="Nh????p email" type="email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
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
              <IonInput value={phone} placeholder="Nh????p s???? ??i????n thoa??i" type="number" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
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
              <IonInput value={address} placeholder="Nh????p ??i??a chi??" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
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
              <IonInput value={cmndNumber} placeholder="Nh????p s???? CMND" type="number" onIonChange={e => setCmndNumber(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Nga??y C????p (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={cmndIssueDate}
                onIonChange={(e) => setCmndIssueDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                N??i c????p
              </IonLabel>
              <IonInput value={cmndIssuePlace} placeholder="Nh????p n??i c????p" onIonChange={e => setCmndIssuePlace(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n c??ng ty
              </IonLabel>
              <IonInput value={companyName} placeholder="T??n c??ng ty" onIonChange={e => setCompanyName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ma?? s???? thu????
              </IonLabel>
              <IonInput value={taxNumber} placeholder="Ma?? s???? thu????" onIonChange={e => setTaxNumber(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                ??i??a chi?? c??ng ty
              </IonLabel>
              <IonInput value={taxAddress} placeholder="??i??a chi?? c??ng ty" onIonChange={e => setTaxAddress(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Th??m
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listHost" color="light" expand="block">
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
    loadListHost,
  },
  component: AddHostPage,
});
