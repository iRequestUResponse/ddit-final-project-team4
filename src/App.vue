<template>
  <div>
    <Chat />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Chat: () => import('@/components/common/Chat')
  },
  data: () => ({
    //
  }),
};
</script>
