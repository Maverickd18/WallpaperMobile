import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, deleteDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  constructor(private firestore: Firestore) {}

  async add(owner: string, path: string, url: string, name: string) {
    const col = collection(this.firestore, 'wallpapers');
    const docRef = await addDoc(col, {
      owner,
      path,
      url,
      name,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  }

  async listByUser(owner: string) {
    const col = collection(this.firestore, 'wallpapers');
    const q = query(col, where('owner', '==', owner));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const dt = d.data() as any;
      return {
        id: d.id,
        owner: dt.owner,
        path: dt.path,
        url: dt.url,
        name: dt.name
      };
    });
  }

  async deleteMetadata(id: string) {
    const docRef = doc(this.firestore, `wallpapers/${id}`);
    await deleteDoc(docRef);
  }
}
