import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  count1 = 0;
  count2 = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.animateCounter('count1', 700, 'top-counter');
    this.animateCounter('count2', 650, 'bottom-counter');
  }

  animateCounter(counter: 'count1' | 'count2', endValue: number, className: string): void {
    const updateFrequency = 50;
    const duration = 2000;
    const increment = endValue / (duration / updateFrequency);
    let currentValue = 0;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= endValue) {
        clearInterval(interval);
        this[counter] = endValue;

        // Trigger animation by adding the class dynamically
        const element = document.querySelector(`.${className}`);
        if (element) {
          this.renderer.addClass(element, 'animate');
        }
      } else {
        this[counter] = Math.round(currentValue);
      }
    }, updateFrequency);
  }
}
