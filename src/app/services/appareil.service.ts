import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

   appareilsSubject = new Subject<any[]>();

   public appareils = [
    ];

    constructor(private httpClient: HttpClient) { }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (s) => {
                return s.id === id;
            }
        );
        return appareil;
    }
    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnOne(i: number) {
        this.appareils[i].status = 'Done';
        this.emitAppareilSubject();
    }

    switchOffOne(i: number) {
        this.appareils[i].status = 'A faire';
        this.emitAppareilSubject();
    }
    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://todo-f2fd9.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }
    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://todo-f2fd9.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                    this.appareils = response;
                    console.log(response);
                    this.emitAppareilSubject();

    },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }

}

