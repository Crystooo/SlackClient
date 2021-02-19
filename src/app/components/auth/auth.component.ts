import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';

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
  tkn:string=""
  link=""
  failedAuth=false
  
  constructor(private authService: AuthService, private router:Router, private dataService:DataTransferService) { }
  async ngOnInit(){
    //this.tkn=""
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
    this.failedAuth=true
    if(this.email != "" && this.password != ""){
      try{
        const {token,username}= await this.authService.login({tkn:this.tkn,email:this.email,password:this.password})
        if(token){//il token e sotto await, non e immediato
          this.router.navigate(["home"]);
        }
        this.tkn=token
        this.username=username
        this.dataService.setTkn(this.tkn);
        this.dataService.setUserName(this.username);
      }catch(e){
        console.log(e)
      }
    }/*else{
      this.link="failedauth"//questo metodo non funziona
    }*/
  }

  emptyCampsCheck = () => {
    if(this.email ==""||this.password==""){//ce bisogno di poter prendere bene il test per controllare l'input\
      this.link="failedauth"
    }else{
      this.link="home"
    }
  }

}
