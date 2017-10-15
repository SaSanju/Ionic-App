import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  currentUser;
 
  public login(credentials) {
    if (credentials.username == "" || credentials.password == "") {
      return Observable.create(observer => {
        observer.next(false);
        observer.complete();
      });
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        
        this.http.post('http://localhost:3000/login?email=' + credentials.username + '&password=' + credentials.password,{})
          .subscribe(res => {
            if (res.json().data.length) {
              console.log(res.json().msg);
              this.currentUser = res.json().data;
              observer.next(true);
              observer.complete();
            }
            else {
              observer.next(false);
              observer.complete();
            }
          });
      });
    }
  }
 
  public register(credentials) {
    console.log(credentials.username);
    if (credentials.firstname == "" || credentials.password == "" || credentials.lastname == "" || credentials.username == "") {
      return Observable.create(observer => {
        observer.next(false);
        observer.complete();
      });
    } else {
      return Observable.create(observer => {

        let em = credentials.username;
        let pass = credentials.password;
        let fname =credentials.firstname;
        let lname = credentials.lastname;

       this.http.post('http://localhost:3000/signup?email='+em+'&password='+pass+'&firstName='+fname+'&lastName='+lname, {})
          .subscribe(res => {
            var data = res.json();
            if (data.status) {
              observer.next(true);
              observer.complete();
            }
            else {
              observer.next(false);
              observer.complete();
            }
          });
      });
    }
  }
 
  public getUserInfo() {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

}
