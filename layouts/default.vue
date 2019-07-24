<template>
  <div>
    <div class="row">
      <navbar />
    </div>
    <div class="row navbarrow">
      <div class="col-2">
      </div>
      <div class="col-8">
        <nuxt />
      </div>
      <div class="col-2">
      </div>
    </div>
    <div class="row">
      <foot />
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import foot from '@/components/foot'

export default {
  components: {'navbar': navbar, 'foot': foot }
}
</script>
