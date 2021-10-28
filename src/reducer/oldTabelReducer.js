export default function TabelReducer(state = "", action) {
    switch (action.type) {
        case "GET_TABLE_DATA":
            return {
                ...state,
                tenantList: action.tenantList ? action.tenantList : "",
                appsList: action.appsList ? action.appsList : "",
                tenantSelected: action.tenantSelected ? action.tenantSelected : "",
                defaultStatus: action.defaultStatus
            };
        case "GET_SELECTED_DATA":
            return {
                ...state,
                tenantSelected: action.tenantSelected ? action.tenantSelected : "",
                defaultStatus: action.defaultStatus
            };
        case "CHANGE_STATUS":
            return {
                ...state,
                tableStatus: action.status,
                CurrentSelect: action.value
            }
        case "CHANGE_SUB_MENU_STATUS":
            return {
                ...state,
                SubMenuStatus: action.status
            }
        case "GET_SUB_MENU_TABLE_DATA":
            return {
                ...state,
                dataList: action.dataList ? action.dataList : "",
                TabList: action.TabList ? action.TabList : ""
            }
        case "GET_SCHEMA_DATA":
            return {
                ...state,
                entityList: action.entityList
            }
        default:
            return state;
    }
}