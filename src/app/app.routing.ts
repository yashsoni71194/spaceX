import { ModuleWithProviders } from "@angular/core";
import {
  Route,
  RouterModule
} from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
    {path:'/home',component: HomeComponent},
    { path: '**', redirectTo: '' }
];

/**
 *  To Enable Tracing for debugging purposes only
 *  Change RouterModule.forRoot(routes, { enableTracing: true });
 */

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload'
});
