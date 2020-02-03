export interface UserPanelPackage {
  groupCreation: boolean;
  invIN: boolean;
  invOUT: boolean;
  username: string;
  isPro: boolean;
  invitations: {
    invIN: [{
      fName: string,
      lName: string,
      username: string,
      groupName: string,
    }],
    invOUT: [{
      fName: string,
      lName: string,
      username: string,
      groupName: string,
    }]
  };
}
