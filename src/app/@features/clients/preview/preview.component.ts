import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Client} from "@app/@features/clients/@models";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {

  // GET FROM SERVICE
  clients: Client[] = localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')!) : [];

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteClient(id: number) {
    if (!confirm('Are you sure you want to delete this client?')) {
      return;
    }

    this.clients = this.clients.filter(client => client.id !== id);
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }
}
