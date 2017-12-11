import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { BooksComponent } from './components/pages/books/books.component';
import { LoginComponent } from './components/pages/login/login.component';

import { RoutingModule } from './modules/routing.module';

import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { GuardService } from './services/guard.service';
import { HttpService } from './services/http.service';
import { UiService } from './services/ui.service';

import { BookService } from './services/api/book.service';
import { UserService } from './services/api/user.service';

import { ToBuyComponent } from './components/pages/books/to-buy/to-buy.component';
import { ToSellComponent } from './components/pages/books/to-sell/to-sell.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { BookTableComponent } from './components/ui/book-table/book-table.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { NewBookComponent } from './components/ui/new-book/new-book.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';

import { BookStatusPipe } from './pipes/book-status.pipe';
import { BookPipe } from './pipes/book.pipe';

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

        BookStatusPipe,
        BookPipe,

        BookTableComponent,

        NewBookComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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

        BookService,
        UserService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
