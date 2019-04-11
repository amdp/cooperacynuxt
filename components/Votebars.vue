<template>
<div class="row mt-2">
    <div class="col" v-for="votebar in votebars" :id="votebar.v" :key="votebar.v" :class="votebar.v"> </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      votebars: [
        {v: 'votebar bequivalence'},
        {v: 'votebar btrust'},
        {v: 'votebar bcare'},
        {v: 'votebar btransparency'},
        {v: 'votebar bfreedom'},
        {v: 'votebar bunderstanding'},
        {v: 'votebar bdiversity'},
      ],
    }
  },
}
</script>
