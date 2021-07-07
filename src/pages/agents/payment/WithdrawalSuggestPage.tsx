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
} from "@ionic/react";
import { connect } from "../../../data/connect";
import "../../style.scss";
import * as courseselectors from "./PaymentTeacherSelectors";
import { setSearchText } from "../../../data/sessions/sessions.actions";
import { Payment } from "./Payment";
import { loadListPayment } from "./listPaymentTeacher.actions";
import { notificationsOutline, arrowRedoOutline } from "ionicons/icons";
import styles from "./TransactionItem.module.css";

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

const WithdrawalSuggestPage: React.FC<ListPaymentPageProps> = ({
  listPayments,
  setSearchText,
  loadListPayment,
  mode,
}) => {

  const [totalPoint, setTotalPoint] = useState<string>("10.000 ypt");
  const [deposit, setDeposit] = useState<string>("3.000 ypt");
  const [depositWaiting, setDepositWaiting] = useState<string>("2.000.000 ypt");
  const [withdrawalSuggest, setWithdrawalSuggest] = useState<string>();
  const [dateRequest, setDateRequest] = useState<string>("30-6-2021");

  return (
    <IonPage id="list-user-page" className="list-withdrawal-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>
          <IonTitle className="c-white">Đề nghị rút tiền</IonTitle>
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

      <IonContent class="outer-content">
      <form noValidate>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Số điểm tổng cộng
              </IonLabel>
              <IonInput value={totalPoint} placeholder="Nhập số điểm tổng cộng" onIonChange={e => setTotalPoint(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Số dư khả dụng
              </IonLabel>
              <IonInput value={deposit} placeholder="Nhập số dư khả dụng" onIonChange={e => setDeposit(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Số dư rút đang chờ
              </IonLabel>
              <IonInput value={depositWaiting} placeholder="Nhập số dư rút đang chờ" onIonChange={e => setDepositWaiting(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Đề nghị rút thêm
              </IonLabel>
              <IonInput value={withdrawalSuggest} placeholder="Nhập đề nghị rút thêm" onIonChange={e => setWithdrawalSuggest(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Ngày yêu cầu
              </IonLabel>
              <IonInput value={dateRequest} placeholder="Nhập ngày yêu cầu" onIonChange={e => setDateRequest(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="button" expand="block">
                Gửi duyệt
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/teacher/paymentHistory" color="light" expand="block">
                Trở về
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
        <IonRow className={styles.heading}>
          <IonCol size="12">
            <h4 style={{ color: "rgb(0 0 0 / 85%)", textAlign: "center" }}>Các đề nghị đang chờ</h4>
          </IonCol>
        </IonRow>
        <IonRow id="1" className="animate__animated">
          <IonCol size="12">
            <IonList className={styles.transactionList}>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "red" }} className={styles.avatarImage}>
                      -
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>03-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.red}>- 1.500.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "red" }} className={styles.avatarImage}>
                      -
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>05-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.red}>- 500.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>
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
  component: React.memo(WithdrawalSuggestPage),
});
