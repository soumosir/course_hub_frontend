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

    public async getWishlist(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url:'https://localhost:8443/api/course/wishlist',
        };

        const response = axios(options)
        return response
    }

    public async getMyCreatedCourses(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url:'https://localhost:8443/api/createdcourses',
        };
        const response = axios(options)
        return response
    }

    

    public async addToWishlist(request: any): Promise<any> {
        const options = {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}`, 'content-type': 'application/json' },
            data: request,
            url:'https://localhost:8443/api/course/addwishlist',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

    public async removeFromWishlist(request: any): Promise<any> {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}`, 'content-type': 'application/json' },
            data: request,
            url:'https://localhost:8443/api/course/removewishlist',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

    public async addUser(user: any) {
        const response = await axios.post(`/api/user`, {user});
        return response.data;
    }

    public async unenrollCourse(request: any): Promise<any> {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}`, 'content-type': 'application/json' },
            data: request,
            url:'https://localhost:8443/api/course/unenrolluser',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

}
