<script setup>
 import IconSobreCerrado from '@/components/icons/IconSobreCerrado.vue'
</script>
<template>
     <div class="dropdown nav-item message-dropdown btn-group">
          <a
            href="javascript:;"
            id="ddlmsg"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn dropdown-toggle btn-icon-only nav-link"
          >
            <IconSobreCerrado/>
            <span class="badge badge-success"></span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="ddlmsg"
          >
            <li role="presentation">
              <a role="menuitem" href="#" target="_self" class="dropdown-item">
                <div class="media media">
                  <div class="media-aside align-self-start">
                    <div class="avatar avatar-xl">
                      <span class="avatar-title rounded-circle">OE</span>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5 class="usr-name">Comentario en ABCD-001-10-001</h5>
                    <p class="msg-title">Lic. Otilio Esteban</p>
                  </div>
                </div>
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" href="#" target="_self" class="dropdown-item">
                <div class="media media">
                  <div class="media-aside align-self-start">
                    <img src="@/assets/images/generic/profile-15.jpeg" alt="avatar" />
                  </div>
                  <div class="media-body">
                    <h5 class="usr-name">Comentario a ABCD-001-10-001</h5>
                    <p class="msg-title">Lic. Brenda Rodríguez</p>
                  </div>
                </div>
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" href="#" target="_self" class="dropdown-item">
                <div class="media media">
                  <div class="media-aside align-self-start">
                    <div class="avatar avatar-xl">
                      <span class="avatar-title rounded-circle">OG</span>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5 class="usr-name">Comentario a ABCD-001-10-001</h5>
                    <p class="msg-title">Lic. Lorena Bezares</p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
</template>