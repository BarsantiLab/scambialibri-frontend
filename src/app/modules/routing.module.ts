import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateOnboarding } from 'app/services/can-activate/onboarding.service';
import { CanActivateUser } from 'app/services/can-activate/user.service';

import { BooksComponent } from 'app/components/pages/books/books.component';
import { LoginComponent } from 'app/components/pages/login/login.component';

import { ResultsComponent } from 'app/components/pages/books/results/results.component';
import { ToBuyComponent } from 'app/components/pages/books/to-buy/to-buy.component';
import { ToSellComponent } from 'app/components/pages/books/to-sell/to-sell.component';
import { OnboardingComponent } from 'app/components/pages/onboarding/onboarding.component';
import { SignupComponent } from 'app/components/pages/signup/signup.component';

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
    path: 'onboarding',
    component: OnboardingComponent, // TODO: remove can-activate onboarding
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
        path: 'results',
        component: ResultsComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
