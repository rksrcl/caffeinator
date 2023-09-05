import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    data: { hideTabs: true }
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
    data: { hideTabs: true }
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule),
    data: { hideTabs: true }
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
    data: { hideTabs: true }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    data: { hideTabs: true }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    data: { hideTabs: true }
  },
  {
    path: 'question-list',
    loadChildren: () => import('./question-list/question-list.module').then( m => m.QuestionListPageModule)
  },
  {
    path: 'daily-progress-check',
    loadChildren: () => import('./daily-progress-check/daily-progress-check.module').then( m => m.DailyProgressCheckPageModule)
  },
  {
    path: 'qanda',
    loadChildren: () => import('./qanda/qanda.module').then( m => m.QandaPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
