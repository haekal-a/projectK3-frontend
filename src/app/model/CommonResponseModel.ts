export class CommonResponseModel {
  constructor(
    public title: string,
    public code: string,
    public message: string,
    public data,
    public totalData: number
  ){

  }
}
