import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-of-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './top-of-page.component.html',
  styleUrl: './top-of-page.component.css'
})
export class TopOfPageComponent implements OnInit, OnDestroy {
  imageNames = {
    backgroundImage: "assets/images/backround-image.png",
    userIcon: "assets/images/User.svg",
    skywayLogo: "assets/images/skyway-logo.png",
  }
  slides = [{
    image: '', text: '', button: '',
  }];
  currentImage = 0;
  isTransitionEnabled = true;
  autoSlideInterval: any;

  constructor(private router: Router) {
    this.getImages();
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.endAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  endAutoSlide(): void {
    clearInterval(this.autoSlideInterval);
  }

  getImages() {
    this.slides = [
      {image: 'assets/images/angular.jpg', text: 'text1', button: 'MORE'},
      {image: 'assets/images/react.jpg', text: 'text1', button: 'MORE'},
      {image: 'assets/images/vue.jpg', text: 'text1', button: 'MORE'},
      {image: 'assets/images/angular.jpg', text: 'text1', button: 'MORE'},
    ];
  }

  prevSlide() {
    if (this.currentImage === 1) {
      this.currentImage--;
      setTimeout(() => {
        this.isTransitionEnabled = false;
        this.currentImage = this.slides.length-1;
      }, 500);
    } 
    else {
      this.isTransitionEnabled = true;
      this.currentImage--;
    }
  }

  nextSlide() {
    if (this.currentImage === this.slides.length-2) {
      this.currentImage++;
      setTimeout(() => {
        this.isTransitionEnabled = false;
        this.currentImage = 0;
      }, 500);
    } 
    else {
      this.isTransitionEnabled = true;
      this.currentImage++;
    }
  }

  sign_in(): void {
    this.router.navigate(['/sign-in']);
  }
}
