export interface Project {
  isDeleted: boolean;
  created: string;
  updated: string;
  creator: string;
  creatorNick: string;
  id: number;
  name: string;
  owner: string;
  description: string;
  canDelete: boolean;
  showUser: string;
  type: string;
  totalDemand: 0;
  companyId: number;
  progress: string;
  isTopShow: boolean;
  isSecret: boolean;
}
