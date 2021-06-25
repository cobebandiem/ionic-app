import { asyncRequests } from '../../../data/dataApi';

export function loadTeachers() {
  return new Promise((resolve, rejects) => {
      const teacher = asyncRequests.get("/agents?all=true&include=user");
      if (teacher) {
          resolve(teacher);
      } else {
          resolve(null);
      }
  })
}
export function loadPlaces() {
  return new Promise((resolve, rejects) => {
      const place = asyncRequests.get("/places?all=true&include=host");
      if (place) {
          resolve(place);
      } else {
          resolve(null);
      }
  })
}


