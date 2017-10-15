import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ForgotPage } from '../forgot/forgot';
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { Http } from '@angular/http';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public http: Http) {

  }
  login = {
    username: "",
    password: ""
  };

  logForm() {
    this.showLoading();
    if (this.login.username == "" || this.login.password == "") {
      this.showError("Please Insert Credentials");
    } else {
      this.auth.login(this.login).subscribe(allowed => {
        if (allowed) {
          this.navCtrl.setRoot(DashboardPage, {}, { animate: true, direction: 'forward' });
        } else {
          this.showError("Access Denied");
        }
      });
    }
  }  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  forgotpass() {
    this.navCtrl.setRoot(ForgotPage, {}, { animate: true, direction: 'forward' });
  }
  signup() {
    this.navCtrl.setRoot(SignupPage, {}, { animate: true, direction: 'forward' });
  }
}
