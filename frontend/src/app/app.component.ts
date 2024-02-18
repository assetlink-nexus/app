import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'asset_link_nexus_app';
  loadedFeature = 'buy';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
