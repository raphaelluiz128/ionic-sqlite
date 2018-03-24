import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Response} from '@angular/http';
import {DatabaseProvider} from '../../providers/database/database';

import 'rxjs/add/operator/map';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url:string='http://www.cafepedraelefantina.com.br/medicao/medicaoPorci.json';
public medicoes:Array<{}>;
selectedItem: any;

  constructor(public navCtrl: NavController,public navParams: NavParams,
    private database:DatabaseProvider,
  public http: Http) {

//this.GravarMedicao();

 // this.selectedItem = this.navParams.get('med');
  


}




AtualizarMedicoes(){

  this.http.get(this.url)
  .map(res => res.json())
  
  .subscribe(data =>{
    this.medicoes = data.medicao;
    alert(data.medicao[0].nivel);
    for(var i=0;i<data.medicao.length;i=i+1){
      this.database.CreateMedicao(data.medicao[i].data,data.medicao[i].hora,data.medicao[i].nivel);

    }
    alert(data.medicao[1].data);
  alert(data.medicao[1].hora);
  })
    
}


//ABAIXO EU USO UM ALERT PARA VERIFICAR QUAL INFORMAÇÃO ESTÁ NO 'DATA', MAS APARECE [OBJECT OBJECT]
CreateMedicao(){
  this.database.CreateMedicao("12/02/2013","13:15","45").then
  ((data) => { alert(data+" conteudo"); }, (error) => {
    console.log(error);
  })
  }

 /*
  vaParaTestPage(){
this.navCtrl.push(TestPage);
  }
*/

GetAllMedicoes(){
 this.database.GetAllMedicoes();
 
 
}



itemClick() {
   
  alert(this.medicoes[0]);  
}
 
}
