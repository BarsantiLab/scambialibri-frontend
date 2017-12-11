import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../services/guard.service';

import { BooksComponent } from '../components/pages/books/books.component';
import { LoginComponent } from '../components/pages/login/login.component';

import { ResultsComponent } from '../components/pages/books/results/results.component';
import { ToBuyComponent } from '../components/pages/books/to-buy/to-buy.component';
import { ToSellComponent } from '../components/pages/books/to-sell/to-sell.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'books',
    component: BooksComponent,
    canActivate: [GuardService],
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
