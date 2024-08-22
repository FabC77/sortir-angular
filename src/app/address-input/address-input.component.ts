import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { environment } from '../../environment';
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

    // Customize your Geocoder-Autocomplete options
    const options: GeocoderAutocompleteOptions = {
      // Add your options here

      lang: "fr",
      filter: { ByCountryCodeOptions: "fr" },
      limit: 5,
      placeholder: "Saisissez une adresse*"
      


    };

    // Create an instance of Geocoder-Autocomplete
    this.geocoderAutocomplete = new GeocoderAutocomplete(container, environment.geoApiKey, options);
    this.geocoderAutocomplete.on('select', (location) => {
      // Emit the selected location to the parent component
      this.addressSelected.emit(location);
    });
  }
}
