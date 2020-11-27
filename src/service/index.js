import iHttp from './http'

const request = new iHttp({
    baseURL: 'http://localhost:8080',
}).api;

class Service {

    constructor() {}

    EventList(params = {}) {
        return request.get('/EventList', { params });
    }

}

export {
    Service,
    Service as default
}