import { Routes } from '@angular/router';
import { LibraryComponent } from './components/musictool/Library/library.component';
import { CreateEditLibraryComponent } from './components/musictool/Library/create-edit-library/create-edit-library.component';
import { ContentComponent } from './components/musictool/content/content.component';
import { CreateEditContentComponent } from './components/musictool/content/create-edit-content/create-edit-content.component';
import { IndexComponent } from './components/musictool/home/index/index.component';
import { UserComponent } from './components/musictool/user/user.component';
import { CreateedituserComponent } from './components/musictool/user/createedituser/createedituser.component';
import { RoleComponent } from './components/musictool/role/role.component';
import { CreateeditroleComponent } from './components/musictool/role/createeditrole/createeditrole.component';
import { LoginComponent } from './components/musictool/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { PlanComponent } from './components/musictool/plan/plan.component';
import { CreaeditaplanComponent } from './components/musictool/plan/creaeditaplan/creaeditaplan.component';
import { MessageComponent } from './components/musictool/message/message.component';
import { CreaeditaMessageComponent } from './components/musictool/message/creaedita-message/creaedita-message.component';
import { ChatComponent } from './components/musictool/chat/chat.component';
import { CreaeditachatComponent } from './components/musictool/chat/creaeditachat/creaeditachat.component';
import { LandingComponent } from './components/musictool/landing/landing.component';
import { ContentDetailsComponent } from './components/musictool/home/content-details/content-details.component';
import { ConversationComponent } from './components/musictool/chat/conversation/conversation.component';
import { CartComponent } from './components/musictool/home/cart/cart.component';
import { RegisterComponent } from './components/musictool/register/register.component';
import { SubscriptionComponent } from './components/musictool/subscription/subscription.component';
import { ArtistComponent } from './components/musictool/artist/artist.component';
import { CreateeditartistComponent } from './components/musictool/artist/createeditartist/createeditartist.component';
import { ListartistComponent } from './components/musictool/artist/listartist/listartist.component';
import { ReportsComponent } from './components/musictool/reports/reports.component';
import { Reporte2Component } from './components/musictool/reports/reporte2/reporte2.component';


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },

    {
        path:'landing',
        component: LandingComponent
    },
    
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
    path:'library',
    title:'Librerias',
    component:LibraryComponent,
    children:[
        {path:'new',title:'Nueva Libreria',component:CreateEditLibraryComponent},
        {path:'ediciones/:id',title:'Edicion de Libreria',component:CreateEditLibraryComponent} 
    ],
    canActivate: [segGuard]
    },

    {
        path:'content', title:'Contenidos', component:ContentComponent,
        children:[
            { path:'new',title:'Nuevo Contenido',component:CreateEditContentComponent },
            { path:'ediciones/:id',title:'Edicion de Contenido',component:CreateEditContentComponent } 
        ],
        canActivate: [segGuard]
    },

    {
        path:'content/:id', title:'Detalles de contenido', component:ContentDetailsComponent,
        canActivate: [segGuard]
    },
    
    
   // {
   //  path:'purchase',title:'Compras', component:PurchaseComponent,
  //   children:[
   //  {path:'new',title:'Nueva Compra',component:CreateEditPurchaseComponent},
  //   {path:'ediciones/:id',title:'Edicion de Compra',component:CreateEditPurchaseComponent} 
 //    ]},
  
    {
        path:'home',
        title: 'Inicio',
        component:IndexComponent,
        canActivate: [segGuard]
    },

    {
        path: 'cart',
        title: 'Carrito de compras',
        component: CartComponent
    },

    {
        path:'usuarios', title: 'Usuarios', component:UserComponent,
        children:[
            { path: 'nuevo', title: 'Registro', component:CreateedituserComponent },
            { path: 'ediciones/:id', title: 'Editar Perfil', component:CreateedituserComponent }
        ],
        canActivate: [segGuard]
    },
    {
        path:'roles',title: 'Roles', component:RoleComponent,
        children:[
            { path: 'nuevo', title: 'Asignar Rol', component:CreateeditroleComponent}
        ],
        canActivate: [segGuard] 
    },
    {
        path:'plans',component:SubscriptionComponent,
        canActivate: [segGuard]
    },
    {
        path:'message',component:MessageComponent,
        children:[
            { path:'creaeditamessage',component:CreaeditaMessageComponent },
        ],
        canActivate: [segGuard]
    },
    {
        path:'chats',component:ChatComponent,
        children:[
            { path:'creaeditachats',component:CreaeditachatComponent },
            { path:'conversation/:id',component:ConversationComponent },
        ],
        canActivate: [segGuard]
    },
    {
        path:'artists', title: 'Artistas', component:ArtistComponent,
        children:[
            { path:'new',title:'Nuevo Artista',component:ListartistComponent },
            { path:'ediciones/:id',title:'Edicion de Artista',component:CreateEditContentComponent } 
        ]
    },
    {
        path:'reportes',
        component:ReportsComponent,
        children: [
          {
            path: 'reporte02',
            component: Reporte2Component
          }
        ]
      }
];
