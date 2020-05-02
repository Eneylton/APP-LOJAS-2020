import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  url: string ="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController,
              public cart: CardProvider, public server: ServiceProvider) {

                this.url = server.basepath;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrinhoPage');
  }

  addItem(produto){
    this.cart.addItem(produto);
    let toast = this.toastCtrl.create({
        message: 'Produto adicionado no carrinho',
        duration: 3000
    });
    toast.present();
  }


  removeItem(index) {
    this.cart.removeItem(index);
}

}
