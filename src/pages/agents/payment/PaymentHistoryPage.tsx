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
  IonModal,
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

const PaymentHistoryPage: React.FC<ListPaymentPageProps> = ({
  listPayments,
  setSearchText,
  loadListPayment,
  mode,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    loadListPayment();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>
          <IonTitle className="c-white">Lịch Sử Thanh Toán</IonTitle>
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
        <IonRow className={styles.heading}>
          <IonCol size="12">
            <h4 style={{ color: "#5e5959d9" }}>Giao dịch gần đây</h4>
          </IonCol>
        </IonRow>
        <IonRow id="1" className="animate__animated">
          <IonCol size="12">
            <IonList className={styles.transactionList}>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>01-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 2.000.000 Ypt</h4>
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
                    <h2>04-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.red}>- 500.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>05-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 5.000.000 Ypt</h4>
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
                    <h2>06-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.red}>- 9.150.000 Ypt</h4>
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
                    <h2>08-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.red}>- 15.000.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>11-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 5.000.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>15-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 5.000.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>20-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 8.000.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
              <IonItem lines="full" detail={false} className={`item-text-wrap ion-text-wrap ${styles.transactionItem}`}>
                <div className={styles.transactionItemContent}>
                  <IonAvatar slot="start">
                    <div style={{ borderColor: "#b4a5a540", color: "#fff", backgroundColor: "#00a500" }} className={styles.avatarImage}>
                      +
                    </div>
                  </IonAvatar>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h2>25-07-2021</h2>
                  </IonLabel>

                  <IonLabel className={`ion-text-wrap ${styles.transactionContent}`}>
                    <h4 className={styles.green}>+ 5.000.000 Ypt</h4>
                  </IonLabel>
                </div>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
              <IonButton routerLink="/teacher/withdrawal" color="success" expand="block">
                Rút Tiền
                <IonIcon slot="end" icon={ arrowRedoOutline } />
                </IonButton>
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
  component: React.memo(PaymentHistoryPage),
});
