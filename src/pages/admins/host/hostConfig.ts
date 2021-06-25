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


