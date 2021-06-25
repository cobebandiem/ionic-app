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
      // active: {value: 1, label: "Hoạt động"},
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Thêm Trung Tâm Thành Công!");
        history.push("/listHost");
        loadListHost();
      } else {
        toast("Lỗi Lưu trữ!");
        setShowToast(true);
      }
    });
  };
  //

  var optionUserStatus = [
    { label: "Hoạt Động", value: "1" },
    { label: "Không Hoạt Động", value: "0" },
  ];

  return  (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Thêm Trung Tâm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddHost}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên đăng nhập
              </IonLabel>
              <IonInput value={userName} placeholder="Nhập tên đăng nhập" onIonChange={e => setUserName(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && userNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Tên Đăng Nhập!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Mật khẩu
              </IonLabel>
              <IonInput value={password} placeholder="Nhập mật khẩu" type="password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Tên Đăng Nhập!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Họ và tên
              </IonLabel>
              <IonInput value={fullName} placeholder="Nhập họ và tên" onIonChange={e => setFullName(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && fullNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Họ Và Tên!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Email
              </IonLabel>
              <IonInput value={email} placeholder="Nhập email" type="email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && emailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Email!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Số điện thoại
              </IonLabel>
              <IonInput value={phone} placeholder="Nhập số điện thoại" type="number" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && phoneError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Số Điện Thoại!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Trạng thái
              </IonLabel>
              <IonSelect
                value={userStatus}
                placeholder="Chọn Trạng Thái"
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
                Địa chỉ
              </IonLabel>
              <IonInput value={address} placeholder="Nhập địa chỉ" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && addressError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Địa Chỉ!</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Số CMND
              </IonLabel>
              <IonInput value={cmndNumber} placeholder="Nhập số CMND" type="number" onIonChange={e => setCmndNumber(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày Cấp (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={cmndIssueDate}
                onIonChange={(e) => setCmndIssueDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Nơi cấp
              </IonLabel>
              <IonInput value={cmndIssuePlace} placeholder="Nhập nơi cấp" onIonChange={e => setCmndIssuePlace(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên công ty
              </IonLabel>
              <IonInput value={companyName} placeholder="Tên công ty" onIonChange={e => setCompanyName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Mã số thuế
              </IonLabel>
              <IonInput value={taxNumber} placeholder="Mã số thuế" onIonChange={e => setTaxNumber(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Địa chỉ công ty
              </IonLabel>
              <IonInput value={taxAddress} placeholder="Địa chỉ công ty" onIonChange={e => setTaxAddress(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Thêm
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listHost" color="light" expand="block">
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
    loadListHost,
  },
  component: AddHostPage,
});
