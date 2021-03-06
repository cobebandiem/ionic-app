import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { AuthService } from './data/dataApi';
import { loadConfData } from './data/sessions/sessions.actions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Support from './pages/Support';
import Tutorial from './pages/Tutorial';
import HomeOrTutorial from './components/HomeOrTutorial';
import { Schedule } from "./models/Schedule";
import RedirectToLogin from './components/RedirectToLogin';

/* Theme variables */
import './theme/variables.css';

//Thêm
import ListTeacherPage from './pages/admins/teacher/ListTeacherPage';
import AddTeacherPage from './pages/admins/teacher/AddTeacherPage';
import ListLearnerPage from './pages/admins/learner/ListLearnerPage';
import AddLearnerPage from './pages/admins/learner/AddLearnerPage';
import ListHostPage from './pages/admins/host/ListHostPage';
import AddHostPage from './pages/admins/host/AddHostPage';
import ListPlacePage from './pages/admins/place/ListPlacePage';
import AddPlacePage from './pages/admins/place/AddPlacePage';
import ListCoursePage from './pages/admins/course/ListCoursePage';
import AddCoursePage from './pages/admins/course/AddCoursePage';
import ListCourseTeacherPage from './pages/agents/course/ListCoursePage';
import AddCourseTeacherPage from './pages/agents/course/AddCoursePage';
import ListPaymentTeacherPage from './pages/agents/payment/ListPaymentTeacherPage';

import SubjectDetailPage from './pages/agents/course/SubjectDetailPage';
import MyInvoicePage from './pages/agents/course/MyInvoicePage';
import PaymentHistoryPage from './pages/agents/payment/PaymentHistoryPage';
import WithdrawalSuggestPage from './pages/agents/payment/WithdrawalSuggestPage';
import ProfileAgentPage from './pages/agents/payment/ProfileAgentPage';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  schedule: Schedule;
  isAuthenticated: boolean,
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps { }



const IonicApp: React.FC<IonicAppProps> = ({ darkMode, schedule, isAuthenticated, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {

  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);

  return (
    schedule.groups.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              {isAuthenticated ? <Menu /> : ''}
              <IonRouterOutlet id="main">
                {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
                <Route path="/tabs" render={() => <MainTabs />} />
                <Route path="/account" component={Account} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/support" component={Support} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/logout" render={() => {
                  return <RedirectToLogin
                    setIsLoggedIn={setIsLoggedIn}
                    setUsername={setUsername}
                  />;
                }} />
                <Route path="/" component={HomeOrTutorial} exact />

                {/* Thêm */}
                <Route path="/" component={Login} exact />
                <Route path="/listTeacher" component={ListTeacherPage} />
                <Route path="/addTeacher" component={AddTeacherPage} />
                <Route path="/listLearner" component={ListLearnerPage} />
                <Route path="/addLearner" component={AddLearnerPage} />
                <Route path="/listHost" component={ListHostPage} />
                <Route path="/addHost" component={AddHostPage} />
                <Route path="/listPlace" component={ListPlacePage} />
                <Route path="/addPlace" component={AddPlacePage} />
                <Route path="/listCourse" component={ListCoursePage} />
                <Route path="/addCourse" component={AddCoursePage} />
                {/* Route Teacher */}
                <Route path="/teacher/listCourse" component={ListCourseTeacherPage} />
                <Route path="/teacher/addCourse" component={AddCourseTeacherPage} />
                <Route path="/teacher/listPayment" component={ListPaymentTeacherPage} />

                <Route path="/teacher/subjectDetail" component={SubjectDetailPage} />
                <Route path="/teacher/myInvoice" component={MyInvoicePage} />
                <Route path="/teacher/paymentHistory" component={PaymentHistoryPage} />
                <Route path="/teacher/withdrawal" component={WithdrawalSuggestPage} />
                <Route path="/teacher/profile" component={ProfileAgentPage} />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
    isAuthenticated: state.user.isLoggedin,
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});
