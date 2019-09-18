import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private sqlite: SQLite, private alertController: AlertController) {}

  createTable(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('create table danceMoves(name VARCHAR(32))', [])
          .then(() => {
            console.log('Executed SQL to create table');

      })
          .catch(e => console.log(e));
          
          
          db.executeSql('insert into danceMoves values("break")',[])
          .then(()=> console.log('Executed SQL to create table'))
          .catch((error)=> console.log(error));
          
          db.executeSql('insert into danceMoves values("tap")');
          db.executeSql('select * from danceMoves', [])
          .then((result) =>{
            this.presentAlert(result.rows.item(0).name)
          })
            .catch((error)=>{
              this.presentAlert(error)
            }
          );
      })
      
      .catch(e => console.log(e));
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
