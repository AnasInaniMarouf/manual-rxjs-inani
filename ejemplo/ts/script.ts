import { fromEvent } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';

//Solo se puede tomar una de estas tres velocidades a la vez
type Velocidad = 1 | 10 | 100;

const tiempoTierra = document.getElementById('tiempoTierra');
const tiempoMarte = document.getElementById('tiempoMarte');

const bx1 = document.getElementById('bx1');
const bx10 = document.getElementById('bx10');
const bx100 = document.getElementById('bx100');

if (tiempoTierra != null && tiempoMarte != null && bx1 != null && bx10 != null && bx100 != null) {

    //Guarda la velocidad que esta en el momento. Empieza en 1 (velocidad normal)
    let velocidad = new BehaviorSubject<Velocidad>(1);  //Como es del tipo Velocidad, solo puede tomar como valor el 1 10 o 100, y asi ninguno otro funcionaria (como un x1000000)

    //Junta los clics de los tres botones en uno solo.
    merge(
        fromEvent(bx1, 'click', () => {
            bx1.style.color = "salmon";         //Esto es simplemente para que el boton que este pulsado este resaltado
            bx1.style.borderColor = "salmon";

            bx10.style.color = "#FCF1D0";
            bx10.style.borderColor = "#FCF1D0";

            bx100.style.color = "#FCF1D0";
            bx100.style.borderColor = "#FCF1D0";

        }).pipe(map((): Velocidad => 1)),     //Velocidad normal

        fromEvent(bx10, 'click', () => {
            bx1.style.color = "#FCF1D0";
            bx1.style.borderColor = "#FCF1D0";

            bx10.style.color = "salmon";
            bx10.style.borderColor = "salmon";

            bx100.style.color = "#FCF1D0";
            bx100.style.borderColor = "#FCF1D0";

        }).pipe(map((): Velocidad => 10)),    //10 veces mas rapido

        fromEvent(bx100, 'click', () => {
            bx1.style.color = "#FCF1D0";
            bx1.style.borderColor = "#FCF1D0";

            bx10.style.color = "#FCF1D0";
            bx10.style.borderColor = "#FCF1D0";

            bx100.style.color = "salmon";
            bx100.style.borderColor = "salmon";

        }).pipe(map((): Velocidad => 100))    //100 veces mas rapido
    ).subscribe((v) => velocidad.next(v));    //Se guarda la velocidad

    /**
     * Crea un reloj que cuenta días
     * 
     * @param duracionDia Lo que dura un día en milisegundos
     * @returns Un flujo del total de días que han pasado
     */
    function crearReloj(duracionDia: number): Observable<number> {
        return velocidad.pipe(
            //Si se cambia la velocidad, se para el contador anterior y empieza otro más rápido o más lento (dependiendo del boton que se pulse)
            switchMap((v) => interval(duracionDia / v)),
            //Suma 1 día cada segundo
            scan((dias) => dias + 1, 0),
            //Empieza en 0 para que se vea "0 años, 0 meses, 0 días" desde el principio
            startWith(0)
        );
    }

    /**
     * Pasa un numero total de dias a texto
     * 
     * ej: 1000 dias => 2 años, 9 meses, 10 dias
     * 
     * @param totalDias Total de días que han pasado
     * @returns una cadena con el resultado
     */
    function deDiasATexto(totalDias: number): string {
        return Math.floor(totalDias / 360) + " años, " +            //Un año tiene 360 días porque he considerado que cada mes tiene 30 dias (30 dias * 12 meses = 360 dias)
                Math.floor((totalDias % 360) / 30) + " meses, " +   //Así no hace falta un array con los días de cada mes
                totalDias % 30 + " días";
    }

    //He puesto que un un segundo sea como un dia
    crearReloj(1000).subscribe((dias) => (tiempoTierra.innerHTML = deDiasATexto(dias)));
    //Como Marte tarda mas tiempo en dar la vueta al Sol, he dividido el numero de dias terrestres que tarda Marte en dar una vuelta al Sol, y lo he dividido entree los dias que tarda la Tierra, que seria casi el doble de tiempo
    crearReloj(1000 * (687 / 360)).subscribe((dias) => (tiempoMarte.innerHTML = deDiasATexto(dias)));
}