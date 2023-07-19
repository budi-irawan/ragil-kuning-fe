<template>
  <div class="wrapper">
    <!-- <transition name="fade" mode="out-in"> -->
      <router-view />
    <!-- </transition> -->
  </div>
</template>

<style>
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(2em);
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
</style>