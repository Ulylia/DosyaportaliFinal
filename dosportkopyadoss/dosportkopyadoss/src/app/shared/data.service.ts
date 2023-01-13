import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Uye } from '../model/uye';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }
  
  // add uye
  addUye(uye : Uye) {
    uye.id = this.afs.createId();
    return this.afs.collection('/Uyes').add(uye);
  }

  // get all uyes
  getAllUyes() {
    return this.afs.collection('/Uyes').snapshotChanges();
  }

  // delete uye
  deleteUye(uye : Uye) {
     this.afs.doc('/Uyes/'+uye.id).delete();
  }

  // update uye
  updateUye(uye : Uye) {
    this.deleteUye(uye);
    this.addUye(uye);
  }
}
