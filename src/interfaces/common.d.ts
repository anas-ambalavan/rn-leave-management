import { TextInputProps } from "react-native";

export type IconName =
  | "md-home"
  | "md-home-outline"
  | "md-calendar"
  | "md-calendar-outline"
  | "md-hand-left"
  | "md-hand-left-outline";

export type InputRequiredProps = {
  id: string;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
};

export type InputProps = TextInputProps & {
  initialValue: string;
  initiallyValid: boolean;
  required: boolean;
  label: string;
  email: boolean;
  name: string;
  min: number;
  max: number;
  minLength: number;
  errorText: string;
};

export type FilterOptionProps = {
  filter: string;
  selectedFilter: string;
  handleFilterSelect: (filter: string) => void;
};
