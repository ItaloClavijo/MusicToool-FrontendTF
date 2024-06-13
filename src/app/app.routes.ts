import { Routes } from '@angular/router';
import { LibraryComponent } from './components/musictool/Library/library.component';
import { CreateEditLibraryComponent } from './components/musictool/Library/create-edit-library/create-edit-library.component';
import { ContentComponent } from './components/musictool/content/content.component';
import { CreateEditContentComponent } from './components/musictool/content/create-edit-content/create-edit-content.component';
import { IndexComponent } from './components/musictool/home/index/index.component';
import { UsersComponent } from './components/musictool/users/users.component';
import { CreaeditausersComponent } from './components/musictool/users/creaeditausers/creaeditausers.component';
import { ListarusersComponent } from './components/musictool/users/listarusers/listarusers.component';
import { RolesComponent } from './components/musictool/roles/roles.component';
import { CreaeditarolesComponent } from './components/musictool/roles/creaeditaroles/creaeditaroles.component';
import { LoginComponent } from './components/musictool/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { PlanComponent } from './components/musictool/plan/plan.component';
import { CreaeditaplanComponent } from './components/musictool/plan/creaeditaplan/creaeditaplan.component';
import { MessageComponent } from './components/musictool/message/message.component';
import { CreaeditaMessageComponent } from './components/musictool/message/creaedita-message/creaedita-message.component';
import { ChatComponent } from './components/musictool/chat/chat.component';
import { CreaeditachatComponent } from './components/musictool/chat/creaeditachat/creaeditachat.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
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
        {path:'new',title:'Nuevo Contenido',component:CreateEditContentComponent},
        {path:'ediciones/:id',title:'Edicion de Contenido',component:CreateEditContentComponent} 
    ],
    canActivate: [segGuard]
},
    
    
   // {
   //  path:'purchase',title:'Compras', component:PurchaseComponent,
  //   children:[
   //  {path:'new',title:'Nueva Compra',component:CreateEditPurchaseComponent},
  //   {path:'ediciones/:id',title:'Edicion de Compra',component:CreateEditPurchaseComponent} 
 //    ]},
  
    {
        path:'homes',
        title: 'Inicio',
        component:IndexComponent,
        canActivate: [segGuard]
    },

    {
        path:'usuarios',component:UsersComponent,
        children:[
            { path: 'nuevo', component:CreaeditausersComponent },
            { path: 'ediciones/:id', component:ListarusersComponent }
        ],
        canActivate: [segGuard]
    },
    {
        path:'roles',component:RolesComponent,
        children:[
            { path: 'nuevo', component:CreaeditarolesComponent}
        ],
        canActivate: [segGuard] 
    }


 
    {path:'plans',component:PlanComponent,
    children:[
        {path:'creaeditaplan',component:CreaeditaplanComponent},
    ]
  canActivate: [segGuard]
},
    {path:'message',component:MessageComponent,
    children:[
        {path:'creaeditamessage',component:CreaeditaMessageComponent},
    ],
    canActivate: [segGuard]
    },
    
    {path:'chats',component:ChatComponent,
        children:[
            {path:'creaeditachats',component:CreaeditachatComponent},
        ],
    canActivate: [segGuard]
    },

];
