import TableApi from "../api/TableApi";
import dictionaryData from '../components/common/data';
import datasetList from '../components/dictionary/dataset';
import entityList from "../components/dictionary/entityTable/entityData"

export function getTenant(status, currentData, tenantSelected) {
  let newApps = [];
  let Selected = "";
  return function (dispatch, getState) {
    return TableApi.getTenantApi(status, currentData, tenantSelected)
      .then(response => {
        //console.log('first data', response.data);
        console.log('first data', dictionaryData.elements);
        if (status) {
          //console.log("history", currentData);
          const defaultTenant = dictionaryData.elements[0].mainMember;
          let defaultSelect = { label: defaultTenant, value: defaultTenant }
          dictionaryData.elements.map((value, i) => {
            if (value.mainMember === defaultTenant) {
              value.apps.map((app) => {
                newApps.push(app)
              });
              dispatch({
                type: "GET_SELECTED_DATA",
                tenantSelected: defaultSelect,
                defaultStatus: status,
                tenantList: dictionaryData.elements,
                appsList: newApps.sort((a, b) => (a.opan > b.opan) ? 1 : -1)
              });
            }
          });
          //console.log("newApps",newApps);
          currentData.push("/dictionary" + "/" + defaultTenant + "/" + newApps[0].opan);
        }
        else {
          //console.log("tenantSelected",tenantSelected);
          dictionaryData.elements.map((value, i) => {
            if (value.mainMember === currentData) {
              value.apps.map((app) => {
                newApps.push(app)
              });
              if (!status) {
                Selected = tenantSelected
              }
              dispatch({
                type: "GET_TABLE_DATA",
                tenantList: dictionaryData.elements,
                appsList: newApps.sort((a, b) => (a.opan > b.opan) ? 1 : -1),
                tenantSelected: Selected,
                defaultStatus: status
              });
            }
          });
        }
      })
      .catch(error => console.log(error))
  }
}

export function getSubMenuDetails(id, data, status) {
  let index = 0;
  let DefaultInfo = "";
  let TabIndex = status ? data : 0;
  return function (dispatch, getState) {
    return TableApi.getSubMenuDetailsApi(id)
      .then(response => { //response.data = datasetList
        DefaultInfo = Object.keys(datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs);
        if (DefaultInfo && DefaultInfo.length > 0) {
          dispatch({
            type: "GET_SUB_MENU_TABLE_DATA",
            serviceName: datasetList.mNm, 
            sQueryLink: datasetList.mQueryLink,
            dataList: datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs[DefaultInfo[TabIndex]],
            TabList: Object.keys(datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs),
            selectedTab: Object.keys(datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs)[TabIndex],
          });
          let defaultData = datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs[DefaultInfo[TabIndex]] && datasetList && datasetList.envInfo && datasetList.envInfo[index] && datasetList.envInfo[index].tabs[DefaultInfo[TabIndex]].map((data, index) => data.id);
          if (defaultData.length > 0) {
            dispatch(getEntityDetails(defaultData.toString().split(",")[0]))
          }
        }
      })
      .catch(error => console.log(error))
  }
}

export function ChangeTableData(value, status) {
  return function (dispatch) {
    dispatch({
      type: "CHANGE_STATUS", value, status
    });
  }
}

export function subMenuChange(status) {
  return function (dispatch) {
    dispatch({
      type: "CHANGE_SUB_MENU_STATUS", status
    });
  }
}

export function getEntityDetails(id) {
  return function (dispatch, getState) {
    return TableApi.getEntityDetailsApi(id)
      .then(response => {
        dispatch({
          type: "GET_ENTITY_TABLE_DATA",
          entityList: entityList //response.data
        });
      })
      .catch(error => console.log(error))
  }
}