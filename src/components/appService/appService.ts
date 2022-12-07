import axios from 'axios';
import qs from 'qs';
import { hostUrl } from '../../App';

export class AppService {


    public async getCourses(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url: hostUrl + '/api/course',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

    public async getWishlist(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url: hostUrl + '/api/course/wishlist',
        };

        const response = axios(options)
        return response
    }

    public async getMyCreatedCourses(): Promise<any> {
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
            url: hostUrl + '/api/createdcourses',
        };
        const response = axios(options)
        return response
    }

    

    public async addToWishlist(request: any): Promise<any> {
        const options = {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('courseHubtoken')}`, 'content-type': 'application/json' },
            data: request,
            url: hostUrl + '/api/course/addwishlist',
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
            url: hostUrl + '/api/course/removewishlist',
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
            url: hostUrl + '/api/course/unenrolluser',
        };

        const response = axios(options)
        console.log(response)
        return response
    }

}
