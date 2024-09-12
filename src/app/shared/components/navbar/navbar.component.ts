import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  active: number = 1;

  activeMenu: string = '';
  hideTimeout: any;

  showMegaMenu(menu: string) {
    clearTimeout(this.hideTimeout);
    this.activeMenu = menu;
  }

  scheduleHideMenu() {
    this.hideTimeout = setTimeout(() => {
      this.activeMenu = '';
    }, 200);
  }

  cancelHideMenu() {
    clearTimeout(this.hideTimeout);
  }

  isActive(menu: string) {
    return this.activeMenu === menu;
  }
}
