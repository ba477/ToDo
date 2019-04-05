import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

    @Input() appareilName: string;
    @Input() appareilStatus: string;
    @Input() index: number;
    @Input() id: number;

    constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus() {
    return this.appareilStatus;
  }
  getColor() {
    if(this.appareilStatus === 'Done') {
      return 'green';
    } else if(this.appareilStatus === 'A faire') {
      return 'red';
    }
  }

  onSwitch() {
        if(this.appareilStatus === 'Done') {
            this.appareilService.switchOffOne(this.index);
        } else if(this.appareilStatus === 'A faire') {
            this.appareilService.switchOnOne(this.index);
        }
    }
}
