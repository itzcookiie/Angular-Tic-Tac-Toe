import { Component, OnInit } from '@angular/core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  poolData = {
    UserPoolId: "us-east-1_qRdMI4QGp",
    ClientId: "193l2qgeu9o51qpmboddhda5kk"
  }

  user = {
    Username: '',
    Password: ''
  }

  authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    this.user
  );

  userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);

  userData = {
    Username: '',
    Pool: this.userPool,
};

  cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);

  cog() {
    this.cognitoUser.confirmRegistration('15555555555', true, ((err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    }))
  }

  loginUser() {
    console.log(this.userPool)
    this.cognitoUser.authenticateUser(this.authenticationDetails, {
      onSuccess: function(result) {
        const token = result.getAccessToken().getJwtToken();
        console.log('Successfully logged in', token)

        AWS.config.region = 'us-east-1'
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: '',
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_qRdMI4QGp': result.getIdToken().getJwtToken()
          }
        })
      },
      onFailure: function(error) {
        console.log(error.message || JSON.stringify(error.message))
      }
    })
  }

  constructor() { }

  ngOnInit() {
  }


}
