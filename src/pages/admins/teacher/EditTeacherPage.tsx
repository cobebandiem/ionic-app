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
      // active: {value: 1, label: "Hoạt động"},
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Chỉnh Sửa Huấn Luyện Viên Thành Công!");
        history.push("/listTeacher");
        window.location.reload();
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

  return !isEmpty(teacher) ? (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="success"></IonMenuButton>
          </IonButtons>
          <IonTitle>Chỉnh Sửa Huấn Luyện Viên</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddTeacher}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên đăng nhập
              </IonLabel>
              <IonInput value={teacher.user.username} placeholder="Nhập tên đăng nhập" disabled onIonChange={e => setUserName(e.detail.value!)}></IonInput>
            </IonItem>
            {formSubmitted && userNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Tên Đăng Nhập!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Họ và tên
              </IonLabel>
              <IonInput value={teacher.user.fullName} placeholder="Nhập họ và tên" clear-on-edit={true} onIonChange={e => setFullName(e.detail.value!)} clearInput></IonInput>
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
              <IonInput value={teacher.user.email} placeholder="Nhập email" type="email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
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
              <IonInput value={teacher.user.phone} placeholder="Nhập số điện thoại" type="number" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
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
              <IonInput value={teacher.user.address} placeholder="Nhập địa chỉ" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
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
              <IonInput value={teacher.user.cmndNumber} placeholder="Nhập số CMND" type="number" onIonChange={e => setCmndNumber(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày Cấp (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={teacher.user.cmndIssueDate}
                onIonChange={(e) => setCmndIssueDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Nơi cấp
              </IonLabel>
              <IonInput value={teacher.user.cmndIssuePlace} placeholder="Nhập nơi cấp" onIonChange={e => setCmndIssuePlace(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Sở thích
              </IonLabel>
              <IonInput value={teacher.skillList} placeholder="Sở thích" onIonChange={e => setSkillList(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Dịch vụ tại quận
              </IonLabel>
              <IonInput value={teacher.serviceProvince} placeholder="Dịch vụ tại quận" onIonChange={e => setServiceProvince(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Dịch vụ tại đường
              </IonLabel>
              <IonInput value={teacher.serviceDistrict} placeholder="Dịch vụ tại đường" onIonChange={e => setServiceDistrict(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Thêm
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listTeacher" color="light" expand="block">
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
  ) : null;
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListTeacher,
  },
  component: AddTeacherPage,
});