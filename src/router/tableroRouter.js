import appLayout from '../layouts/appLayout.vue';
import IndexViewVue from '../views/tablero/IndexView.vue';
import NuevoViewVue from '../views/tablero/documentos/nuevo/NuevoView.vue';
import RecibidoViewVue from '../views/tablero/documentos/nuevo/RecibidoView.vue';
import PerfilViewVue from '../views/login/PerfilView.vue';
import CambiarContrasenaView from '../views/login/CambiarContrasenaView.vue';
import RegistroEmpleadoView from '../views/login/RegistroEmpleadoView.vue';
import PersonalRolAppViewVue from '../views/configuracion/PersonalRolAppView.vue';
import AreasAdscripcionView from '../views/configuracion/catalogos/AreasAdscripcionView.vue';
import PersonalView from '../views/configuracion/catalogos/PersonalView.vue';
import EmpleadoPuestoView from '../views/configuracion/catalogos/EmpleadoPuestoView.vue';
import RolesView from '../views/configuracion/catalogos/RolesView.vue';
import TiposDocumentoView from '../views/configuracion/catalogos/TiposDocumentoView.vue';
import SexoView from '../views/configuracion/catalogos/SexoView.vue';
import CatalogosListView from '../views/configuracion/catalogos/CatalogosListView.vue';
import CatalogoGenView from '../views/configuracion/catalogos/CatalogoGenView.vue';
import ExpedienteView from '../views/configuracion/catalogos/ExpedienteView.vue';
import PuestoView from '../views/configuracion/catalogos/PuestoView.vue';
import GruposView from '../views/configuracion/GruposView.vue'


export default {
    path: '/documento',
    component: appLayout,
    children: [
        { path: '/', name: 'inicio', component: IndexViewVue},
        { path: '/documento/nuevo/:id?', name: 'nuevo', component: NuevoViewVue },
        //{ path: '/documento/nuevo', name: 'nuevo', component: NuevoViewVue },
        { path: '/documento/recibido/:id', name: 'recibido', component: RecibidoViewVue},
        // Administración del sistema
        { path: '/account/perfil', name: 'perfil', component: PerfilViewVue},
        { path: '/account/cambiar_contrasena', name:'cambiarContrasena', component:CambiarContrasenaView },
        { path: '/account/registroEmpleado', name: 'registroEmpleado', component: RegistroEmpleadoView },
        { path: '/config/adminRolPersonaApp', name: 'rolPersona', component: PersonalRolAppViewVue },
        { path: '/config/grupos', name: 'grupos', component: GruposView },
        //Catálogos
        { path: '/config/catalogos', name:'catalogosList', component:CatalogosListView },
        { path: '/config/catalogo/areas', name:'catalogoAreas', component:AreasAdscripcionView },
        { path: '/config/catalogo/personal', name:'catalogoPersonal', component: PersonalView },
        { path: '/config/catalogo/empleado-puesto', name:'catalogoEmpleadoPuesto', component: EmpleadoPuestoView },
        { path: '/config/catalogo/roles', name:'catalogoRoles', component: RolesView },
        { path: '/config/catalogo/tipoDocumento', name:'catalogoTipoDocumento', component: TiposDocumentoView},
        { path: '/config/catalogo/sexo', name:'catalogoSexo', component: SexoView},
        { path: '/config/catalogo/expediente', name:'catalogoExpediente', component: ExpedienteView},
        { path: '/config/catalogo/puesto', name: 'catalogoPuesto', component: PuestoView},
        { path: '/config/catalogo/:catalogo', name: 'catalogoGen', component: CatalogoGenView},
        
    ]
}