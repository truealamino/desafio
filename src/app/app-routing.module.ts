import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'countries',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
    },
    {
        path: '',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
    },
    {
        path: '**',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
