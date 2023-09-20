import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g"
  urlRegiter = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g"
  constructor(private http: HttpClient) { }
  url = "https://firestore.googleapis.com/v1/projects/foro-dudas-itsch/databases/(default)/documents/"

  login(email:string, pass:string){ //funcion
   return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
  }
  register(email:string, pass:string){ //funcion
    return this.http.post(this.urlRegiter, {email:email,password:pass,returnSecureToken:true})

   }

   getAllPreguntas(){
    return this.http.get<any>(this.url + "preguntas?pageSize=1000")
   }

   createPregunta(pregunta: string, correo:string,categoria:string,fecha:string){
    
    const newDoc ={
      fields:{
        pregunta:{stringValue:pregunta},
        correo:{stringValue:correo},
        categoria:{stringValue:categoria},
        fecha:{timestampValue:fecha},
      }
    }
    return this.http.post(this.url + "preguntas",newDoc);
   }
   deletePregunta(id:string){
    return this.http.delete(this.url + "preguntas/" + id)
   }
}
