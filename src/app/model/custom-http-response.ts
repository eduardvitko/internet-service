export class CustomHttpResponse {
  httpStatusCode: number;
  httpStatus: string;
  reson: string;
  message: string;

  constructor() {
    this.httpStatusCode = 0;
    this.httpStatus = '';
    this.reson = '';
    this.message = '';

  }
}
