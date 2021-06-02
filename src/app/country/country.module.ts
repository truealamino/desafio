import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCountriesComponent } from './list-countries/list-countries.component';
import { SubheaderComponent } from '../components/subheader/subheader.component';
import { AppModule } from '../app.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../services/country.service';
import { FormsModule } from '@angular/forms';
import { ViewCountryComponent } from './view-country/view-country.component';

const ROUTES: Routes = [
    { path: '', component: ListCountriesComponent },
    { path: 'country/:code', component: ViewCountryComponent },
]

@NgModule({
    declarations: [
        ListCountriesComponent,
        ViewCountryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ComponentsModule,
        FormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CountryModule { }
