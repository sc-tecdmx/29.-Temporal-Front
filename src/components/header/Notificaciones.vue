<script setup>
import IconBell from '@/components/icons/IconBell.vue'
import IconFeatherServer from '../icons/IconFeatherServer.vue';
import IconFeatherX from '../icons/IconFeatherX.vue';
import IconFeatherHeart from '../icons/IconFeatherHeart.vue';
import IconFeatherFileText from '../icons/IconFeatherFileText.vue';
import IconFeatherCheck from '../icons/IconFeatherCheck.vue';
</script>
<template>
    <div class="dropdown nav-item notification-dropdown btn-group">
          <a
            href="javascript:;"
            id="ddlnotify"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn dropdown-toggle btn-icon-only nav-link"
          >
            <IconBell />
            <span class="badge badge-success"></span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="ddlnotify"
          >
            <li role="presentation">
              <a href="javascript:;" class="dropdown-item">
                <div class="media server-log">
                  <div class="media-aside align-self-start">
                    <IconFeatherServer></IconFeatherServer>
                  </div>
                  <div class="media-body">
                    <div class="data-info">
                      <h6 class="">Autorizar ABCD-100-1001</h6>
                      <p class="">45 min ago</p>
                    </div>

                    <div class="icon-status">
                      <IconFeatherX></IconFeatherX>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li role="presentation">
              <hr
                role="separator"
                aria-orientation="horizontal"
                size="0"
                class="dropdown-divider"
              />
            </li>
            <li role="presentation">
              <a href="javascript:;" class="dropdown-item">
                <div class="media">
                  <div class="media-aside align-self-start">
                    <IconFeatherHeart></IconFeatherHeart>
                  </div>
                  <div class="media-body">
                    <div class="data-info">
                      <h6>Turno para firmar ABCD-100-100</h6>
                      <p>8 hrs ago</p>
                    </div>
                    <div class="icon-status">
                      <IconFeatherX></IconFeatherX>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li role="presentation">
              <hr
                role="separator"
                aria-orientation="horizontal"
                size="0"
                class="dropdown-divider"
              />
            </li>
            <li role="presentation">
              <a href="javascript:;" class="dropdown-item">
                <div class="media file-upload">
                  <div class="media-aside align-self-start">
                    <IconFeatherFileText></IconFeatherFileText>
                  </div>
                  <div class="media-body">
                    <div class="data-info">
                      <h6>Documento devuelto</h6>
                      <p>670 kb</p>
                    </div>
                    <div class="icon-status">
                      <IconFeatherCheck></IconFeatherCheck>
                    </div>
                  </div></div
              ></a>
            </li>
          </ul>
        </div>
</template>