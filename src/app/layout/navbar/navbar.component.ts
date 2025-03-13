


import { Component, AfterViewInit, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from './../../core/services/auth/auth.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject (CartService)
  private readonly myTranslateService = inject(MyTranslateService);
  currentLang: 'en' | 'ar' = 'en';
  isDarkMode: boolean = false;
  countCart!:number;

  isLogin = input<boolean>(true);
  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next:(value)=>{
        this.countCart = value;
        console.log(value);


      }
    })
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=> {
        this.cartService.cartNumber.next(res.numOfCartItems)

      },
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  ngAfterViewInit() {
    initFlowbite();


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyTheme();
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
      this.applyTheme();
    }
  }

  changeLanguage() {
    // this.myTranslateService.changeLangTranslate(lang)
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';


    this.myTranslateService.changeLangTranslate(this.currentLang);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  signOut(): void {
    this.authService.logOut();
  }
}
