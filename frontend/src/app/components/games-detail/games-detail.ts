import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from '../../services/data-service';
import {Router} from '@angular/router';
import {FormValidators} from '../../Validators/FormValidators';
import {Games, Toast} from '../../common/interface';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-games-detail',
  imports: [
    ReactiveFormsModule,
    NgbToast
  ],
  templateUrl: './games-detail.html',
  styleUrl: './games-detail.css',
})
export class GamesDetail implements OnInit {
  private readonly dataService: DataService = inject(DataService);
  @Input('id') idGame!: number;
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  loaded = false;
  show = false;
  toast: Toast = {
    text: '',
    className: ''
  };

  formGame = this.formBuilder.group({
    id: [0],
    titulo: ['', [Validators.required, Validators.minLength(4), FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenName(['sex'])]],
    imagenUrl: ['', [Validators.required, Validators.minLength(7), FormValidators.notOnlyWhiteSpace]],
    plataforma: ['', [Validators.required, Validators.minLength(3), FormValidators.notOnlyWhiteSpace]],
    precio: [0, [Validators.required, Validators.min(0)]],
  })

  get titulo() {
    return this.formGame.get('titulo');
  }

  get imagenUrl() {
    return this.formGame.get('imagenUrl');
  }

  get plataforma() {
    return this.formGame.get('plataforma');
  }

  get precio() {
    return this.formGame.get('precio');
  }


  ngOnInit() {
    if (this.idGame) {
      this.loadGame();
    } else {
      this.loaded = true;
      this.formGame.reset();
    }

  }

  private loadGame() {
    this.dataService.getOneGame(this.idGame).subscribe(
      {
        next: data => {
          this.formGame.patchValue(data);
          this.loaded = true;
          console.log(data);
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
          console.log('carga completada');
        }
      }
    )
  }

  onSubmit() {
    const formValues = this.formGame.getRawValue() as Games;
    if (this.formGame.invalid) {
      this.formGame.markAllAsTouched();
      return;
    }
    if (this.idGame) {
      this.dataService.putGame(formValues).subscribe(
        {
          next: data => {
            //alert('Videojuego Modificado');
            this.show = false;
            setTimeout(() => {
              this.toast.className = 'bg-success text-light'; // Cambiado a success para creación/edición
              this.toast.text = `Actualizado correctamente`;
              this.show = true;

              // Esperamos 1.5 segundos a que vea el Toast y LUEGO navegamos
              setTimeout(() => {
                this.router.navigate(['/games-list']);
              }, 1500);
            }, 50);
          },
          error: error => {
            console.error(error);
          }
        }
      )
    } else {
      this.dataService.postGame(formValues).subscribe({
        next: data => {
          //alert('Videojuego Creado');
          this.show = false;
          setTimeout(() => {
            this.toast.className = 'bg-success text-light'; // Cambiado a success para creación/edición
            this.toast.text = `Guardado correctamente`;
            this.show = true;

            // Esperamos 1.5 segundos a que vea el Toast y LUEGO navegamos
            setTimeout(() => {
              this.router.navigate(['/games-list']);
            }, 1500);
          }, 50);
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }
}
