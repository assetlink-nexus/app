import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() selectFeature = new EventEmitter();

  username = 'dnuszkiewicz';

  onSelect(feature: string) {
    this.selectFeature.emit(feature);
  }
}
