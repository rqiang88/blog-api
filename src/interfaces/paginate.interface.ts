export class IPaginate {
  limit: number;
  page: number;
  take: number;
  skip: number;
}

export class IPaginateResult {
  limit: number;
  page: number;
  total: number;
}

export class IQueryResult<T> {
  data: T[];
  paginate: IPaginateResult;
}
