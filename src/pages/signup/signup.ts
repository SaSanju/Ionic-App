import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, private auth: AuthProvider, private alertCtrl: AlertController, public http: Http) {
  }
  signup = {
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  }

  createSuccess = false;

  signupForm() {

    if (this.signup.firstname == "" || this.signup.password == "" || this.signup.lastname == "" || this.signup.username == "") {
      this.showPopup("Attention", "Please Insert Credentials");
    } else {

      this.auth.register(this.signup).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
          this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'backword' });
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  login() {
    this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'backword' });
  }
}
