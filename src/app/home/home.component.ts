import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  preguntas = [
    {no: 1, pregunta: 'No hay', correo:"",categoria:"",fecha:"",id:""},
  ];
  newP = {categoria:"", pregunta:""}
  mod = {categoria:"", pregunta:""}

  constructor(private api: ApiRestService){}

  ngOnInit(): void{//despues de construir todo se pone esoto para consultar los datos con el servidor
    this.consultar()
  }

  consultar(){
    this.api.getAllPreguntas().subscribe({
      next: datos => {
        console.log(datos)
        let documentos = datos.documents.filter((d:any) => d.hasOwnProperty('fields')) // let es para declarar variables
        let i = 1;
        let preguntas = documentos.map( (p:{name:string,fields:any} ) => ({
          no: i++,
          pregunta: p.fields.hasOwnProperty('pregunta')? p.fields.pregunta.stringValue: "",
          correo: p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue: "",
          categoria: p.fields.hasOwnProperty('categoria')? p.fields.categoria.stringValue: "",
          fecha: p.fields.hasOwnProperty('fecha')? p.fields.fecha.timestampValue: "",
          id: p.name.split("/").pop()
      }))
        console.log(preguntas)
        this.preguntas = preguntas
      },
      error: e => {}
    })
  }
  crearPregunta(){
    const fecha = new Date().toISOString();
    if(this.newP.pregunta=="" || this.newP.categoria==""){
      alert("Falta llenar llenar los datos")
      return;
    }
    const correo = localStorage.getItem("correo") || "" //este es un if
    this.api.createPregunta(this.newP.pregunta,correo,this.newP.categoria, fecha).subscribe({
      next: resp => {this.consultar()},
      error: e => {console.log(e)}
    })
  }

  eliminarPregunta(id:string){
    this.api.deletePregunta(id).subscribe({
      next: resp => {this.consultar()},
      error :e => {console.log(e)}
    })
  }
  modificarPregunta(){

  }
  editarPregunta(p:any){
    this.mod = p
  }
}
