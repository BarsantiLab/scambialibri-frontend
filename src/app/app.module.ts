import { ErrorHandler, NgModule } from '@angular/core';
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
import { HttpService } from './services/http.service';
import { UiService } from './services/ui.service';

import { CanActivateOnboarding } from './services/can-activate/onboarding.service';
import { CanActivateUser } from './services/can-activate/user.service';

import { BookService } from './services/api/book.service';
import { SchoolService } from './services/api/school.service';
import { TransactionService } from './services/api/transaction.service';
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
import { TransactionStatusPipe } from './pipes/transaction-status.pipe';

import { PurchasesReportComponent } from './components/pages/books/purchases-report/purchases-report.component';
import { SalesReportComponent } from './components/pages/books/sales-report/sales-report.component';
import { OnboardingComponent } from './components/pages/onboarding/onboarding.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { TransactionComponent } from './components/ui/transaction/transaction.component';

import { OcticonDirective } from './directives/octicon.directive';

import { ConfirmationModalComponent } from './components/ui/confirmation-modal/confirmation-modal.component';

import { GenericErrorHandler } from './modules/generic-error-handler';

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
        TransactionStatusPipe,

        BookTableComponent,
        NewBookComponent,

        SignupComponent,
        OnboardingComponent,
        PurchasesReportComponent,
        SalesReportComponent,
        TransactionComponent,

        OcticonDirective,

        ConfirmationModalComponent
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
        UiService,

        CanActivateOnboarding,
        CanActivateUser,

        BookService,
        UserService,
        SchoolService,
        TransactionService,

        {
            provide: ErrorHandler,
            useClass: GenericErrorHandler
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
