export type LeaveProps = {
  start_date: string;
  end_date: string;
  reason: string;
};
export type LeaveItems = LeaveProps & {
  id: number;
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
