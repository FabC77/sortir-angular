import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environment';
import { GeocoderAutocomplete, GeocoderAutocompleteOptions } from '@geoapify/geocoder-autocomplete';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [],
  templateUrl: './address-input.component.html',
  styleUrls: ["/node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css", './address-input.component.scss']
})
export class AddressInputComponent implements AfterViewInit {


  @ViewChild('autocompleteContainer', { static: true }) autocompleteContainer!: ElementRef;
  private geocoderAutocomplete!: GeocoderAutocomplete;

  ngAfterViewInit(): void {
    const container = this.autocompleteContainer.nativeElement;

    // Customize your Geocoder-Autocomplete options
    const options: GeocoderAutocompleteOptions = {
      // Add your options here
      
      lang: "fr",
      filter:{ByCountryCodeOptions:"fr"},
      
      limit: 5,


    };

    // Create an instance of Geocoder-Autocomplete
    this.geocoderAutocomplete = new GeocoderAutocomplete(container,environment.geoApiKey,options);
  }
}
