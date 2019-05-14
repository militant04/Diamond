import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Todo {
    id?: string;
    task: string;
    priority: string;
    createdAt: number;
}

export interface Reading{
    id?: string;
    readings: string;
    month: number;
    createdAt: number;
    year: number;
    type: string;

}


export interface Finance {
    id?: string;
    description: string;
    amount: string;
    createdAt: number;
}

export interface User {
    id?: string;
    username: string;
    Password: string;
    Title: string;
    Initial: string;
    Firstname: string;
    Surname:string;
    DOB: string;
    Sex: string;
    Howmany: string;
    Orientation: string;
    Cell: string;
    email: string;
    Country: string;
    Town: string;
    createdAt: number;
}


@Injectable({
  providedIn: 'root'
})

export class TodoService {

    private todosCollection: AngularFirestoreCollection<Todo>;
    private readingsCollection: AngularFirestoreCollection<Reading>;
    private financeCollection: AngularFirestoreCollection<Finance>;
    private userCollection: AngularFirestoreCollection<User>;
    public login:any;


    private todos: Observable<Todo[]>;
    private reading: Observable<Reading[]>;
    private finance: Observable<Finance[]>;
    private user: Observable<User[]>;


    constructor(db: AngularFirestore) {
        this.todosCollection = db.collection<Todo>('todos');

        this.readingsCollection = db.collection<Reading>('Readings');

        this.financeCollection = db.collection<Finance>('Finance');

        this.userCollection = db.collection<User>('InteracialUsers', ref => ref.orderBy('createdAt' ,'desc'));




        this.todos = this.todosCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
        //readings

        this.reading = this.readingsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );

        //finance

        this.finance = this.financeCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );

        this.user = this.userCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );


    }

    getTodos() {
        return this.todos;
    }

    getUsers() {

        return this.user;
    }


    getTodo(id) {
        return this.todosCollection.doc<Todo>(id).valueChanges();
    }

    updateTodo(todo: Todo, id: string) {
        return this.todosCollection.doc(id).update(todo);
    }

    addTodo(todo: Todo) {
        return this.todosCollection.add(todo);
    }

    addUser(user: User) {
        return this.userCollection.add(user);
    }
    //add reading

    addReading(reading: Reading) {
        return this.readingsCollection.add(reading);
    }

    removeTodo(id) {
        return this.todosCollection.doc(id).delete();
    }

    //add finance

    addExpense(finance: Finance) {
        return this.financeCollection.add(finance);
    }

    getExpenses() {
        return this.finance;
    }

    removeExpense(id) {
        return this.financeCollection.doc(id).delete();
    }


    getExpensebyid(id) {
        return this.financeCollection.doc<Finance>(id).valueChanges();
    }

    updateExpense(finance: Finance, id: string) {
        return this.financeCollection.doc(id).update(finance);
    }
}
