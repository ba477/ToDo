import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-edit-appareil-component',
  templateUrl: './edit-appareil-component.component.html',
  styleUrls: ['./edit-appareil-component.component.scss']
})
export class EditAppareilComponentComponent implements OnInit {
    defaultOnOff = 'A faire';
  constructor(private appareilService: AppareilService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);
  }

}
