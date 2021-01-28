import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApi = 'https://api.spacexdata.com/v3/launches?limit=100';

  constructor(
    private _http: HttpClient
  ) { }

  fetchMissions(): Observable<any> {
    return this._http.get(this.baseApi).pipe(catchError(this.handleError));
  }

  updateMission(payload): Observable<any>{
    return this._http.get(this.baseApi + payload).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any): Observable < any > {
    let errMsg: string;
    if (error instanceof Response) {
        errMsg = `${error.statusText || 'Network error'}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    throw(errMsg);
}
}
