import TableApi from "../api/TableApi";
import dictionaryData from '../components/common/data';
import datasetList from '../components/dictionary/dataset';
import entityList from "../components/dictionary/entityTable/entityData"
export function getTenant(currentData,status,tenantSelected) {
    let newApps = [];
    let Selected = "";
    return function(dispatch, getState) {
        return TableApi.getTenantApi(currentData,status,tenantSelected)
        .then(response => {
            console.log('first data', dictionaryData.elements)
            dictionaryData.elements.map((value, i) => {
                if (value.mainMember === currentData) {
                    value.apps.map((app) => {
                        newApps.push(app)
                    });
                    if(!status){
                        Selected = tenantSelected
                    }
                    dispatch({
                            type: "GET_TABLE_DATA",
                            tenantList:dictionaryData.elements,
                            appsList: newApps,
                            tenantSelected:Selected,
                            defaultStatus:status
                        });
                    // this.setState({
                    //     tenantList: dictionaryData.elements,
                    //     appsList: newApps,
                    // });
                }
            });
            if (status) {
                const defaultTenant = dictionaryData.elements[1].mainMember;
                let defaultSelect = { label: defaultTenant, value: defaultTenant }
                // this.setState({
                //     tenantSelected: defaultSelect,
                // })
                dispatch({
                    type: "GET_SELECTED_DATA",
                    tenantSelected: defaultSelect,
                    defaultStatus:status
                });
            }
            //	this.handleChangeType({ label: defaultTenant, value: defaultTenant });
        })
        .catch(error => console.log(error))
    }
}
export function getSubMenuDetails(data) {
    //console.log("dasd"+datasetList.mQueryLink)
    let index = 0;
    return function(dispatch, getState) {
        return TableApi.getSubMenuDetailsApi(data)
        .then(response => {
            dispatch({
                type: "GET_SUB_MENU_TABLE_DATA",
                dataList:datasetList.envInfo[index].tabs[data],
                TabList:Object.keys(datasetList.envInfo[index].tabs)
            });
        })
        .catch(error => console.log(error))
    }
}

export function ChangeTableData(value,status){
      return function(dispatch){
        dispatch({
            type: "CHANGE_STATUS",value,status
        });
      }
}
export function subMenuChange(status){
    return function(dispatch){
      dispatch({
          type: "CHANGE_SUB_MENU_STATUS",status
      });
    }
}

export function getSchemaDate(id) {
    return function(dispatch, getState) {
        return TableApi.getSchemaDateApi(id)
        .then(response => {
            console.log(entityList)
            dispatch({
                type: "GET_SCHEMA_DATA",
                entityList:entityList
            });
        })
        .catch(error => console.log(error))
    }
}

