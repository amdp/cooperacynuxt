<template>
  <div class="row mt-3">
    <div class="col" v-for="votebar in votebars" :id="votebar.name" :key="votebar.name" :style="{height: '5px', 'background-color': votebar.color, opacity: votebar.opacity}"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      votebars: [
        {name: 'evotebar', color: '#FF9000', opacity: '1'},
        {name: 'tvotebar', color: '#FFD000', opacity: '1'},
        {name: 'cvotebar', color: '#88DD33', opacity: '1'},
        {name: 'ivotebar', color: '#22DDEE', opacity: '1'},
        {name: 'fvotebar', color: '#4488EE', opacity: '1'},
        {name: 'uvotebar', color: '#AA66DD', opacity: '1'},
        {name: 'dvotebar', color: '#FF77CC', opacity: '1'},
      ],
    }
  },
}
</script>
