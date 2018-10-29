import { Pipe } from "@angular/core";
@Pipe({
  name: "SearchPipe"
})
export class SearchPipe {
  transform(value: any, searchTerm: any): Object[] {
    if (value == null) {
      return null;
    }
    if (searchTerm !== undefined) {
      return value.filter(function(room) {
        return room.beds.includes(searchTerm) || room.size.includes(searchTerm);
      });
    } else {
      return value;
    }
  }
}
