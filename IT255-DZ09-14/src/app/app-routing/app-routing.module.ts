import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ManageRoomsComponent } from "../pages/admin/manage-rooms/manage-rooms.component";
import { ManageHotelsComponent } from "../pages/admin/manage-hotels/manage-hotels.component";
import { HomeComponent } from "../pages/user/home/home.component";
import { AboutComponent } from "../pages/user/about/about.component";
import { RoomsComponent } from "../pages/user/rooms/rooms.component";
import { GalleryComponent } from "../pages/user/gallery/gallery.component";
import { ContactComponent } from "../pages/user/contact/contact.component";
import { ReservationComponent } from "../pages/user/reservation/reservation.component";
import { SingleRoomComponent } from "../pages/user/single-room/single-room.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "home", component: HomeComponent },
  { path: "about-us", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "gallery", component: GalleryComponent },
  { path: "rooms", component: RoomsComponent },
  { path: "reservations", component: ReservationComponent },
  { path: "manage-hotels", component: ManageHotelsComponent },
  { path: "manage-rooms", component: ManageRoomsComponent },
  { path: "room/:id", component: SingleRoomComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
