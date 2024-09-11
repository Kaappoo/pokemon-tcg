export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: any;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: any;
}

export interface SetResponse {
    count: number,
    data: Set[],
    page: number,
    pageSize: number,
    totalCount: number
}