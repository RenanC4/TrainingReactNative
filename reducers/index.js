import {combineReducers} from 'redux';

import navigation from './navigator';
import user from './user/user';
import workOrder from './workOrder/workOrder';
import labor from './workOrder/labor';
import material from './workOrder/material';
import attachments from './workOrder/attachments'
import resetPassword from './user/resetPassword';
import siteIdLookup from './lookup/siteIdLookup';
import locationIdLookup from './lookup/locationIdLookup';
import assetIdLookup from './lookup/assetIdLookup';
import classificationLookup from './lookup/classificationLookup';
import ownerGroupLookup from './lookup/ownerGroupLookup';
import ownerLookup from './lookup/ownerLookup';
import reportedByLookup from './lookup/reportedByLookup';
import workTypeLookup from './lookup/workTypeLookup';
import priorityLookup from './lookup/priorityLookup';
import statusLookup from './lookup/statusLookup';
import laborLookup from './lookup/laborLookup';
import craftLookup from './lookup/craftLookup';
import dateFilter from './dateFilter/dateFilter';
export default combineReducers({
  navigation,
  user,
  workOrder,
  labor,
  material,
  resetPassword,
  siteIdLookup,
  locationIdLookup,
  assetIdLookup,
  attachments,
  classificationLookup,
  ownerGroupLookup,
  ownerLookup,
  reportedByLookup,
  workTypeLookup,
  priorityLookup,
  statusLookup,
  laborLookup,
  craftLookup,
  dateFilter

})
