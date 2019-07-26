import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Component } from '@angular/core';
import { Subscription,Observable } from 'rxjs';
import{map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coursesList$:AngularFireList<any>;
   courses$: Observable<any[]>;
  constructor(private db: AngularFireDatabase){

  this.coursesList$=db.list('/Course');
  this.courses$= this.coursesList$.snapshotChanges().pipe(
    map(changes=>
      changes.map(c=>
        ({key: c.payload.key,name:c.payload.val()})))
  );
  }
  add(course: HTMLInputElement){
    this.coursesList$.push(course.value);
    course.value= '';
  }


    update(course){
  this.db.object('/Course/'+ course.key)
  .set(course.name+'UPDATED');
  }
    
    delete(course){
      this.db.object('/Course/'+course.key)
      .remove()
      .then(x=>console.log("DELETED"));
    }
}
