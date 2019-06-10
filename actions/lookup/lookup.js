import _ from 'lodash';

import LookupService from '../../services/lookup/lookup'

export const ACTION_ORG_ID_LOOKUP_REQUESTED = 'org-id-lookup-requested';
export const ACTION_ORG_ID_LOOKUP_REQUESTED_SUCCESS = 'org-id-lookup-requested-success';
export const ACTION_ORG_ID_LOOKUP_REQUESTED_ERROR = 'org-id-lookup-requested-error';

export const ACTION_SITE_ID_LOOKUP_REQUESTED = 'site-id-lookup-requested';
export const ACTION_SITE_ID_LOOKUP_REQUESTED_SUCCESS = 'site-id-lookup-requested-success';
export const ACTION_SITE_ID_LOOKUP_REQUESTED_ERROR = 'site-id-lookup-requested-error';

export const ACTION_LOCATION_ID_LOOKUP_REQUESTED = 'location-id-lookup-requested';
export const ACTION_LOCATION_ID_LOOKUP_REQUESTED_SUCCESS = 'location-id-lookup-requested-success';
export const ACTION_LOCATION_ID_LOOKUP_REQUESTED_ERROR = 'location-id-lookup-requested-error';

export const ACTION_ASSET_ID_LOOKUP_REQUESTED = 'asset-id-lookup-requested';
export const ACTION_ASSET_ID_LOOKUP_REQUESTED_SUCCESS = 'asset-id-lookup-requested-success';
export const ACTION_ASSET_ID_LOOKUP_REQUESTED_ERROR = 'asset-id-lookup-requested-error';

export const ACTION_CLASSIFICATION_LOOKUP_REQUESTED = 'classification-lookup-requested';
export const ACTION_CLASSIFICATION_LOOKUP_SUCCESS = 'classification-lookup-requested-success';
export const ACTION_CLASSIFICATION_LOOKUP_REQUESTED_ERROR = 'classification-lookup-requested-error';

export const ACTION_WORK_TYPE_LOOKUP_REQUESTED = 'work-type-lookup-requested';
export const ACTION_WORK_TYPE_LOOKUP_REQUESTED_SUCCESS = 'work-type-lookup-requested-success';
export const ACTION_WORK_TYPE_LOOKUP_REQUESTED_ERROR = 'work-type-lookup-requested-error';

export const ACTION_OWNER_LOOKUP_REQUESTED = 'owner-lookup-requested';
export const ACTION_OWNER_LOOKUP_REQUESTED_SUCCESS = 'owner-lookup-requested-success';
export const ACTION_OWNER_LOOKUP_REQUESTED_ERROR = 'owner-lookup-requested-error';

export const ACTION_OWNER_GROUP_LOOKUP_REQUESTED = 'owner-group-lookup-requested';
export const ACTION_OWNER_GROUP_LOOKUP_REQUESTED_SUCCESS = 'owner-group-lookup-requested-success';
export const ACTION_OWNER_GROUP_LOOKUP_REQUESTED_ERROR = 'owner-group-lookup-requested-error';

export const ACTION_REPORTED_BY_LOOKUP_REQUESTED = 'reported-by-lookup-requested';
export const ACTION_REPORTED_BY_LOOKUP_REQUESTED_SUCCESS = 'reported-by-lookup-requested-success';
export const ACTION_REPORTED_BY_LOOKUP_REQUESTED_ERROR = 'reported-by-lookup-requested-error';

export const ACTION_PRIORITY_LOOKUP_REQUESTED = 'priority-lookup-requested';
export const ACTION_PRIORITY_LOOKUP_REQUESTED_SUCCESS = 'priority-lookup-requested-success';
export const ACTION_PRIORITY_LOOKUP_REQUESTED_ERROR = 'priority-lookup-requested-error';

export const ACTION_STATUS_LOOKUP_REQUESTED = 'status-lookup-requested';
export const ACTION_STATUS_LOOKUP_REQUESTED_SUCCESS = 'status-lookup-requested-success';
export const ACTION_STATUS_LOOKUP_REQUESTED_ERROR = 'status-lookup-requested-error';

export const ACTION_LABOR_LOOKUP_REQUESTED = 'labor-lookup-requested';
export const ACTION_LABOR_LOOKUP_REQUESTED_SUCCESS = 'labor-lookup-requested-success';
export const ACTION_LABOR_LOOKUP_REQUESTED_ERROR = 'labor-lookup-requested-error';


export const ACTION_CRAFT_LOOKUP_REQUESTED = 'craft-lookup-requested';
export const ACTION_CRAFT_LOOKUP_REQUESTED_SUCCESS = 'craft-lookup-requested-success';
export const ACTION_CRAFT_LOOKUP_REQUESTED_ERROR = 'craft-lookup-requested-error';

export function orgIdLookup(orgId) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_ORG_ID_LOOKUP_REQUESTED, payload: true
      });

      const orgIdLookupData = await LookupService.organizationLookup(getState().user.data.Token, orgId);

      dispatch({
        type: ACTION_ORG_ID_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_ORG_ID_LOOKUP_REQUESTED_SUCCESS, payload: orgIdLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_ORG_ID_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function siteIdLookup(site, orgId) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_SITE_ID_LOOKUP_REQUESTED, payload: true
      });

      const siteIdLookupData = await LookupService.siteLookup(getState().user.data.Token, site, orgId);

      siteIdLookupData.data = _.map(siteIdLookupData.data, (data) => {
        return {
          Description:  data.Label,

          Label: data.Label,
            Language: data.Language,
            OrgId: data.OrgId,
            Organization: data.Organization,
            SiteId:data.siteId
      }
      })

      dispatch({
        type: ACTION_SITE_ID_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_SITE_ID_LOOKUP_REQUESTED_SUCCESS, payload: siteIdLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_SITE_ID_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function locationIdLookup(location, site) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_LOCATION_ID_LOOKUP_REQUESTED, payload: true
      });

      const locationIdLookupData = await LookupService.locationLookup(getState().user.data.Token, location, site);

      locationIdLookupData.data = _.map(locationIdLookupData.data, (data) => {
        return {
          Description: data.Label,
          Label: data.Label,
          Language: data.Language,
          LocationId: data.LocationId,
          OrgId: data.OrgId,
          Site: data.Site,
          SiteId: data.SiteId,
          Status: data.Status,
          Type: data.Type,
        }
      })

      dispatch({
        type: ACTION_LOCATION_ID_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_LOCATION_ID_LOOKUP_REQUESTED_SUCCESS, payload: locationIdLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_LOCATION_ID_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function assetIdLookup(asset, site, location) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_ASSET_ID_LOOKUP_REQUESTED, payload: true
      });

      const assetIdLookupData = await LookupService.assetLookup(getState().user.data.Token, asset, site, location);
      assetIdLookupData.data = _.map(assetIdLookupData.data, (data) => {
        return {
          AssetId: data.AssetId,
          Description: data.Label,
          Id: data.Id,
          Label: data.Label,
          Location: data.Location,
          LocationId: data.LocationId,
          OrgId: data.OrgId,
          Parent: data.Parent,
          Site: data.Site,
          SiteId: data.SiteId,
          Status: data.Status,
        }
      })
      dispatch({
        type: ACTION_ASSET_ID_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_ASSET_ID_LOOKUP_REQUESTED_SUCCESS, payload: assetIdLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_ASSET_ID_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function classificationLookup(classification) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_CLASSIFICATION_LOOKUP_REQUESTED, payload: true
      });

      const classificationLookupData = await LookupService.classificationLookup(getState().user.data.Token, classification);


      classificationLookupData.data = _.map(classificationLookupData.data, (data) => {
        return {
          ClassStructureId: data.ClassStructureId,
          Description: data.Label,
          Id: data.Id,
          Label: data.Label,
          Language: data.Language,
          OrgId: data.OrgId,
        }
      })
      dispatch({
        type: ACTION_CLASSIFICATION_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_CLASSIFICATION_LOOKUP_SUCCESS, payload: classificationLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_CLASSIFICATION_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function workTypeLookup(workType) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_TYPE_LOOKUP_REQUESTED, payload: true
      });

      const workTypeLookupData = await LookupService.workTypeLookup(getState().user.data.Token, workType);
      workTypeLookupData.data = _.map(workTypeLookupData.data, (data) => {
        return {
          Class: data.Class,
          Description: data.Label,
          Id: data.Id,
          Label: data.Label,
          OrgId: data.OrgId,
          Type: data.Type,
          WorkTypeId: data.WorkTypeId,
        }
      })
      dispatch({
        type: ACTION_WORK_TYPE_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_WORK_TYPE_LOOKUP_REQUESTED_SUCCESS, payload: workTypeLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_WORK_TYPE_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function ownerLookup(owner) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_OWNER_LOOKUP_REQUESTED, payload: true
      });

      let ownerLookupData = await LookupService.ownerLookup(getState().user.data.Token, owner);

      dispatch({
        type: ACTION_OWNER_LOOKUP_REQUESTED, payload: false
      });


      if (ownerLookupData.data != undefined && ownerLookupData.data != null && ownerLookupData.data.length > 0) {
        ownerLookupData.data = _.map(ownerLookupData.data, (data) => {
          return {
            Description: data.Label,
            Label: data.Label,
            PersonId: data.PersonId,
          }
        })
      }

      dispatch({
        type: ACTION_OWNER_LOOKUP_REQUESTED_SUCCESS, payload: ownerLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_OWNER_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function ownerGroupLookup(ownerGroup) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_OWNER_GROUP_LOOKUP_REQUESTED, payload: true
      });

      const ownerGroupLookupData = await LookupService.ownerGroupLookup(getState().user.data.Token, ownerGroup);

      dispatch({
        type: ACTION_OWNER_GROUP_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_OWNER_GROUP_LOOKUP_REQUESTED_SUCCESS, payload: ownerGroupLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_OWNER_GROUP_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function reportedByLookup(reportedBy) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_REPORTED_BY_LOOKUP_REQUESTED, payload: true
      });

      const reportedByLookupData = await LookupService.ownerLookup(getState().user.data.Token, reportedBy);

      dispatch({
        type: ACTION_REPORTED_BY_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_REPORTED_BY_LOOKUP_REQUESTED_SUCCESS, payload: reportedByLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_REPORTED_BY_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function priorityLookup(text) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_PRIORITY_LOOKUP_REQUESTED, payload: true
      });
      const priorityLookupData = [ {PriorityId: 1, Description: '1 - HIGH'},
        {PriorityId: 2, Description: '2 - MEDIUM'},
        {PriorityId: 3, Description: '3 - LOW'}
      ];
      dispatch({
        type: ACTION_PRIORITY_LOOKUP_REQUESTED, payload: false
      });
      dispatch({
        type: ACTION_PRIORITY_LOOKUP_REQUESTED_SUCCESS, payload: priorityLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_PRIORITY_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function laborLookup(text) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_LABOR_LOOKUP_REQUESTED, payload: true
      });

      const laborLookupData = await LookupService.laborLookup(getState().user.data.Token, text);
      laborLookupData.data = _.map(laborLookupData.data, (data) => {
        return {
          Description: data.Label,
          Id: data.Id,
          Label:  data.Label,
          LaborId: data.LaborId,
          OrgId: data.OrgId,
          SiteId: data.SiteId,
        }
      })

      dispatch({
        type: ACTION_LABOR_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_LABOR_LOOKUP_REQUESTED_SUCCESS, payload: laborLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_LABOR_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function craftLookup(labor, craftSearch) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_CRAFT_LOOKUP_REQUESTED, payload: true
      });

      const craftLookupData = await LookupService.craftLookup(getState().user.data.Token, labor, craftSearch);

      craftLookupData.data = _.map(craftLookupData.data, (data) => {
        return {
          Description: '('+data.CraftId+ ') ' + data.Label ,
          CraftId: data.CraftId,
          CraftIdDescription: data.Label,
          GlDebitAccount: data.GlAccount,
          SkillLevel: data.SkillLevel,
          LineCost: data.Rate,
        }
      })

      dispatch({
        type: ACTION_CRAFT_LOOKUP_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_CRAFT_LOOKUP_REQUESTED_SUCCESS, payload: craftLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_CRAFT_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}

export function statusLookup(text) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_STATUS_LOOKUP_REQUESTED, payload: true
      });
      const priorityLookupData = [ { StatusId: 'APPR', Status: '( APPR ) Aproved', Description: '( APPR ) Aproved',color: '#4488f2' },
      { StatusId: 'WPCOND', Status: '( WPCOND ) Waiting on Plant Cond',  Description: '( WPCOND ) Waiting on Plant Cond',color: '#4488f2' },
      { StatusId: 'CAN', Status: '( CAN ) Canceled', Description: '( CAN ) Canceled', color: '#f65752' },
    { StatusId: 'CLOSE', Status: '( CLOSED ) Closed', Description: '( CLOSED ) Closed', color: '#39b54a' },
     { StatusId: 'COMP', Status: '( COMP ) Completed', Description: '( COMP ) Completed', color: '#39b54a' },
      { StatusId: 'HISTEDIT', Status: '( HISTEDIT ) Edited in History',Description: '( HISTEDIT ) Edited in History', color: '#39b54a' },
      { StatusId: 'INPRG', Status: '( INPRG ) In Progress',Description: '( INPRG ) In Progress',  color: '#39b54a' },
      { StatusId: 'WORKING', Status: '( WORKING ) Working', Description: '( WORKING ) Working',color: '#f2d935' },
   { StatusId: 'WAPPR', Status: '( WAPPR ) Waiting on Approval', Description: '( WAPPR ) Waiting on Approval', color: '#e59323' },
       { StatusId: 'WMATL', Status: '( WMATL ) Waiting on Material', Description: '( WMATL ) Waiting on Material', color: '#f2d935' },
      { StatusId: 'WSCH', Status: '( WSCH ) Waiting to be Scheduled',  Description: '( WSCH ) Waiting to be Scheduled',color: '#e59323' },
      ];
      dispatch({
        type: ACTION_STATUS_LOOKUP_REQUESTED, payload: false
      });
      dispatch({
        type: ACTION_STATUS_LOOKUP_REQUESTED_SUCCESS, payload: priorityLookupData
      });

    } catch (err) {
      dispatch({
        type: ACTION_STATUS_LOOKUP_REQUESTED_ERROR, payload: false
      });
    }

  }
}
