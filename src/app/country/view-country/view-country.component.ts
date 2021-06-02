import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { AppComponent } from 'src/app/app.component';
import { Border, Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { Swal } from 'src/app/utils/swal';

@Component({
    selector: 'app-view-country',
    templateUrl: './view-country.component.html'
})
export class ViewCountryComponent implements OnInit {

    country: Country = {
        alpha3Code: null,
        capital: null,
        flag: null,
        name: null,
        population: null,
        borders: [],
        currencies: [{
            code: null,
            name: null,
            symbol: null
        }],
        languages: [{
            iso639_1: null,
            iso639_2: null,
            name: null,
            nativeName: null
        }],
        regionalBlocs: [{
            acronym: null,
            name: null,
            otherAcronyms: [],
            otherNames: []
        }],
        timezones: [],
        region: null
    }
    country_code: string = null
    borders: Border[] = []
    originCountry: Border = {
        alpha3Code: null,
        name: null
    }
    regionCountries: Border[] = []
    destinyCountry: Border = {
        alpha3Code: null,
        name: null
    }
    routeCountries: string[] = []
    listRoute: string[] = []
    listRouteOld: string[] = []
    countriesPass: string[] = []
    finalRoute: string = null

    constructor(
        private countryService: CountryService,
        private swal: Swal,
        private route: ActivatedRoute,
        private app: AppComponent
    ) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.route.params.subscribe((params: any) => {
            if (params.code) {
                this.country_code = params.code
                this.loadCountry()
            }
        })
    }

    loadCountry() {
        this.app.loading = true
        this.countryService.show(this.country_code).subscribe(response => {
            if (response.ret == 1) {
                this.country = response.data
                this.originCountry = {
                    alpha3Code: this.country.alpha3Code,
                    name: this.country.name
                }

                this.getBorders(this.country.borders)
                this.loadCountriesByRegion(this.country.region)
            } else {
                this.app.loading = false
                this.swal.msgAlert('Atenção', response.msg, 'warning', 'Ok')
            }
        }, error => {
            this.app.loading = false
            this.swal.msgAlert('Atenção', 'Ocorreu um problema ao tentar buscar o país!', 'error', 'Ok')
        })
    }

    getBorders(borders): void {
        this.app.loading = true
        this.countryService.getBorders(borders.join(';')).subscribe(response => {
            this.app.loading = false
            if (response.ret == 1) {
                this.borders = response.data
            }
        })
    }

    loadCountriesByRegion(region) {
        this.countryService.listCountriesByRegion(region).subscribe(response => {
            if (response.ret == 1) {
                this.regionCountries = response.data.filter(region => region.alpha3Code != this.originCountry.alpha3Code && region.borders.length > 0)
            }
        })
    }

    openModal() {
        this.destinyCountry = {
            alpha3Code: null,
            name: null
        }
        this.routeCountries = []
    }

    onSearchRoute() {
        if (this.originCountry.alpha3Code != null && this.destinyCountry.alpha3Code != null) {
            this.checkArraysBorders(this.country.borders, this.destinyCountry.alpha3Code)
            this.setRota()
        }
    }

    checkArraysBorders(origin: string[], code: string) {
        let final: string[] = this.regionCountries.find(item => item.alpha3Code == code).borders
        if (this.countriesPass.length > 0) {
            final = final.filter(a => this.countriesPass.findIndex(index => index == a) == -1)
        }
        this.countriesPass.push(code)

        if (final.length != 0) {
            let keepGoing: boolean = true
            final.forEach(element => {
                if (keepGoing) {
                    this.listRoute.push(element)
                    if (origin.findIndex(item => item == element) == -1) {
                        this.checkArraysBorders(this.country.borders, element)
                    } else {
                        keepGoing = false
                        if ((this.listRouteOld.length > 0 && this.listRouteOld.length > this.listRoute.length) || this.listRouteOld.length == 0) {
                            this.listRouteOld = this.listRoute
                            this.listRoute = []
                        }
                    }
                }
            })
        } else {
            this.listRoute = []
        }
    }

    setRota() {
        if (this.listRouteOld.length > 0) {
            this.listRouteOld.reverse()
            let result: string[] = []
            this.listRouteOld.forEach((value, index) => {
                let name = this.regionCountries.find(item => item.alpha3Code == value).name
                result.push(`${index + 1}. ${name}`)
            })
            this.finalRoute = result.join(', ')
        }
    }
}
