import { Component } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';






@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //constructor() {}
  constructor(private speechRecognition: SpeechRecognition, private socialSharing: SocialSharing,private device : Device, private tts: TextToSpeech, private alertController: AlertController) {}


  SpeakMyText(textToSpeak: string){
    console.log(textToSpeak);
  
    //console.log('Device UUID is: ' + this.device.uuid);
    this.tts.speak({text:textToSpeak,rate:1})
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }
  

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'textToSpeak',
          type: 'text',
          placeholder: 'Text to Speak'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: myInput => {
            console.log(myInput);
            this.SpeakMyText(myInput.textToSpeak);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  shareFunc(){
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing.shareViaEmail('Body', 'Subject', ['najmeh_na@yahoo.com']).then(() => {
        this.presentAlert("Message sent...")
      }).catch(() => {
        this.presentAlert("Error sending the message")
      });
        
    }).catch(() => {
      
      this.presentAlert(" Sharing via email is not possible")
    });
    
    // Share via email
    
  }
  shareFuncAll(){
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing.share().then(() => {
        this.presentAlert("Message sent...")
      }).catch(() => {
        this.presentAlert("Error sending the message")
      });
        
    }).catch(() => {
      
      this.presentAlert(" Sharing via email is not possible")
    });
    
    // Share via email
    
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

  startListening(){
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => 
  
    console.log(available))
    
  // Start the recognition process
  this.speechRecognition.startListening()
  .subscribe(
    (matches: string[]) => console.log(matches),
    (onerror) => console.log('error:', onerror)
  )
  }
  stopListening(){
    
  }
}
