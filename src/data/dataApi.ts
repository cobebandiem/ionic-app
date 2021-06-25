import { Storage } from '@capacitor/storage';
import { Schedule, Session } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';


const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

//Localhost
// const API_ROOT = 'http://localhost:8888/v1';
// const API_TOKEN = 'http://localhost:8888/v1/auth/login';

//Production
const API_ROOT = 'https://apiyogapm.logsik.net/v1';
const API_TOKEN = 'https://apiyogapm.logsik.net/v1/auth/login';

const encode = encodeURIComponent;
let getToken = async () => {
  var accessToken = Promise.resolve(Storage.get({ key: ACCESS_TOKEN }));
  var token = await accessToken;
  return token;
};
const ACCESS_TOKEN = 'accessToken';

  export const getCurrentUser = async () => {
  var currentUserStore = Promise.resolve(Storage.get({ key: "currentUser" }));
  var userStore = await currentUserStore;
  if(userStore && userStore.value){
    return JSON.parse(userStore.value);
  }
  return null;
};

export const asyncRequests = {
  del: async (url: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson.data;
    } catch (err) {
      return console.log(err);
    }
  },
  get: async (url: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson;
    } catch (err) {
      return console.log(err);
    }
  },
  put: async (url: string, body: Object) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(body)
      });
      const ressultJson = await res.json();
      return ressultJson.data;
    } catch (err) {
      return console.log(err);
    }
  },
  post: async (url: string, body: Object) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(body)
      });
      const ressultJson = await res.json();
      return ressultJson;
    } catch (err) {
      return console.log(err);
    }
  },
  getPage: async (url: string, page: number, size: number) => {
    try {
      if (!size) {
        size = 20;
      }
      if (!page) {
        page = 0;
      } else {
        page = page - 1; // to look url same as pagination
      }
      if (url.indexOf('?') != -1) {
        url = url + '?page=' + encode(page) + '&size=' + encode(size);
      } else {
        url = url + '&page=' + encode(page) + '&size=' + encode(size);
      }
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson.data;
    } catch (err) {
      return console.log(err);
    }
  },
};

export const AuthService = {
  current: async () => {
    const currentUser = await getCurrentUser();
    return currentUser;
  },

  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_TOKEN}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: email, password: password})
      });
      const res_1 = await res.json();
      var token = res_1.accessToken;
      if (token) {
        Storage.set({ key: ACCESS_TOKEN, value: token });
        console.log("Login successfully.");

        var userData = res_1.userData;
        Storage.set({ key: "currentUser", value: JSON.stringify(userData)  });
      }

      return token;
    } catch (err) {
      return console.log(err);
    }
  },
  logout: async () => {
    try {
      await Storage.set({ key: ACCESS_TOKEN, value: "" });
      await Storage.set({ key: "currentUser", value: "" });
      var accessTokenLogout = Promise.resolve(Storage.get({ key: ACCESS_TOKEN }));
      var tokenLogout = await accessTokenLogout;
      console.log("Loout.");

      if(!tokenLogout){
        console.log("Loout successfully.");
      }
    } catch (err) {
      return console.log(err);
    }
  },

  //TODO
  // loginRememberMe: (refreshToken) =>
  //     superagent.post(`${API_TOKEN}`, `refresh_token=${encode(refreshToken)}&grant_type=refresh_token`)
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //         .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
  //         .withCredentials().then(responseBody),

};

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const sessions = parseSessions(schedule);
  const speakers = responseData.speakers as Speaker[];
  const locations = await response[1].json() as Location[];
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  });
  return sessions;
}
