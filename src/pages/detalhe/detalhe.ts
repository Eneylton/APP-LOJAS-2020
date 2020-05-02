import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {

  id:number;
  nome:string="";
  preco:any;
  quantidade:any;
  descricao:string="";
  foto:string="";
  url:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServiceProvider) {

    this.url = this.server.basepath;
  }

  ionViewDidLoad() {
    
    this.id          = this.navParams.get("id");
    this.nome        = this.navParams.get("nome");
    this.preco       = this.navParams.get("preco");
    this.quantidade  = this.navParams.get("quantidade");
    this.descricao   = this.navParams.get("descricao");
    this.foto        = this.navParams.get("foto");
    

  }

}
