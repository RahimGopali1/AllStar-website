import { Component, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgbNavModule, NgbAccordionModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activeTab1 = 1;
  activeTab2 = 1;
  activeTab3 = 1;
  activeTab4 = 1;

  activeMenu: string = '';
  hideTimeout: any;

  // Explicitly type the menu parameter as string
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
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  isActive(menu: string): boolean {
    return this.activeMenu === menu;
  }

  isMobileMenuOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.listen('document', 'click', (event) => {
      this.onClickOutside(event);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Toggle the click class for the toggle menu button
    const toggleMenu = this.el.nativeElement.querySelector('.toggle-menu');
    if (this.isMobileMenuOpen) {
      this.renderer.addClass(toggleMenu, 'click');
    } else {
      this.renderer.removeClass(toggleMenu, 'click');
    }
  }

  onClickOutside(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;

      // Remove the click class when closing the menu
      const toggleMenu = this.el.nativeElement.querySelector('.toggle-menu');
      this.renderer.removeClass(toggleMenu, 'click');
    }
  }

  // Store the ID of the currently open dropdown
  openDropdown: string | null = null;

  toggleDropdown(key: string) {
    if (this.openDropdown === key) {
      // If the clicked dropdown is already open, close it
      this.openDropdown = null;
    } else {
      // Close any previously open dropdown and open the new one
      this.openDropdown = key;
    }
  }


}
