<script setup>
import "@/assets/sass/scrollspyNav.scss";
import "@/assets/sass/users/user-profile.scss";

import { useMeta } from "@/composables/use-meta";
useMeta({ title: "User Profile" });
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <div class="user-profile layout-spacing m-5">
        <div class="panel">
          <div class="panel-body">
            <div class="d-flex justify-content-between">
              <h3 class="">Perfil</h3>
            </div>
            <div class="text-center user-info">
              <img
                src="@/assets/images/tecdmx/profile_90x90.png"
                alt="avatar"
              />
              <p class="">Otilio Esteban Hernández Pérez</p>
            </div>
            <div class="user-info-list">
              <div class="d-flex justify-content-between">
                <ul class="contacts-block list-unstyled">
                  <li class="contacts-block__item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-phone"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      ></path>
                    </svg>
                    Extención: 1048
                  </li>
                  <li class="contacts-block__item">
                    <!-- <a href="mailto:example@mail.com"></a> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      ></path>
                      <polyline points="22,6 12,13 2,6"></polyline></svg
                    >otilio.hernandez@tecdmx.org.mx
                  </li>
                  <li class="contacts-block__item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-map-pin"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      ></path>
                      <circle cx="12" cy="10" r="3"></circle></svg
                    >Unidad de Tecnologías de la Información
                  </li>
                  <li class="contacts-block__item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-award"
                    >
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline
                        points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
                      ></polyline>
                    </svg>
                    Director
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
