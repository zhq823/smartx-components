import axios from 'axios'
import qs from 'qs'

class iHttp {

    constructor(options) {
        const { baseURL } = options;
        this.api = axios.create({ baseURL });
        this.injectRequest();
        this.injectResponse();
    }

    injectRequest() {
        this.api.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        this.api.interceptors.request.use(config => {
            if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                config.data = qs.stringify(config.data);
            }
            this.appendHeader(config);
            return config;
        });
    }

    injectResponse() {
        this.api.interceptors.response.use(response => {
            return response.data || null;
        });
    }

    appendHeader(config) {
        var token = ""
        if (token && token != null) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
    }

}
export default iHttp;