import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.msgService.add({severity:'error', summary: 'Error', detail: 'Lỗi thấy bà luôn'});
  }

  showError()
  {
    this.msgService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
  }
}
