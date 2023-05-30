import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Client} from "@app/@features/clients/@models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  async createClient($event: Client) {
    // USAGE OF SERVICE

    const clients = JSON.parse(localStorage.getItem('clients') || '[]');

    // simulate id from server
    $event.id = clients.length + 1;

    clients.push($event);
    localStorage.setItem('clients', JSON.stringify(clients));

    await this.router.navigate(['/clients']);
  }
}
