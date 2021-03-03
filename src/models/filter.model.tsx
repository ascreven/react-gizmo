export type IFilter = {
  title: string;
  options: any[];
  displayProperty: string;
  primaryKey: string;
  onToggleHandler: (value: any) => void;
}

export type IMovieDBDiscoverFilters = {
  with_genres: any[];
  with_watch_providers: string[];
  watch_region: string;
}
