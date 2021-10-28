import axios from 'axios';
import Allapi from './Allapi';
class TableApi {
    static getTenantApi(currentData,status) {
        return axios.get(Allapi.api["Table"]);
    }
    static getSubMenuDetailsApi(data) {
        return axios.get(Allapi.api["tableDetails"],{
           // "keys":data
        });
    }
    static getEntityDetailsApi(id) {
        return axios.get(Allapi.api["schemaDetails"],{
           // "keys":data
        });
    }
    
    
}
export default TableApi;