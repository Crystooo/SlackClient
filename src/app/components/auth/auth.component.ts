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
  tkn:string=""
  link=""
  failedAuth=false
  
  constructor(private authService: AuthService) { }
  async ngOnInit(){
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
          this.link="home"
        }
        this.tkn=token
        this.username=username
      }catch(e){
        console.log(e)
      }
      //probabilmente passa un token vuoto, e non esistendo ne crea uno
      //vorrei fare semplicemente questo, ma l'oggetto test non ha la proprieta token, nonostante l'oggetto intero la mostra
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
