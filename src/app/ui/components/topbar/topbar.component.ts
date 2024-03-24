import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TOP_BAR_LINKS } from './navigation-links';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="block border-b border-slate-200">
      <div
        class="py-3 px-4 flex items-center justify-between mx-auto max-w-screen-xl"
      >
        <div class="flex items-center p-0 gap-x-10">
          <button
            class="bg-white flex items-center justify-between py-2 px-4 border border-slate-200 rounded-lg w-[216px]"
          >
            <div class="flex items-center gap-x-3">
              <div class="h-5 w-5 rounded-full bg-slate-200"></div>
              <span class="font-medium text-sm mb-0">Librería La Joya</span>
            </div>
            <mat-icon class="block text-base h-4 w-4 text-slate-400"
              >unfold_more</mat-icon
            >
          </button>
          <div class="flex items-center gap-x-7 text-sm">
            @for (link of navigationLinks; track $index) {
              <a
                [routerLink]="link.path"
                class="no-underline text-slate-500 font-normal hover:text-slate-950"
                routerLinkActive="text-slate-950"
                [routerLinkActiveOptions]="{ exact: true }"
                >{{ link.placeholder }}</a
              >
            }
          </div>
        </div>
        <button
          class="border-none w-10 h-10 bg-slate-200 rounded-full"
        ></button>
      </div>
    </div>
  `,
})
export class TopbarComponent {
  public readonly navigationLinks = TOP_BAR_LINKS;
}
