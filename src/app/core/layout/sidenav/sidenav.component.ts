import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);

  public async handleLogoutEvent(): Promise<void> {
    await this._sessionService.logOut();
  }
}
