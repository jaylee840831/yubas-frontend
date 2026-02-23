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
import { Member } from './pages/member/member';
import { Order } from './pages/order/order';
import { OrderTypeList } from './pages/order-type-list/order-type-list';
import { MainLayout } from './layouts/main-layout/main-layout';
import { NoHeaderFooterLayout } from './layouts/no-header-footer-layout/no-header-footer-layout';
import { NoContent } from './pages/no-content/no-content';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Home },
            { path: 'about', component: About },
            { path: 'campaign', component: Campaign },
            // { path: 'business/company', component: Business },
            // { path: 'business/partner', component: Partner },
            // { path: 'blog/fleet', component: Fleet },
            // { path: 'blog/trip', component: Trip },
            // { path: 'shop', component: Shop },
            { path: 'faq', component: Faq },
            { path: 'member', component: Member, canActivate: [authGuard]},
            { path: 'booking/form', component: Order, canActivate: [authGuard]},
            { path: 'booking', component: OrderTypeList, canActivate: [authGuard]},

            // TODO: 待開發畫面
            { path: 'business/company', component:  NoContent},
            { path: 'business/partner', component: NoContent },
            { path: 'blog/fleet', component: NoContent },
            { path: 'blog/trip', component: NoContent },
            { path: 'shop', component: NoContent }
        ]
    },
    {
        path: '',
        component: NoHeaderFooterLayout,
        children: [
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login').then(m => m.Login)
            }
        ]
    }
];
