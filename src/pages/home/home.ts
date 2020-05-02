import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { CardProvider } from '../../providers/card/card';


@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  limit: number = 10;
  start: number = 0;

  url:string;

  produtos: any = [];
  todos: Array<{id:any, nome: string, descricao: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cart: CardProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.basepath;
}


ionViewDidLoad() {
  this.produtos = [];
  this.start = 0;
  this.listarProdutos();
}



openProduto(){

  this.navCtrl.push('ProdutoPage');
}

openEditar(id,nome,preco,quantidade,descricao, foto){

  this.navCtrl.push('EditarPage', {id:id, nome:nome, preco: preco, quantidade:quantidade, descricao:descricao, foto:foto});

}

openDetalhe(id, nome,preco,quantidade,descricao,foto){

  this.navCtrl.push('DetalhePage', {id: id, nome:nome, preco: preco, quantidade: quantidade, descricao:descricao, foto:foto});

}

openCarrinho(){
  
this.navCtrl.push('CarrinhoPage');

}

openDelete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'Produtos.php').subscribe(data =>{
    this.showInsertOk();
  });

}

addItem(produto){
  this.cart.addItem(produto);
  let toast = this.toastCtrl.create({
      message: 'Produto adicionado no carrinho',
      duration: 3000
  });
  toast.present();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarProdutos(){

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar'
    };
    this.serve.postData(body, 'Produtos.php').subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {

          this.produtos.push({
          id: data.result[i]["id"],
          nome: data.result[i]["nome"],
          quantidade: data.result[i]["quantidade"],
          preco: data.result[i]["preco"],
          descricao: data.result[i]["descricao"],
          foto: data.result[i]["foto"]
        });

      }

      resolve(true);

      this.todos = this.produtos;

    });
  });
}

getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((produto) => {
      return (produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (produto.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.produtos = this.todos;
  }
}





showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
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
