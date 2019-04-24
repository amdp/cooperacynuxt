<template>
  <div class="mx-auto mt-4 mb-5">
   <div class="row mt-5" v-for="commentb in commentsb" :key="commentb.id">
      <div class="col-6">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <!--  <img :src="require('@/assets/images/comments/' + comment.id + '.png')" width="100px" /> -->
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up" >A {{ commentb.user }}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ commentb.content }}</div>
            </div>
          </div>
        </div>
        <votes :votesprop="commentb" :proptype="'comment'" />
      </div>
    </div>
  </div>
</template>

<script>
import Votes from '@/components/Votes'

export default {
  props: {
    commentprop: {required: true}
    },
  computed: { commentsb(){return this.$store.state.commentsbvx.commentsb}, },
  components: { Votes: Votes, },
}
</script>
