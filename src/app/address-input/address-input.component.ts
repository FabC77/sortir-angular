import { Component } from '@angular/core';
import { environment } from '../../environment';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [GeoapifyGeocoderAutocompleteModule.withConfig('ff')],
  templateUrl: './address-input.component.html',
  styleUrls: ['/node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css', './address-input.component.scss']
})
export class AddressInputComponent {
  onUserInput(input: string): void {
    // Capture and react to user input
    console.log('User Input:', input);
  }
  onSuggestionsChange(suggestions: GeoJSON.Feature[]): void {
    // Handle the updated suggestions list
    console.log('Suggestions:', suggestions);
  }
  placeSelected(place: any) {
    console.log('Selected Place:', place);
  }


}
