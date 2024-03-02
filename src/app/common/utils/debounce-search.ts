import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

export function debounceSearch(formControl: FormControl, dueTime: number) {
  return formControl.valueChanges.pipe(
    debounceTime(dueTime),
    distinctUntilChanged(),
    filter((value) => typeof value === 'string'),
    map((query) => query as string),
  );
}
