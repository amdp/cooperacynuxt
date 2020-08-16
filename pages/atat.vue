<template>
  <div>
    <Mentionable :keys="['@']" :items="items" offset="6" @click="alert('ooo')">
      <textarea v-model="text" />
    </Mentionable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      items: [
        {
          value: 'cat',
          label: 'Mr Cat',
        },
        {
          value: 'dog',
          label: 'Mr Dog',
        },
      ],
    }
  },
}
</script>