import { Component, OnInit } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  poolData = {
    UserPoolId: "us-east-1_qRdMI4QGp",
    ClientId: "193l2qgeu9o51qpmboddhda5kk"
  }

  userPool = new CognitoUserPool(this.poolData);

  newUserData = {
    email: '',
    password: ''
  }

  attributeList = [];

  dataEmail = {
    Name: 'email',
    Value: 'upthevolume5@hotmail.co.uk',
  };

  dataPhoneNumber = {
    Name: 'phone_number',
    Value: '+15555555555',
  };

  attributeEmail = new CognitoUserAttribute(this.dataEmail);
  attributePhoneNumber = new CognitoUserAttribute(
    this.dataPhoneNumber
  );

  formSubmit(event) {
    this.attributeList.push(this.attributeEmail);
    this.attributeList.push(this.attributePhoneNumber);

    this.userPool.signUp(this.newUserData.email, this.newUserData.password, this.attributeList, null, (err, result) => {
      if(err) {
        console.log(err.message || JSON.stringify(err))
        return;
      }
      const cognitoUser = result.user
      console.log('username is ' + cognitoUser.getUsername())
    })
  }

  constructor() { }

  ngOnInit() {
  }

}
