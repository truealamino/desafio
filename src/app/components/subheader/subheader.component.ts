import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html'
})
export class SubheaderComponent implements OnInit {
    @Input() title: string = 'Pesquisar'

    constructor() { }

    ngOnInit(): void {
    }

}
