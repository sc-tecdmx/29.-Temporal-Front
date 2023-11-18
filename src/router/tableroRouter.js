import appLayout from '../layouts/appLayout.vue';
import IndexViewVue from '../views/tablero/IndexView.vue';
import NuevoViewVue from '../views/tablero/documentos/nuevo/NuevoView.vue';
import RecibidoViewVue from '../views/tablero/documentos/nuevo/RecibidoView.vue';
import PerfilViewVue from '../views/login/PerfilView.vue';
import CambiarContrasenaView from '../views/login/CambiarContrasenaView.vue';
import PersonalRolAppViewVue from '../views/configuracion/PersonalRolAppView.vue';
import AreasAdscripcionView from '../views/configuracion/catalogos/AreasAdscripcionView.vue';
import PersonalView from '../views/configuracion/catalogos/PersonalView.vue';
import RolesView from '../views/configuracion/catalogos/RolesView.vue';
import TiposDocumentoView from '../views/configuracion/catalogos/TiposDocumentoView.vue';


export default {
    path: '/documento',
    component: appLayout,
    children: [
        { path: '/', name: 'inicio', component: IndexViewVue},
        { path: '/documento/nuevo', name: 'nuevo', component: NuevoViewVue },
        { path: '/documento/recibido/:id', name: 'recibido', component: RecibidoViewVue},
        // Administración del sistema
        { path: '/account/perfil', name: 'perfil', component: PerfilViewVue},
        { path: '/account/cambiar_contrasena', name:'cambiarContrasena', component:CambiarContrasenaView },
        { path: '/config/adminRolPersonaApp', name: 'rolPersona', component: PersonalRolAppViewVue },
        //Catálogos
        { path: '/config/catalogo/areas', name:'catalogoAreas', component:AreasAdscripcionView },
        { path: '/config/catalogo/personal', name:'catalogoPersonal', component: PersonalView },
        { path: '/config/catalogo/roles', name:'catalogoRoles', component: RolesView },
        { path: '/config/catalogo/tipoDocumento', name:'catalogoTipoDocumento', component: TiposDocumentoView},

    ]
}