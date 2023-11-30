<template>
  <div class="container">
    <div class="layout-px-spacing">
      <teleport to="#breadcrumb">
        <ul class="navbar-nav flex-row">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="javascript:;">Apps</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Chat</span></li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
      </teleport>

      <div class="chat-section layout-top-spacing">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="chat-system">
              <div class="hamburger" @click="is_show_user_menu = !is_show_user_menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-menu mail-menu d-lg-none">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div class="user-list-box" :class="{ 'user-list-box-show': is_show_user_menu }">
                <div class="search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-search">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" v-model.trim="search_user" class="form-control" @keyup="search_users()"
                    placeholder="Search" />
                </div>
                <perfect-scrollbar class="people"
                  :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                  <div v-for="(person, index) in filterd_contact_list" class="person" :key="index"
                    :class="{ active: selected_user && selected_user.user_id == person.user_id }"
                    @click="select_user(person)">
                    <div class="user-info">
                      <div class="f-head">
                        <img :src="`/src/assets/images/chat/${person.path}`" alt="avatar" />
                      </div>
                      <div class="f-body">
                        <div class="meta-info">
                          <span class="user-name preview"
                            :class="{ 'text-primary': selected_user && selected_user.user_id == person.user_id }">{{
                              person.name }}</span>
                          <span class="user-meta-time"
                            :class="{ 'text-primary': selected_user && selected_user.user_id == person.user_id }">{{
                              person.time }}</span>
                        </div>
                        <span class="preview">{{ person.preview }}</span>
                      </div>
                    </div>
                  </div>
                </perfect-scrollbar>
              </div>
              <div class="chat-box" :class="{ active: selected_user }">
                <div class="chat-not-selected" :class="{ 'd-none': selected_user }">
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-message-square">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Click User To Chat
                  </p>
                </div>

                <div v-if="selected_user" class="chat-box-inner h-100">
                  <div class="chat-meta-user chat-active">
                    <div class="current-chat-user-name">
                      <span>
                        <img :src="`/src/assets/images/chat/${selected_user.path}`" alt="dynamic-image" />
                        <span class="name">{{ selected_user.name }}</span>
                      </span>
                    </div>

                    <div class="chat-action-btn align-self-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-phone phone-call-screen">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                        </path>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-video video-call-screen">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>

                      <div class="dropdown d-inline-block">
                        <a href="javascript:;" id="ddlSettings" class="btn dropdown-toggle btn-icon-only"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-more-vertical">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                          <li>
                            <a href="javascript:;" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-settings">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                </path>
                              </svg>
                              Settings</a>
                          </li>
                          <li>
                            <a href="javascript:;" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-mail">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                </path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              Mail</a>
                          </li>
                          <li>
                            <a href="javascript:;" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-copy">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              Copy</a>
                          </li>
                          <li>
                            <a href="javascript:;" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                              Delete</a>
                          </li>
                          <li>
                            <a href="javascript:;" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-share-2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                              </svg>
                              Share</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <perfect-scrollbar class="chat-conversation-box"
                    :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                    <div id="chat-conversation-box-scroll" class="chat-conversation-box-scroll">
                      <div class="chat active-chat">
                        <div class="conversation-start">
                          <span>Today, 6:48 AM</span>
                        </div>

                        <template v-if="selected_user.messages && selected_user.messages.length">
                          <div v-for="(message, index) in selected_user.messages" class="bubble" :key="'msg' + index"
                            :class="[selected_user.user_id == message.from_user_id ? 'me' : 'you']">
                            {{ message.text }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </perfect-scrollbar>
                  <div class="chat-footer chat-active">
                    <div class="chat-input">
                      <div class="chat-form">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-message-square">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <input type="text" v-model="text_message" class="mail-write-box form-control"
                          placeholder="Message" @keyup.enter.exact="send_message" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
/*   import "/src/assets/sass/apps/chat.scss"; */
import "/src/assets/sass/apps/chat.scss";

import { useMeta } from "/src/composables/use-meta";
useMeta({ title: "Chat" });

const is_show_user_menu = ref(false);
let contact_list = ref([]);
const filterd_contact_list = ref([]);
const selected_user = ref(null);
const login_user_id = ref(0); //system login user id
const search_user = ref("");
const text_message = ref("");

onMounted(() => {
  bind_contact_list();
});

const bind_contact_list = () => {
  contact_list.value = [
    {
      user_id: 1,
      name: "¿Cuáles son los elementos esenciales de un contrato?",
      path: "profile-4.jpeg",
      time: "2:09 PM",
      preview: "Oferta, aceptación, consideración, capacidad legal y objeto lícito.",
      messages: [
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Los elementos esenciales de un contrato son los siguientes:" },
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Oferta: Una de las partes debe manifestar su voluntad de celebrar el contrato ofreciendo ciertos términos. " },
        /* { from_user_id: login_user_id.value, to_usr_id: 1, text: "Aceptación: La otra parte debe aceptar la oferta de manera clara y sin condiciones, mostrando su conformidad con los términos propuestos." },
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Consideración: Ambas partes deben proporcionar algo de valor (dinero, bienes, servicios, etc.) como parte del acuerdo. La consideración es lo que cada parte obtiene a cambio de comprometerse en el contrato." },
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Capacidad legal: Las partes involucradas deben tener la capacidad legal para celebrar un contrato. Esto significa que deben ser competentes y tener la capacidad mental necesaria." }, */
        { from_user_id: 1, to_usr_id: login_user_id.value, text: "Dime otros" },
        /* { from_user_id: 1, to_usr_id: login_user_id.value, text: "I am all well" }, */
        /* { from_user_id: login_user_id.value, to_usr_id: 1, text: "Coffee?" }, */
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Aceptación: La otra parte debe aceptar la oferta de manera clara y sin condiciones, mostrando su conformidad con los términos propuestos." },
        { from_user_id: login_user_id.value, to_usr_id: 1, text: "Consideración: Ambas partes deben proporcionar algo de valor (dinero, bienes, servicios, etc.) como parte del acuerdo. La consideración es lo que cada parte obtiene a cambio de comprometerse en el contrato." },
       
      ],
    },
    {
      user_id: 2,
      name: "¿Qué es la prescripción en el ámbito legal?",
      path: "profile-3.jpeg",
      time: "2:09 PM",
      preview: "La pérdida del derecho a iniciar acciones legales debido al paso del tiempo.",
      messages: [
        { from_user_id: login_user_id.value, to_usr_id: 2, text: "Hola, aquí tienes una respuesta..." },
        { from_user_id: login_user_id.value, to_usr_id: 2, text: "La prescripción en el ámbito legal hace referencia a la pérdida del derecho a iniciar acciones legales debido al paso del tiempo." },
        /* { from_user_id: login_user_id.value, to_usr_id: 2, text: "I have a question regarding project." }, */
      ],
    },
    {
      user_id: 3,
      name: "¿Cuál es la diferencia entre delito y falta?",
      path: "profile-11.jpeg",
      time: "1:44 PM",
      preview: "Los delitos son conductas más graves y están castigados con penas más severas, mientras que las faltas son menos graves y tienen penas menores.",
      messages: [
        { from_user_id: login_user_id.value, to_usr_id: 3, text: "Hola, aquí tienes una respuesta..." },
        { from_user_id: login_user_id.value, to_usr_id: 3, text: "Los delitos son conductas más graves y están castigados con penas más severas." },
        { from_user_id: 3, to_usr_id: login_user_id.value, text: "y las faltas?" },
        { from_user_id: login_user_id.value, to_usr_id: 3, text: "Las faltas son menos graves y tienen penas menores." },
      ],
    },
    {
      user_id: 4,
      name: "¿Qué implica el principio de presunción de inocencia?",
      path: "profile-23.jpeg",
      time: "2:09 PM",
      preview: "Se considera a una persona inocente hasta que se demuestre su culpabilidad.",
      messages: [
      { from_user_id: login_user_id.value, to_usr_id: 4, text: "Hola, aquí tienes una respuesta..." },
      { from_user_id: login_user_id.value, to_usr_id: 4, text: "Se considera a una persona inocente hasta que se demuestre su culpabilidad." },
        /* { from_user_id: 4, to_usr_id: login_user_id.value, text: "Se considera a una persona inocente hasta que se demuestre su culpabilidad." }, */
      ],
    },
    {
      user_id: 5,
      name: "¿Cuál es la función de un notario público?",
      path: "profile-7.jpeg",
      time: "2:09 PM",
      preview: "Autenticar documentos, dar fe de hechos y actos, y otorgar validez legal a ciertos actos jurídicos.",
      messages: [
        { from_user_id: login_user_id.value, to_usr_id: 3, text: "Hola, aquí tienes una respuesta..." },
        { from_user_id: login_user_id.value, to_usr_id: 3, text: "Autenticar documentos, dar fe de hechos y actos, y otorgar validez legal a ciertos actos jurídicos." },
        /* { from_user_id: login_user_id.value, to_usr_id: 5, text: "Welcom Back" },
        { from_user_id: login_user_id.value, to_usr_id: 5, text: "I am all well" }, */
        { from_user_id: 5, to_usr_id: login_user_id.value, text: "seguro?" },
        { from_user_id: login_user_id.value, to_usr_id: 5, text: "Bastante seguro." },
      ],
    },
    {
      user_id: 6,
      name: "¿Qué es el habeas corpus?",
      path: "profile-15.jpeg",
      time: "2:09 PM",
      preview: "Un recurso legal que protege contra la detención o encarcelamiento ilegal, asegurando la libertad personal.",
      messages: [
        { from_user_id: login_user_id.value, to_usr_id: 6, text: "Hola, aquí tienes una respuesta..." },
        { from_user_id: login_user_id.value, to_usr_id: 6, text: "Un recurso legal que protege contra la detención o encarcelamiento ilegal, asegurando la libertad personal." },
      ],
    },
    { user_id: 7, name: "¿Cuál es la diferencia entre custodia y patria potestad?", path: "profile-32.jpeg", time: "2:09 PM", preview: "La custodia se refiere al cuidado diario del menor, mientras que la patria potestad implica derechos y responsabilidades más amplios sobre el niño.", messages: [] },
    { user_id: 8, name: "¿En qué consiste el principio de igualdad ante la ley?", path: "profile-33.jpeg", time: "2:09 PM", preview: "Todos los ciudadanos tienen los mismos derechos y deberes, y la ley se aplica por igual a todas las personas.", messages: [] },
    { user_id: 9, name: "¿Qué es la mediación en resolución de conflictos?", path: "profile-21.jpeg", time: "2:09 PM", preview: "Un proceso en el que un tercero imparcial ayuda a las partes a llegar a un acuerdo mutuo sin recurrir a un litigio.", messages: [] },
    { user_id: 10, name: "¿Cuál es la diferencia entre un testamento y una herencia?", path: "profile-12.jpeg", time: "2:09 PM", preview: "Un testamento es el documento en el que una persona expresa sus deseos sobre la distribución de sus bienes tras su muerte, mientras que la herencia es el conjunto de bienes que una persona deja al fallecer.", messages: [] },
    /* { user_id: 11, name: "Dale Butler", path: "profile-26.jpeg", time: "2:09 PM", preview: "Wasup for the third time like is you bling bitch", messages: [] },
    { user_id: 12, name: "Grace Roberts", path: "profile-20.jpeg", time: "2:09 PM", preview: "Wasup for the third time like is you bling bitch", messages: [] }, */
  ];
  search_users();
};

const select_user = (user) => {
  selected_user.value = user;
  scroll_to_bottom();
  is_show_user_menu.value = false;
};
const search_users = () => {
  console.log(search_user.value);
  filterd_contact_list.value = contact_list.value.filter((d) => d.name.toLowerCase().includes(search_user.value));
};
const send_message = () => {
  if (text_message.value.trim()) {
    const user = contact_list.value.find((d) => d.user_id == selected_user.value.user_id);
    user.messages.push({ from_user_id: selected_user.value.user_id, to_usr_id: login_user_id.value, text: text_message.value });
    text_message.value = "";
    scroll_to_bottom();
  }
};
const scroll_to_bottom = () => {
  setTimeout(() => {
    const element = document.querySelector(".chat-conversation-box");
    element.scrollTop = element.scrollHeight;
    element.behavior = "smooth";
  });
};
</script>

<!-- <script setup>
import { useMeta } from "@/composables/use-meta";
import IconDropDown from "@/components/icons/IconDropDown.vue";
useMeta({ title: "TECDMX | Tablero de Firmas Electrónicas." });
</script> -->

 <!--  <template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">

     
      <div class="col-10 col-sm-8 col-lg-6">
        <img
          src="/src/assets/images/tecdmx/vector_home.png"
          class="d-block mx-lg-auto img-fluid"
          alt="Bootstrap Themes"
          width="700"
          height="500"
          loading="lazy"
        />
      </div> 
  <div class="col-lg-6">

        <h1 class="display-5 fw-bold lh-1 mb-3">
          Tablero de Seguimiento de Firmas Electrónicas
        </h1>
        <p class="lead">
          Bienvenido al Portal de Seguimiento de Firmas Electrónicas
          Certificadas del Tribunal Electoral de la Ciudad de México.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <router-link to="/login" class="btn btn-primary btn-lg px-4 me-md-2"
            >Ingresar</router-link
          >
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">
            Registro
          </button>
        </div>
      </div> 
    </div>
  </div>
</template>-->
