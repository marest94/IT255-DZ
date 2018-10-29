import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/user/home/home.component";
import { AboutComponent } from "./pages/user/about/about.component";
import { ContactComponent } from "./pages/user/contact/contact.component";
import { GalleryComponent } from "./pages/user/gallery/gallery.component";
import { RoomsComponent } from "./pages/user/rooms/rooms.component";
import { ManageRoomsComponent } from "./pages/admin/manage-rooms/manage-rooms.component";
import { ManageHotelsComponent } from "./pages/admin/manage-hotels/manage-hotels.component";
import { UserService } from "./services/user.service";
import { RoomService } from "./services/room.service";
import { LoginDialogComponent } from "./dialogs/login/login.dialog.component";
import { RegisterDialogComponent } from "./dialogs/register/register.dialog.component";
import { ReservationService } from "./services/reservation.service";
import { ReservationComponent } from "./pages/user/reservation/reservation.component";
import { HotelService } from "./services/hotel.service";
import { RoomAddDialogComponent } from "./pages/admin/manage-rooms/dialogs/add/room.add.dialog.component";
import { RoomEditDialogComponent } from "./pages/admin/manage-rooms/dialogs/edit/room.edit.dialog.component";
import { RoomDeleteDialogComponent } from "./pages/admin/manage-rooms/dialogs/delete/room.delete.dialog.component";
import { HotelAddDialogComponent } from "./pages/admin/manage-hotels/dialogs/add/hotel.add.dialog.component";
import { HotelEditDialogComponent } from "./pages/admin/manage-hotels/dialogs/edit/hotel.edit.dialog.component";
import { HotelDeleteDialogComponent } from "./pages/admin/manage-hotels/dialogs/delete/hotel.delete.dialog.component";
import { SingleRoomComponent } from "./pages/user/single-room/single-room.component";
import { ReservationDeleteDialogComponent } from "./pages/user/reservation/dialogs/delete/reservation.delete.dialog.component";
import { ReservationEditDialogComponent } from "./pages/user/reservation/dialogs/edit/reservation.edit.dialog.component";
import { MyErrorStateMatcher } from "./MyErrorStateMatcher";
import { SearchPipe } from "./pipes/search";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    GalleryComponent,
    RoomsComponent,
    ManageRoomsComponent,
    ManageHotelsComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ReservationComponent,
    RoomAddDialogComponent,
    RoomEditDialogComponent,
    RoomDeleteDialogComponent,
    HotelAddDialogComponent,
    HotelEditDialogComponent,
    HotelDeleteDialogComponent,
    SingleRoomComponent,
    ReservationDeleteDialogComponent,
    ReservationEditDialogComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    RoomAddDialogComponent,
    RoomEditDialogComponent,
    RoomDeleteDialogComponent,
    HotelAddDialogComponent,
    HotelEditDialogComponent,
    HotelDeleteDialogComponent,
    ReservationDeleteDialogComponent,
    ReservationEditDialogComponent
  ],
  providers: [
    UserService,
    RoomService,
    ReservationService,
    HotelService,
    MyErrorStateMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
