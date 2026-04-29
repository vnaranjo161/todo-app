import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from '../../components/organisms/register-form/register-form.component';
import { UserRegisterRequest } from '../../core/shared/models/auth.model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './register.page.html'
})
export class RegisterPage {
  loading = false;

  onSubmit(form: UserRegisterRequest) {
    this.loading = true;
  }
}
