import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

let relojTierra = interval(1000).pipe(
  map(i => "Tierra - Segundo " + (i + 1)),
  take(5)
);

let relojMarte = interval(600).pipe(
  map(i => "Marte - Segundo " + (i + 1)),
  take(8)
);

merge(relojTierra, relojMarte).subscribe(mensaje => {
  console.log(mensaje);
});