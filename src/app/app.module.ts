import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';

import { BooksComponent } from './components/pages/books/books.component';
import { LoginComponent } from './components/pages/login/login.component';

import { RoutingModule } from './modules/routing.module';

import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';
import { GuardService } from './services/guard.service';
import { UiService } from './services/ui.service';

import { BookService } from './services/api/book.service';

import { AlertComponent } from './components/ui/alert/alert.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { ToBuyComponent } from './components/pages/books/to-buy/to-buy.component';
import { ToSellComponent } from './components/pages/books/to-sell/to-sell.component';

import { BookPipe } from './pipes/book.pipe';
import { BookTableComponent } from './components/ui/book-table/book-table.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        BooksComponent,
        AlertComponent,
        NavbarComponent,
        SidebarComponent,
        ToBuyComponent,
        ToSellComponent,

        BookPipe,

        BookTableComponent
    ],

    imports: [
        BrowserModule,
        RoutingModule,
        HttpModule,

        FormsModule,
        ReactiveFormsModule
    ],

    providers: [
        AuthService,
        ConfigService,
        HttpService,
        GuardService,
        UiService,

        BookService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
