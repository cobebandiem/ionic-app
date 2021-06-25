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
import { RouteComponentProps } from "react-router";
import { connect } from "../../../data/connect";
import { asyncRequests } from "../../../data/dataApi";
import "../../style.scss";
import { loadListPlace } from "./listPlace.actions";
import { Place } from "./Place";
import { toast } from "../../../toast";
import { loadHosts } from "./placeConfig";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listPlaceOptions: Place[];
}

interface DispatchProps {
  loadListPlace: typeof loadListPlace;
}

type AddPlaceProps = OwnProps & StateProps & DispatchProps;

const AddPlacePage: React.FC<AddPlaceProps> = ({
  loadListPlace,
  history,
}) => {
  const [address, setAddress] = useState<string>();
  const [addressError, setAddressError] = useState(false);
  const [host, setHost] = useState(Object);
  const [hostError, setHostError] = useState(false);
  const [dataHost, setDataHost] = useState([]);
  const [serviceProvince, setServiceProvince] = useState<string>();
  const [serviceDistrict, setServiceDistrict] = useState<string>();
  const [name, setName] = useState<string>();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  useEffect(() => {
    loadHosts().then((host: any) => {
      if (host) {
        setDataHost(host.data);
      }
    });
  }, []);

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!address) {
      setAddressError(true);
    }
    if (!host) {
      setHostError(true);
    }

    var url = "/places";
    var bodyObject = {
      hostId: host ? host.id : null,
      address: address,
      name: name,
      serviceProvince : serviceProvince ? serviceProvince.split(',') : [],
      serviceDistrict : serviceDistrict ? serviceDistrict.split(',') : [],
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Thêm Địa Điểm Thành Công!");
        history.push("/listPlace");
        loadListPlace();
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
          <IonTitle className='c-white'>Thêm Địa Điểm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddPlace}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Trung Tâm
              </IonLabel>
              <IonSelect
                value={host}
                placeholder="Chọn Trung Tâm"
                onIonChange={(e) => setHost(e.detail.value!)}
              >
                {dataHost
                  ? dataHost.map((data: any) => (
                      <IonSelectOption key={data.id} value={data}>
                        {data.companyName}
                      </IonSelectOption>
                    ))
                  : null}
              </IonSelect>
              {formSubmitted && hostError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Chọn Trung Tâm!</p>
              </IonText>
            )}
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên
              </IonLabel>
              <IonInput
                value={name}
                placeholder="Nhập tên địa điểm"
                onIonChange={(e) => setName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Địa chỉ
              </IonLabel>
              <IonInput
                value={address}
                placeholder="Nhập địa chỉ"
                onIonChange={(e) => setAddress(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {formSubmitted && addressError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Địa Chỉ!</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Dịch vụ tại quận
              </IonLabel>
              <IonInput value={serviceProvince} placeholder="Dịch vụ tại quận" onIonChange={e => setServiceProvince(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Dịch vụ tại đường
              </IonLabel>
              <IonInput value={serviceDistrict} placeholder="Dịch vụ tại đường" onIonChange={e => setServiceDistrict(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Thêm
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listPlace" color="light" expand="block">
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
    loadListPlace,
  },
  component: AddPlacePage,
});
