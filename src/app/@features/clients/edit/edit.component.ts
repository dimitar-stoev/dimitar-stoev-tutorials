import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "@app/@features/clients/@models";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private currentId = this.activatedRoute.snapshot.params['id'];

  // GET FROM SERVICE
  client = (JSON.parse(localStorage.getItem('clients')!))
    .filter((client: any) => client.id === Number(this.currentId))[0];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async deleteClient(id: number) {
    // USAGE OF SERVICE
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');

    clients.forEach((client: Client, index: number) => {
      if (client.id === id) {
        clients.splice(index, 1);
      }
    });

    localStorage.setItem('clients', JSON.stringify(clients));
    await this.router.navigate(['/clients']);
  }

  async updateClient($event: Client) {
    // USAGE OF SERVICE
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');

    clients.forEach((client: Client, index: number) => {
      if (client.id === $event.id) {
        clients[index] = $event;
      }
    });

    localStorage.setItem('clients', JSON.stringify(clients));
    await this.router.navigate(['/clients']);
  }
}
