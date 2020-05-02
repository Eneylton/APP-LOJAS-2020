import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage({})
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  

  nome: string = "";
  preco: any;
  quantidade: any;
  descricao: string = "";

  base64Image: string = "";
  cameraData: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
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
      targetWidth:  1000,
      targetHeight: 800,
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
      targetWidth: 1000,
      targetHeight: 800,
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

  add() {

    if(this.nome ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();
    

  }else if(this.cameraData === undefined){

      const toast = this.toastyCrtl.create({
      message: 'Você precisa adicionar uma imagem....',  
      duration:3000
      });
      toast.present();

  }else{

    let body = {
      nome: this.nome,
      preco: this.preco ,
      quantidade: this.quantidade,
      descricao: this.descricao,
      foto: this.cameraData,
      crud: 'adicionar'
    };

    this.serve.postData(body, 'Produtos.php').subscribe(data => {
      this.showInsertOk();
    });

  }

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
