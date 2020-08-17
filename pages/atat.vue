<template>
  <at :members="members">
    <div contenteditable></div>
  </at>
</template>

<script>
export default {
  data() {
    return {
      members: ['Roxie Miles', 'grace.carroll', '小浩'],
    }
  },
}
</script>