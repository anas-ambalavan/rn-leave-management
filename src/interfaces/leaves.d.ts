export type LeaveProps = {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  navigation: any;
};
export type LeaveItems = LeaveProps & {
  created_at: string;
};

type onApplyFilterParams = {
  filter: string;
  startDate: string;
  endDate: string;
};

type LeaveFiltersModalProps = {
  isVisible: boolean;
  onClose: () => void;
  resetFilter: () => void;
  selectedFilter: string;
  handleFilterSelect: (filter: string) => void;
  onApplyFilter: ({ filter, startDate, endDate }: onApplyFilterParams) => void;
};

export interface Leave {
  id: number | string;
  created_at: string;
  start_date: string;
  end_date: string;
  reason: string | null;
}

export interface LeaveState {
  items: Leave[];
  loading: boolean;
  error: string | null;
}
