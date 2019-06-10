const Priority = [
{ Id: 1, Description: 'HIGH', Color: '#fff' },
{ Id: 2, Description: 'MEDIUM', Color: '#ffff99' },
{ Id: 3, Description: 'LOW', Color: '#ccffcc' },
]

Priority.getPriorityFromCode = (code) => {
  switch (code) {
    case Priority.HIGH.Code: {
      return Priority.HIGH;
    }
    case Priority.MEDIUM.Code: {
      return Priority.MEDIUM;
    }
    case Priority.LOW.Code: {
      return Priority.LOW;
    }
    default: {
      return null;
    }
  }
}

export default Priority;
