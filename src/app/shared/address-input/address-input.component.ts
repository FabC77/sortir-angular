import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { environment } from '../../../environment';
import { GeocoderAutocomplete, GeocoderAutocompleteOptions } from '@geoapify/geocoder-autocomplete';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [],
  templateUrl: './address-input.component.html',
  styleUrls: [ './address-input.component.scss']
})
export class AddressInputComponent implements AfterViewInit {


  @ViewChild('autocompleteContainer', { static: true }) autocompleteContainer!: ElementRef;
  private geocoderAutocomplete!: GeocoderAutocomplete;
  @Output() addressSelected = new EventEmitter<any>();
  
  ngAfterViewInit(): void {
    const container = this.autocompleteContainer.nativeElement;

    const options: GeocoderAutocompleteOptions = {
      lang: "fr",
      filter: { ByCountryCodeOptions: "fr" },
      limit: 5,
      placeholder: "Saisissez une adresse*"
      


    };

    this.geocoderAutocomplete = new GeocoderAutocomplete(container, environment.geoApiKey, options);
    this.geocoderAutocomplete.on('select', (location) => {
      this.addressSelected.emit(location);
    });
  }
}
