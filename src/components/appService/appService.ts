import axios from 'axios';
import qs from 'qs';

export class AppService {


    public async getCourses(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url:'https://localhost:8443/api/course',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

    public async addUser(user: any) {
        const response = await axios.post(`/api/user`, {user});
        return response.data;
    }

}
