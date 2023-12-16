export interface IAppState {
  editJobId: string;
  search: string;
  stats: {};
  company: string;
  jobType: string;
  searchStatus: string;
  numOfPages: number;
  userLoading: boolean;
  alertType: string;
  searchType: string;
  isEditing: boolean;
  jobs: any[];
  totalJobs: number;
  userLocation: string;
  jobTypeOptions: string[];
  sort: string;
  isLoading: boolean;
  showSidebar: boolean;
  jobLocation: string;
  sortOptions: string[];
  statusOptions: string[];
  position: string;
  page: number;
  showAlert: boolean;
  alertText: string;
  monthlyApplications: any[];
  user: null;
  status: string;
}
export interface IAction {
  type: any;
  payload?: any;
}

export interface ILink {
  path: string;
  icon: JSX.Element;
  id: number;
  text: string;
}
