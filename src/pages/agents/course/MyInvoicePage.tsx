import React, { useState, useRef, useEffect } from "react";
import {
  IonIcon,
  IonRow,
  IonImg,
  IonCol,
  IonToolbar,
  IonGrid,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonSearchbar,
  IonHeader,
  getConfig,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText
} from "@ionic/react";
import { connect } from "../../../data/connect";
import * as courseselectors from "./CourseSelectors";
import { setSearchText } from "../../../data/sessions/sessions.actions";
import { Course } from "./Course";
import { loadListCourse } from "./listCourse.actions";
import { notificationsOutline } from "ionicons/icons";
import "../../style.scss";

interface OwnProps {}

interface StateProps {
  listCourses: Course[];
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListCourse: typeof loadListCourse;
}

type ListCoursePageProps = OwnProps & StateProps & DispatchProps;

const MyInvoicePage: React.FC<ListCoursePageProps> = ({
  listCourses,
  setSearchText,
  loadListCourse,
  mode,
}) => {

  useEffect(() => {
    loadListCourse();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>
          <IonTitle className="c-white">Đơn Hàng Của Tôi</IonTitle>
          <IonButtons slot="end">
          <IonButton>
							<IonIcon className='c-white' slot="icon-only" icon={ notificationsOutline } />
						</IonButton>
						<div className="button-container-img">
							<img src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png" alt="avatar" />
						</div>
					</IonButtons>
        </IonToolbar>

        <IonToolbar className="custom-toolbar">
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm kiếm đơn hàng"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonCard>
			<IonCardHeader>
				<IonCardTitle style={{fontSize: 20, fontWeight: 500}}>Yoga Thư Giãn</IonCardTitle>
				<IonCardSubtitle>Khoá học Yoga bổ ích nhằm nâng cao sức khoẻ</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid>
					<IonRow className="ion-margin-bottom">
						<IonCol size="5">
							<img src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga6.jpg" alt="product" />
						</IonCol>

						<IonCol size="7">

							<IonText>
								<IonCardSubtitle style={{fontSize: 15}}>Thông tin khoá học</IonCardSubtitle>
                <p>Trung Tâm: Cơ Sở 1</p>
								<p>Giờ bắt đầu: 18:00 PM</p>
                <p>Giờ kết thúc: 20:00 PM</p>
                <p>Ngày bắt đầu: 1-7-2021</p>
                <p>Ngày kết thúc: 8-8-2021</p>
                <p>Giá tiền: 2.500.000 Đ</p>
							</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
    <IonCard>
			<IonCardHeader>
				<IonCardTitle style={{fontSize: 20, fontWeight: 500}}>Yoga Tại Nhà</IonCardTitle>
				<IonCardSubtitle>Khoá học Yoga bổ ích nhằm nâng cao sức khoẻ</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid>
					<IonRow className="ion-margin-bottom">
						<IonCol size="5">
							<img src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga8.jpg" alt="product" />
						</IonCol>

						<IonCol size="7">

							<IonText>
								<IonCardSubtitle style={{fontSize: 15}}>Thông tin khoá học</IonCardSubtitle>
                <p>Trung Tâm: Cơ Sở 1</p>
								<p>Giờ bắt đầu: 18:00 PM</p>
                <p>Giờ kết thúc: 20:00 PM</p>
                <p>Ngày bắt đầu: 1-7-2021</p>
                <p>Ngày kết thúc: 8-8-2021</p>
                <p>Giá tiền: 2.500.000 Đ</p>
							</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
    <IonCard>
			<IonCardHeader>
				<IonCardTitle style={{fontSize: 20, fontWeight: 500}}>Yoga Bà Bầu</IonCardTitle>
				<IonCardSubtitle>Khoá học Yoga bổ ích nhằm nâng cao sức khoẻ</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid>
					<IonRow className="ion-margin-bottom">
						<IonCol size="5">
							<img src="http://media.hanoitv.vn/files/hoangmanh/2019-07-07/Yoga4.jpg" alt="product" />
						</IonCol>

						<IonCol size="7">

							<IonText>
								<IonCardSubtitle style={{fontSize: 15}}>Thông tin khoá học</IonCardSubtitle>
                <p>Trung Tâm: Cơ Sở 1</p>
								<p>Giờ bắt đầu: 18:00 PM</p>
                <p>Giờ kết thúc: 20:00 PM</p>
                <p>Ngày bắt đầu: 1-7-2021</p>
                <p>Ngày kết thúc: 8-8-2021</p>
                <p>Giá tiền: 2.500.000 Đ</p>
							</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listCourses: courseselectors.getFilteredCourses(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListCourse,
  },
  component: React.memo(MyInvoicePage),
});
