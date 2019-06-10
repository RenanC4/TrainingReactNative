const Status = {
  APPR: { StatusId: 'APPR', Description: '( APPR ) Aproved', color: '#4488f2' },
  WPCOND: { StatusId: 'WPCOND', Description: '( WPCOND ) Waiting on Plant Cond', color: '#4488f2' }, //TODO: missing color
  CAN: { StatusId: 'CAN', Description: '( CAN ) Canceled', color: '#f65752' },
  CLOSE: { StatusId: 'CLOSE', Description: '( CLOSED ) Closed', color: '#39b54a' },
  COMP: { StatusId: 'COMP', Description: '( COMP ) Completed', color: '#39b54a' },
  HISTEDIT: { StatusId: 'HISTEDIT', Description: '( HISTEDIT ) Edited in History', color: '#39b54a' },
  INPRG: { StatusId: 'INPRG', Description: '( INPRG ) In Progress', color: '#39b54a' },
  WORKING: { StatusId: 'WORKING', Description: '( WORKING ) Working', color: '#f2d935' },
  WAPPR: { StatusId: 'WAPPR', Description: '( WAPPR ) Waiting on Approval', color: '#e59323' },
  WMATL: { StatusId: 'WMATL', Description: '( WMATL ) Waiting on Material', color: '#f2d935' },
  WSCH: { StatusId: 'WSCH', Description: '( WSCH ) Waiting to be Scheduled', color: '#e59323' },
}


Status.getStatusFromCode = (code) => {
  switch (code) {
    case Status.APPR.StatusId: {
      return Status.APPR;
    }
    case Status.WPCOND.StatusId: {
      return Status.WPCOND;
    }
    case Status.APPR.StatusId: {
      return Status.APPR;
    }
    case Status.CAN.StatusId: {
      return Status.CAN;
    }
    case Status.CLOSE.StatusId: {
      return Status.CLOSE;
    }
    case Status.COMP.StatusId: {
      return Status.COMP;
    }
    case Status.HISTEDIT.StatusId: {
      return Status.HISTEDIT;
    }
    case Status.INPRG.StatusId: {
      return Status.INPRG;
    }
    case Status.WORKING.StatusId: {
      return Status.WORKING;
    }
    case Status.WAPPR.StatusId: {
      return Status.WAPPR;
    }
    case Status.WMATL.StatusId: {
      return Status.WMATL;
    }
    case Status.WSCH.StatusId: {
      return Status.WSCH;
    }
    default: {
      return null;
    }
  }
}

export default Status;
