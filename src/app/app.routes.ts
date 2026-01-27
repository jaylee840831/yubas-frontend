import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Blog } from './pages/blog/blog';
import { Faq } from './pages/faq/faq';
import { Fleet } from './pages/fleet/fleet';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'blog', component: Blog },
    { path: 'faq', component: Faq },
    { path: 'fleet', component: Fleet },
    { path: 'login', component: Login }
];
