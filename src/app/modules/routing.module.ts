import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateUser } from 'app/services/can-activate/user.service';

import { BooksComponent } from 'app/components/pages/books/books.component';
import { LoginComponent } from 'app/components/pages/login/login.component';

import { PurchasesReportComponent } from 'app/components/pages/books/purchases-report/purchases-report.component';
import { SalesReportComponent } from 'app/components/pages/books/sales-report/sales-report.component';
import { ToBuyComponent } from 'app/components/pages/books/to-buy/to-buy.component';
import { ToSellComponent } from 'app/components/pages/books/to-sell/to-sell.component';
import { ForgotPasswordComponent } from 'app/components/pages/forgot-password/forgot-password.component';
import { OnboardingComponent } from 'app/components/pages/onboarding/onboarding.component';
import { PrivacyPolicyComponent } from 'app/components/pages/privacy-policy/privacy-policy.component';
import { SignupComponent } from 'app/components/pages/signup/signup.component';
import { TermsAndConditionsComponent } from 'app/components/pages/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'signup',
    component: SignupComponent
}, {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
}, {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
}, {
    path: 'forgot-password',
    component: ForgotPasswordComponent
}, {
    path: 'onboarding',
    component: OnboardingComponent
}, {
    path: 'books',
    component: BooksComponent,
    canActivate: [CanActivateUser],
    children: [{
        path: '',
        redirectTo: '/books/to-sell',
        pathMatch: 'full'
    }, {
        path: 'to-buy',
        component: ToBuyComponent
    }, {
        path: 'to-sell',
        component: ToSellComponent
    }, {
        path: 'purchases-report',
        component: PurchasesReportComponent
    }, {
        path: 'sales-report',
        component: SalesReportComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
