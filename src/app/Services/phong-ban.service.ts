import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SystemConstants } from '../common/System.Constants';
import { PhongBan } from '../phong-ban/PhongBan';

@Injectable({
  providedIn: 'root'
})

export class PhongBanService {

  private httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  constructor(private _http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+ `boddy was: ${error.error}`);
    }
    return throwError('Something bad happened; Please try again later');
  }

  public getPhongBan():Observable<any>{
    const url = `${SystemConstants.BASE_API}/PhongBan`;
      return this._http.get(url,this.httpOptions).pipe(catchError(this.handleError));
  }

  public addPhongBan(data:PhongBan){
    const url = `${SystemConstants.BASE_API}/PhongBan`;
    console.log("data:", data);
    return this._http.post(url,data,this.httpOptions).pipe(catchError(this.handleError));
  }

  public updatePhongBan(data:PhongBan){
    const url = `${SystemConstants.BASE_API}/PhongBan`;
    console.log("data:", data);
    return this._http.put(url,data,this.httpOptions).pipe(catchError(this.handleError));
  }

  public deletePhongBan(id:number){
    const url = `${SystemConstants.BASE_API}/PhongBan`;
    return this._http.delete()
  }
}
