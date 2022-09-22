export interface ISearchFormContext {
  search: string;
  suggestionSelected: boolean;
  onSearch: (value: string) => void;
  onSelect: (value: string) => void;
}
