import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"]
})
export class GalleryComponent implements OnInit {
  assets = [
    "../../../../assets/img1.jpg",
    "../../../../assets/img2.jpg",
    "../../../../assets/img3.jpg",
    "../../../../assets/img4.jpg",
    "../../../../assets/img5.jpg",
    "../../../../assets/img6.jpg",
    "../../../../assets/img7.jpg",
    "../../../../assets/img8.jpg",
    "../../../../assets/img9.jpg",
    "../../../../assets/img10.jpg",
    "../../../../assets/img11.jpg",
    "../../../../assets/img12.jpg"
  ];

  constructor() {}

  ngOnInit() {}
}
