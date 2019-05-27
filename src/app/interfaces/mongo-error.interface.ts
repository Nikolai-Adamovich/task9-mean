export interface IMongoError {
  code: number;
  driver: boolean;
  errmsg: string;
  index: number;
  name: string;
}
