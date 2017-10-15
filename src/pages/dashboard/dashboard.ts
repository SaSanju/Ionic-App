import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  hide:boolean;

  constructor(public navCtrl: NavController, private auth: AuthProvider, public navParams: NavParams) {
     let info = this.auth.getUserInfo();
     this.hide = info[0].isverified;
  }

  public logout() {
      this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
