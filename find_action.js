let actionToMetadataMapping = [{"action_name":"update_app","criteria":["property","env","app_name"]}]
let acl = [{"user":"arbhatta","target":{"property":"test","env":"dev","app_name":"test-app"},"action_type":"update","action":"app_update"}]

function getCriteriaForAction(actionName) {
    let metadataList = actionToMetadataMapping.find(action => action.action_name === actionName)
    return metadataList ? metadataList.criteria : []
}

function checkAccess(authContext) {
    let action = authContext['action'];
    let criteria = getCriteriaForAction(action);

    let target = {};
    for (let i = 0; i < criteria.length; i++) {
        target[criteria[i]] = authContext[criteria[i]];
    }

    let searchCriteria = {
        "user": authContext['uid'],
        "target": target,
        "action_type": authContext['method'],
        "action": authContext['action']
    };

    for (let i = 0; i < acl.length; i++) {
        if (JSON.stringify(acl[i]) === JSON.stringify(searchCriteria)) {
            return true;
        }
    }

    return false;
}


function helloWorld(authContext){

}