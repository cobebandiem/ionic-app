import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCheckbox,
  IonIcon,
  IonButtons,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonRadioGroup,
  IonListHeader,
  IonRadio
} from "@ionic/react";
import "./Login.scss";
import "./style.scss";
import { setIsLoggedIn, setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { asyncRequests } from "../data/dataApi";
import { toast } from "../toast";
import { arrowBack } from 'ionicons/icons';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps {}


const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  history,
  setUsername: setUsernameAction,
}) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState<string>("2");
  const [showToast, setShowToast] = useState(false);

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!fullName) {
      setFullNameError(true);
    }
    if (passwordConfirm !== password) {
      setPasswordConfirmError(true);
    }

    var url = "/auth/register";
    var bodyObject = {
      username: username,
      password: password,
      fullName: fullName,
      roleId: parseInt(selectedCheckBox)
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result) {
        toast("????ng ky?? ta??i khoa??n Th??nh C??ng!");
        history.push("/");
      } else {
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
        <IonButtons slot="start">
            <IonButton routerLink={'/'}>
              <IonIcon className='c-white' slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="c-white">????ng ky?? ta??i khoa??n</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/appicon.png" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={signup}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n ????ng nh????p
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => {
                  setUsername(e.detail.value!);
                  setUsernameError(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && usernameError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  T??n ????ng nh????p kh??ng ????????c bo?? tr????ng!
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ho?? va?? t??n
              </IonLabel>
              <IonInput
                value={fullName}
                placeholder="Nh????p ho?? va?? t??n"
                onIonChange={(e) => setFullName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {formSubmitted && fullNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh????p Ho?? Va?? T??n!</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                M????t kh????u
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => {
                  setPassword(e.detail.value!);
                  setPasswordError(false);
                }}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  M????t kh????u kh??ng ????????c bo?? tr????ng
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Xa??c nh????n m????t kh????u
              </IonLabel>
              <IonInput
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onIonChange={(e) => {
                  setPasswordConfirm(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordConfirmError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  M????t kh????u xa??c nh????n kh??ng kh????p v????i m????t kh????u ??a?? nh????p!
                </p>
              </IonText>
            )}

            <IonRadioGroup
              value={selectedCheckBox}
              onIonChange={(e) => setSelectedCheckBox(e.detail.value)}
            >
              <IonListHeader>
                <IonLabel color="success">Ba??n la??:</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel>Gia??o vi??n</IonLabel>
                <IonRadio color="success" value="2" />
              </IonItem>
              <IonItem>
                <IonLabel>Ho??c vi??n</IonLabel>
                <IonRadio color="success" value="3" />
              </IonItem>
              <IonItem>
                <IonLabel>Trung t??m</IonLabel>
                <IonRadio color="success" value="4" />
              </IonItem>
            </IonRadioGroup>

            <IonItem>
              <IonLabel>T??i ?????ng ?? v???i <IonText color="success">ch??nh s??ch & ??i???u kho???n</IonText></IonLabel>
              <IonCheckbox slot="start" color="success" />
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                ????ng ky??
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: Login,
});
