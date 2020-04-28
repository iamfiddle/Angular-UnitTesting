import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, Observer, observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { ConstantService } from './../../Constants/constant.service';

@Injectable()
export class APIService {

  body: Object;
  endPoint = this.constant.apiEndPoint;

  constructor(private httpClient: HttpClient, private constant: ConstantService) { }

  //Get Request
  GetRequest(path: string, clientCallback: Function = null): Observable<Object> {

    return (this.httpClient.get(
      this.endPoint + path,
      { headers: this.constant.apiHeaders, withCredentials: this.constant.withCredential }
    ))
      .pipe(catchError(error => {
        console.log(`HTTP Error: ${error.message}`);
        return throwError(error);
      })
        , finalize(() => {
          clientCallback()
        })
      );
  }

  //Post Request
  PostRequest(path: string, data: Object, clientCallback: Function = null): Observable<object> {

    return (this.httpClient.post(
      this.endPoint + path,
      data,
      { headers: this.constant.apiHeaders, withCredentials: this.constant.withCredential }
    ))
      .pipe(catchError(error => {
        console.log(`HTTP Error: ${error.message}`);
        return throwError(error);
      })
        , finalize(() => {
          clientCallback()
        })
      );
  }

  //Delete Request
  DeleteRequest(path: string, id: number, clientCallback: Function = null) {

    return (this.httpClient.delete(
    `${this.endPoint}${path}/${id}`, 
    //this.endPoint + path,
    { headers: this.constant.apiHeaders, withCredentials: this.constant.withCredential }
    ))
      .pipe(catchError(error => {
        console.log(`HTTP Error: ${error.message}`);
        return throwError(error);
      })
        , finalize(() => {
          clientCallback()
        })
      );
  }
}