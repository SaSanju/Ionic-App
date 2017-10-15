import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  forgot={
  	username: "",
  	password: ""
  };
  forgForm(){
  	let em = this.forgot.username;
    let pass = this.forgot.password;

    this.http.post('http://localhost:3000/forgot?email='+em +'&password='+pass, {}).subscribe(data => {
      alert("Password reset");
	    console.log(data);
	  },(err) => {
        alert("Error while reset password. Please try again!");
    });
  }
  login(){
  	this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
  }
}
