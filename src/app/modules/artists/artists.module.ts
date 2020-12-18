import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistListComponent } from './components/artists/artist-list/artist-list.component';


@NgModule({
  declarations: [ArtistsComponent, ArtistListComponent],
  imports: [
    CommonModule,
    ArtistsRoutingModule
  ]
})
export class ArtistsModule { }
