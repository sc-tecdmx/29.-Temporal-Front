import { useHead } from '@vueuse/head';
import { unref, computed } from 'vue';

let siteTitle = 'TECDMX';
let separador = '|';

export const useTituloPagina = (tituloPagina) =>
    useHead(
        computed(() => ({
            title: `${unref(tituloPagina)} ${separador} ${siteTitle}`,
        }))
    );

export const useMeta = (data) => {
    return useHead({ ...data, title: `${data.title} | NEKDU - Tablero` });
};
