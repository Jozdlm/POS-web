import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-views-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './views-shell.component.html',
  styleUrl: './views-shell.component.scss',
})
export class ViewsShellComponent {}
