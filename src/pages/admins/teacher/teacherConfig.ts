import { asyncRequests } from '../../../data/dataApi';

export function loadTeacherById(id : number) {
  return new Promise((resolve, rejects) => {
      const teacher = asyncRequests.get(`/agents/${id}?include=user`);
      if (teacher) {
          resolve(teacher);
      } else {
          resolve(null);
      }
  })
}


