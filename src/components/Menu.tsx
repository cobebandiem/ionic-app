import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import {
  business,
  people,
  logIn,
  logOut,
  person,
  bookmark,
  ribbon,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";
import { connect } from "../data/connect";
import { AuthService } from "../data/dataApi";
import { setDarkMode } from "../data/user/user.actions";
// import { getCurrentUser } from '../data/dataApi';
import { User } from "../pages/admins/user/User";
import "../pages/style.scss";

const routes = {
  appPages: [
    // { title: 'Giới Thiệu', path: '/about', icon: informationCircle }
  ],
  loggedInAdminPages: [
    { title: "Huấn Luyện Viên", path: "/listTeacher", icon: person },
    { title: "Học Viên", path: "/listLearner", icon: people },
    { title: "Trung Tâm", path: "/listHost", icon: bookmark },
    { title: "Địa Điểm", path: "/listPlace", icon: business },
    { title: "Khoá Học", path: "/listCourse", icon: ribbon },
  ],
  loggedOutPages: [
    { title: "Đăng Xuất", path: "/", icon: logOut },
  ],
  teacherPages: [
    { title: "Khoá Học", path: "/teacher/listCourse", icon: ribbon },
    { title: "Thanh Toán", path: "/teacher/listPayment", icon: bookmark }
  ],
};

interface Pages {
  title: string;
  path: string;
  icon: string,
  routerDirection?: string;
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode;
  // user?: User;
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC<MenuProps> = ({
  darkMode,
  history,
  isAuthenticated,
  setDarkMode,
  menuEnabled,
}) => {
  const [currentUser, setCurrentUser] = useState(Object);
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} className="icon-custom" />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  useEffect(() => {
    AuthService.current().then((user: User) => {
      setCurrentUser(user);
    });
  }, [currentUser]);


  if (currentUser.roleId === 1) {
    return (
      <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{currentUser ? currentUser.username : ""}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="outer-content">
            <IonListHeader>Quản Lý</IonListHeader>
            {isAuthenticated
              ? renderlistItems(routes.loggedInAdminPages)
              : null}
            <IonList>
              <IonItem>
                <IonLabel>Màn hình tối</IonLabel>
                <IonToggle
                  checked={darkMode}
                  onClick={() => setDarkMode(!darkMode)}
                />
              </IonItem>
            </IonList>
            <IonList>
              <IonListHeader>Quản Lý Tài Khoản</IonListHeader>
              {isAuthenticated
                ? renderlistItems(routes.loggedOutPages)
                : renderlistItems(routes.loggedOutPages)}
            </IonList>
            <IonList>
              <IonItem>
                <IonLabel>Phiên bản 1.0.0</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
      </IonMenu>
    );
  } else {
    return (
      <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{currentUser ? currentUser.username : ""}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="outer-content">
          <IonList>
            <IonListHeader>Quản Lý Khoá Học</IonListHeader>
            {isAuthenticated
              ? renderlistItems(routes.teacherPages)
              : renderlistItems(routes.teacherPages)}
          </IonList>
          <IonList>
            <IonListHeader>Quản Lý Tài Khoản</IonListHeader>
            {isAuthenticated
              ? renderlistItems(routes.loggedOutPages)
              : renderlistItems(routes.loggedOutPages)}
          </IonList>
          <IonList>
              <IonItem>
                <IonLabel>Phiên bản 1.0.0</IonLabel>
              </IonItem>
            </IonList>
        </IonContent>
      </IonMenu>
    );
  }
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: {
    setDarkMode,
  },
  component: withRouter(Menu),
});
