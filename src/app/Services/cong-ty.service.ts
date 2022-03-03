import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SystemConstants } from '../common/System.Constants';

@Injectable({
  providedIn: 'root'
})
export class CongTyService {

  private httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(private _http:HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+ `boddy was: ${error.error}`);
    }
    return throwError('Something bad happened; Please try again later');
  }

  getCongTy():Observable<any>{
    const url = `${SystemConstants.BASE_API}/CongTy`;
    return this._http.get(url, this.httpOptions).pipe(catchError(this.handleError));
  }
}
