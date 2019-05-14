import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'graphs', loadChildren: './pages/graphs/graphs.module#GraphsPageModule' },
  { path: 'cloudhome', loadChildren: './pages/cloudhome/cloudhome.module#CloudhomePageModule' },
  { path: 'readings', loadChildren: './pages/readings/readings.module#ReadingsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'growth', loadChildren: './pages/growth/growth.module#GrowthPageModule' },
  { path: 'planner', loadChildren: './pages/planner/planner.module#PlannerPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'finance', loadChildren: './pages/finance/finance.module#FinancePageModule' },
  { path: 'dollartracker', loadChildren: './pages/dollartracker/dollartracker.module#DollartrackerPageModule' },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'emergency', loadChildren: './pages/emergency/emergency.module#EmergencyPageModule' },
  { path: 'Addnutrition', loadChildren: './pages/addnutrition/addnutrition.module#AddnutritionPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
    { path: 'popover', loadChildren: './pages/popover/popover.module#PopoverPageModule' },
    { path: 'chats/:id', component: ChatComponent },
    { path: 'chats', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
