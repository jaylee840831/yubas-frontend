import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoginPage!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.isLoginPage = true;

    this.loginForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^09\d{8}$/) // 台灣手機格式
        ]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
      captcha: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]{6}$/) // 6碼英數
        ]
      ]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return '此欄位必填';
    }

    if (controlName === 'phone' && control.errors['pattern']) {
      return '手機號碼格式錯誤';
    }

    if (controlName === 'username') {
      if (control.errors['minlength'] || control.errors['maxlength']) {
        return '會員名稱 1~10 碼';
      }
    }

    if (controlName === 'captcha' && control.errors['pattern']) {
      return '驗證碼 6 碼';
    }

    return '格式錯誤';
  }

  showAlert(message: string, message2: string, styleClass: string) {
    this.snackBar.open(message, message2, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [styleClass]
    });
  }

  onSubmit(event: SubmitEvent) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // TODO: 透過api到後端驗證帳密是否存在資料庫
    const username = this.loginForm.value.username;
    const phone = this.loginForm.value.phone;
    const captcha = this.loginForm.value.captcha;
    const submitter = event.submitter as HTMLButtonElement;

    if (submitter.value === 'login') {
      if(username === '小明' && phone === '0912345678' && captcha === 'abc123') {
        this.showAlert('登入成功', '', 'snackbar-success');

        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            userToken: this.commonService.encodeBase64(username + ':' + phone),
            loginTime: new Date()
          })
        );

        this.router.navigate(['/']);
      } else {
        this.showAlert('登入失敗', '', 'snackbar-error')
      }
    } else if (submitter.value === 'register') {
      this.showAlert('註冊成功', '', 'snackbar-success');

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          userToken: this.commonService.encodeBase64(username + ':' + phone),
          loginTime: new Date()
        })
      );

      this.router.navigate(['/']);
    }
  }
}