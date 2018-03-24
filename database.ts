import { HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;


  constructor(public http: Http,
  public storage: SQLite) {
    if (!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name:"data.db",location:"default"}).then((db:SQLiteObject) => {
  this.db = db;
  db.executeSql("CREATE TABLE IF NOT EXISTS MEDICOES(ID INTEGER PRIMARY KEY AUTOINCREMENT,DATA TEXT,HORA TEXT,NIVEL TEXT)",[]);
  this.isOpen = true;   
}).catch((error)=>{
  console.log(error);
}) 
} 
}

CreateMedicao(data:string,hora:string,nivel:string){
 return new Promise((resolve, reject) => {
 let sql = "insert into medicoes(data,hora,nivel) values(?,?,?)";
 this.db.executeSql(sql,[data,hora,nivel]).then((data) => {
   resolve(data);
 }, (error) => {
reject(error);
 });
});
}

GetAllMedicoes(){
  
  return new Promise((resolve,reject) => {
    this.db.executeSql("select * from medicoes",[]).then((data) =>{
      let arrayMedicoes = [];
      
      if (data.rows.length >0) {
        for (var i=0; i< data.rows.length;i++){
         // alert(data.rows.item(0).id);
          arrayMedicoes.push({
            id:data.rows.item(i).id,
            data:data.rows.item(i).data, 
            hora:data.rows.item(i).hora,
            nivel:data.rows.item(i).nivel
           
            });
           
          }
       
   
        }
        resolve(arrayMedicoes);
        const pegarId = arrayMedicoes.map(({id}) => id);
        alert(pegarId);
       // alert(data.rows.item(2).data);
            
      }, (error) => {
        reject(error);
      })
    })
  }
}
