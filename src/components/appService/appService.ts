import axios from 'axios';
import qs from 'qs';

export class AppService {


    public async getCourses(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZHV0dGEiLCJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMvYXBpL2xvZ2luIiwiZXhwIjoxNjY5OTI5NzcwfQ.5aBNcusBNLX7WvuGgQmLCyIKZ2pVib775fzdRoErVqs' },
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