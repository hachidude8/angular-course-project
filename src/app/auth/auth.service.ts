import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, pass: string) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, pass)
        .catch(
            (err) => { alert(err); }
        );
        // this is a Promise, so you can also use .then(callback);
  }

  signinUser(email: string, pass: string) {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, pass)
    .then(
      (res) => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => { this.token = token; }
        );
        console.log(res);
      }
    ).catch(
      (err) => {
        alert(err);
      }
    );
  }

  getToken() {
      firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => { this.token = token; }
        );

        // This has the risk that we return an expired token, and
        // all of it's consecuences, this can fuck it up.
        console.log(this.token);

        return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
