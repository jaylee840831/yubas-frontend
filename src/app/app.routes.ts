import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Fleet } from './pages/fleet/fleet';
import { Trip } from './pages/trip/trip';
import { Faq } from './pages/faq/faq';
import { Business } from './pages/business/business';
import { Partner } from './pages/partner/partner';
import { Campaign } from './pages/campaign/campaign';
import { Shop } from './pages/shop/shop';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'campaign', component: Campaign },
    { path: 'business/company', component: Business },
    { path: 'business/partner', component: Partner },
    { path: 'blog/fleet', component: Fleet },
    { path: 'blog/trip', component: Trip },
    { path: 'shop', component: Shop },
    { path: 'faq', component: Faq },
    { path: 'login', component: Login }
];
