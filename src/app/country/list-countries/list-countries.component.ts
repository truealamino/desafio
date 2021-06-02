import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { Swal } from 'src/app/utils/swal';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html'
})
export class ListCountriesComponent implements OnInit {

    countries: Country[] = []
    totalCountries: Country[] = []
    typeSearch: any = 0
    typeSearchLeg: any = "Todos"
    term: string = ''
    currentPage: number = 1
    pageSize: number = 10
    countriesPag: number

    constructor(
        private countryService: CountryService,
        private swal: Swal,
        private app: AppComponent
    ) { }

    ngOnInit(): void {
        this.loadCountries()
    }

    loadCountries() {
        this.app.loading = true
        if ((this.typeSearch != 0 && this.term == '') || (this.typeSearch == 0 && this.term != '')) {
            this.swal.msgAlert('Atenção', 'Informações incompatíveis para filtrar', 'warning', 'Ok')
            return false
        }

        this.countryService.list(this.typeSearch, this.term).subscribe(response => {
            this.app.loading = false
            if (response.ret == 1) {
                this.totalCountries = response.data
                this.countriesPag = this.totalCountries.length
                this.setCountries()
            } else {
                this.swal.msgAlert('Atenção', response.msg, 'warning', 'Ok')
            }
        }, error => {
            this.app.loading = false
            this.swal.msgAlert('Atenção', 'Ocorreu um problema ao tentar buscar os países!', 'error', 'Ok')
        })
    }

    setCountries() {
        if (this.totalCountries.length > 0) {
            let total = this.totalCountries.length
            let endIndex = (this.currentPage * this.pageSize) - 1
            let initIndex = endIndex - this.pageSize - 1

            this.countries = this.totalCountries.filter((value, index) => index >= initIndex && index <= endIndex)
        }
    }

    onChangeStatus(typeSearch = null) {
        this.typeSearch = null
        this.typeSearchLeg = null
        if (typeSearch != null) {
            switch (typeSearch) {
                case 0:
                    this.typeSearchLeg = 'Todos'
                    break;
                case 1:
                    this.typeSearchLeg = 'Nome'
                    break;
                case 2:
                    this.typeSearchLeg = 'Sigla'
                    break;
                case 3:
                    this.typeSearchLeg = 'Moeda'
                    break;

                default:
                    this.typeSearchLeg = 'Todos'
                    break;
            }
            this.typeSearch = typeSearch
            this.term = ''
        }
    }

    pageChanged(data) {
        this.currentPage = data.currentPage
        this.pageSize = data.pageSize
        this.loadCountries()
    }
}
