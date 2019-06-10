import api from '../api'

export default class LookupService {

  static async organizationLookup(token, orgId) {

    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('organization/LookupByOrgId?orgId=' + orgId);

    return response;
  }

  static async siteLookup(token, site, orgId) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('site/LookUpBySite?orgId=' + orgId + '&site=' + site);

    return response;
  }

  static async locationLookup(token, location, site) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('location/LookupBySiteIdAndLocation?location=' + location + '&siteId=' + site);

    return response;
  }

  static async assetLookup(token, asset, site, location) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('asset/LookupByLocationAndAsset?asset=' + asset + '&siteId=' + site + '&locationId=' + location);

    return response;
  }

  static async classificationLookup(token, classification) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('classstructure/LookupBySiteIdAndClassStructure?classStructure=' + classification);

    return response;
  }

  static async workTypeLookup(token, workType) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('workordertype/LookupByWorkType?workType='+ workType);

    return response;
  }

  static async ownerLookup(token, person) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('person/LookupByPerson?person=' + person);
    return response;
  }
  static async ownerGroupLookup(token, personGroupId) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get('persongroup/LookupByPersonGroupId?personGroupId=' + personGroupId);
    return response;
  }

  static async laborLookup(token, laborSearch) {

    if(laborSearch){
      laborSearch = laborSearch
    } else{
      laborSearch = ''
    }
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('labor/Lookup?labor=' + laborSearch);
    return response;
  }

  static async craftLookup(token, labor, craftSearch) {
    if(craftSearch){
      craftSearch = craftSearch
    } else{
      craftSearch = ''
    }
    if(labor){
      labor = labor
    } else{
      labor = 'abc'
    }

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('LaborCraftRate/Lookup?laborId='+ labor + '&craftId=' + craftSearch);
    return response;
  }

}
