import React, { useState, useEffect } from "react";
import {
  IonToolbar,
  IonItem,
  IonContent,
  IonPage,
  IonAvatar,
  IonLabel,
  IonButtons,
  IonList,
  IonRow,
  IonCol,
  IonMenuButton,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonInput,
  IonHeader,
  getConfig,
  IonTitle,
  IonGrid,

} from "@ionic/react";
import { connect } from "../../../data/connect";
import "../../style.scss";
import * as courseselectors from "./PaymentTeacherSelectors";
import { setSearchText } from "../../../data/sessions/sessions.actions";
import { Payment } from "./Payment";
import { loadListPayment } from "./listPaymentTeacher.actions";
import { notificationsOutline, arrowRedoOutline } from "ionicons/icons";
import styles from "./Account.module.css";

interface OwnProps {}

interface StateProps {
  listPayments: Payment[];
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListPayment: typeof loadListPayment;
}

type ListPaymentPageProps = OwnProps & StateProps & DispatchProps;

const ProfileAgentPage: React.FC<ListPaymentPageProps> = ({
  listPayments,
  setSearchText,
  loadListPayment,
  mode,
}) => {

  const [totalPoint, setTotalPoint] = useState<string>("Nguyễn Văn A");
  const [deposit, setDeposit] = useState<string>("20 Vũ Tông Phan, Q2, TP. Thủ Đức");
  const [depositWaiting, setDepositWaiting] = useState<string>("0584781946");
  const [withdrawalSuggest, setWithdrawalSuggest] = useState<string>();
  const [dateRequest, setDateRequest] = useState<string>();

  return (
    <IonPage id="list-user-page" className="list-profile-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>
          <IonTitle className="c-white">Thông tin cá nhân</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon
                className="c-white"
                slot="icon-only"
                icon={notificationsOutline}
              />
            </IonButton>
            <IonButton routerLink="/teacher/profile">
            <div className="button-container-img">
              <img
                src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
                alt="avatar"
              />
            </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className="custom-toolbar">
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonGrid>
      <IonRow className="ion-text-center ion-justify-content-center">
            <IonCol size="4" className="animate__animated animate__fadeInTopLeft animate__faster">
                <img src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png" className={ styles.avatar } alt="account avatar" />
            </IonCol>
      </IonRow>
      </IonGrid>
      <form noValidate>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Họ và tên
              </IonLabel>
              <IonInput readonly value={totalPoint} placeholder="Nhập số điểm tổng cộng" onIonChange={e => setTotalPoint(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Địa chỉ
              </IonLabel>
              <IonInput value={deposit} placeholder="Nhập số dư khả dụng" onIonChange={e => setDeposit(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Số điện thoại
              </IonLabel>
              <IonInput value={depositWaiting} placeholder="Nhập số dư rút đang chờ" onIonChange={e => setDepositWaiting(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Chứng chỉ Yoga
              </IonLabel>
              <IonInput value={withdrawalSuggest} placeholder="Nhập đề nghị rút thêm" onIonChange={e => setWithdrawalSuggest(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Quốc tịch
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              CMND/Căn Cước/Passport
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Khu vực dạy
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Level
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Điểm chuẩn
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Giới tính
              </IonLabel>
              <IonInput placeholder="Nhập ngày yêu cầu"></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="button" expand="block">
                Lưu thông tin
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/teacher/paymentHistory" color="light" expand="block">
                Trở về
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listPayments: courseselectors.getFilteredPayments(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListPayment,
  },
  component: React.memo(ProfileAgentPage),
});
