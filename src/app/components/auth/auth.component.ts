import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email:string = "";
  username:string = "";
  password:string = "";
  confirmPassword:string = "";
  error:string = "";
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  animation() {
    document.querySelector('.cont')!.classList.toggle('s-signup')
  }

  registration = async () => {
    if(this.email != "" && this.username != "" && this.password != "" && this.confirmPassword != ""){
      if(this.password == this.confirmPassword){
        console.log(`email -> ${this.email} username -> ${this.username} password -> ${this.password}`);
        let {message} = await this.authService.register({email: this.email, username: this.username, password: this.password});
        this.error = message;
      }else{
        this.error = "The 2 passwords do not match";
      }
    }
    this.error="Empty fields";
  }

  login =async  () => {
    if(this.email != "" && this.password != ""){
      let test = await this.authService.login("", this.email, this.password);
      console.log("test->", test);
    }
  }

}
