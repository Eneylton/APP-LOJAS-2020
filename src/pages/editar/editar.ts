import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage({})
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  id:number;
  nome:string = "";
  preco:string = "";
  descricao:string = "";
  quantidade:string = "";
  foto:string = "";
  url:string =  "";
  base64Image: string = "";
  cameraData: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private serve: ServiceProvider,
    public alertCtrl: AlertController,
    private camera: Camera) {
   
      this.url = serve.basepath;
    
  }

  ionViewDidLoad() {

    this.id         = this.navParams.get("id");
    this.nome       = this.navParams.get("nome");
    this.preco      = this.navParams.get("preco");
    this.descricao  = this.navParams.get("descricao");
    this.quantidade = this.navParams.get("quantidade");
    this.foto       = this.navParams.get("foto");
   
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Abrir Midia',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.abrirCamrera();
          }
        }, {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.abrirGaleria();
          }

        }
      ]
    });
    actionSheet.present();
  }


  abrirCamrera() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });

  }

  abrirGaleria() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });

  }



  editar(){
    let body ={
      id:         this.id,
      nome:       this.nome,
      quantidade: this.quantidade,
      preco:      this.preco,
      descricao:  this.descricao,
      foto:       this.cameraData,
      crud:       'editar'
    }

    this.serve.postData(body, 'Produtos.php').subscribe(data =>{
    
     this.showInsertOk();
    
    });

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto Adicionado com Sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }

}
