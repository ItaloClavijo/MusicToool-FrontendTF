import { Routes } from '@angular/router';
import { LibraryComponent } from './components/musictool/Library/library.component';
import { CreateEditLibraryComponent } from './components/musictool/Library/create-edit-library/create-edit-library.component';
import { ContentComponent } from './components/musictool/content/content.component';
import { CreateEditContentComponent } from './components/musictool/content/create-edit-content/create-edit-content.component';
import { IndexComponent } from './components/musictool/home/index/index.component';
import { PlanComponent } from './components/musictool/plan/plan.component';
import { CreaeditaplanComponent } from './components/musictool/plan/creaeditaplan/creaeditaplan.component';
import { MessageComponent } from './components/musictool/message/message.component';
import { CreaeditaMessageComponent } from './components/musictool/message/creaedita-message/creaedita-message.component';
import { ChatComponent } from './components/musictool/chat/chat.component';
import { CreaeditachatComponent } from './components/musictool/chat/creaeditachat/creaeditachat.component';

export const routes: Routes = [{
    path:'library',
    title:'Librerias',
    component:LibraryComponent,
    children:[
        {path:'new',title:'Nueva Libreria',component:CreateEditLibraryComponent},
        {path:'ediciones/:id',title:'Edicion de Libreria',component:CreateEditLibraryComponent} 
    ]},

    {
    path:'content', title:'Contenidos', component:ContentComponent,
    children:[
        {path:'new',title:'Nuevo Contenido',component:CreateEditContentComponent},
        {path:'ediciones/:id',title:'Edicion de Contenido',component:CreateEditContentComponent} 
    ]},
    
    
   // {
   //  path:'purchase',title:'Compras', component:PurchaseComponent,
  //   children:[
   //  {path:'new',title:'Nueva Compra',component:CreateEditPurchaseComponent},
  //   {path:'ediciones/:id',title:'Edicion de Compra',component:CreateEditPurchaseComponent} 
 //    ]},
 
    {path:'plans',component:PlanComponent,
    children:[
        {path:'creaeditaplan',component:CreaeditaplanComponent},
    ]},
    {path:'message',component:MessageComponent,
    children:[
        {path:'creaeditamessage',component:CreaeditaMessageComponent},
    ]},
    
    {path:'chats',component:ChatComponent,
        children:[
            {path:'creaeditachats',component:CreaeditachatComponent},
        ]},
];
