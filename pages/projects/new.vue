<template>
  <projectform />
</template>

<script>
import Projectform from '@/components/Projectform'
export default { middleware: ['auth'], components: { Projectform: Projectform} }
</script>
