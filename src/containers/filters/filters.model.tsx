export type Genre = {
    id: number,
    name: string
}

export type IFilters = {
    with_genres?: string;
    with_watch_providers?: string;
    watch_region?: string;
}
