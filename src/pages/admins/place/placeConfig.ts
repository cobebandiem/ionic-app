import { asyncRequests } from '../../../data/dataApi';

export async function loadCurrentUser(email : string) {
    return new Promise((resolve, rejects) => {
        const project = asyncRequests.get("/auth/getByEmail?email=" +email);
        if (project) {
            resolve(project);

        } else {
            resolve(null);
        }
    })
}
export function loadHosts() {
  return new Promise((resolve, rejects) => {
      const host = asyncRequests.get("/hosts?all=true");
      if (host) {
          resolve(host);
      } else {
          resolve(null);
      }
  })
}


