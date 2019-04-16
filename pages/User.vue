<template>
  <div>
    <projects />
  </div>
</template>

<script>
import Projects from '@/components/Projects'

export default {
  middleware: ['auth'],
  components: {
    Projects: Projects,
  },
}
</script>
