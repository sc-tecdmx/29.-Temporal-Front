<script setup>
  const props= defineProps({
    srcLogo: {type: String, required: true},
    classLogo: {type: String, default:'theme-logo' },
    classBgLogo: {type: String, default:'' },
  });
</script>
<template>
    <ul class="navbar-item theme-brand flex-row text-center"
        :class="classBgLogo"
      >
        <li class="nav-item theme-logo"
          :class="classLogo"
        >
          <router-link to="/">
            <img
              width="135"
              height="40"
              :src =  srcLogo 
              class="navbar-logo"
              alt="TECDMX"
            />
          </router-link>
        </li>
      </ul>
</template>