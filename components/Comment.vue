<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-3" v-for="comment in up" :key="comment.id"><div class="col-2"></div><div class="col-8">
      <div class="row"><div class="col-12 space minimini graylight up text-right">
        {{ comment.user }}, {{comment.parent}}, #{{comment.id}} {{comment.created}}</div></div>
      <div class="row"><div class="col-12">{{ comment.content }}</div></div>
      <div class="row"><div class="col-12"><votebar :voteprop="comment" :proptype="'comment'" /></div></div>
          <div class="row mt-2" v-for="subcomment in sub(comment,comment.id)" :key="subcomment.id">
            <div class="col-1"></div><div class="col-11">
              <div class="row"><div class="col-12 space minimini graylight up text-right">
                {{ subcomment.user }}, {{subcomment.parent}}, #{{subcomment.id}} {{comment.created}}</div></div>
              <div class="row"><div class="col-12">{{ subcomment.content }}</div></div>
              <div class="row"><div class="col-12"><votebar :voteprop="subcomment" :proptype="'comment'" /></div></div>
            </div>
          </div>
      <div class="col-2"></div>
    </div></div>
  </div>
</template>

<script>
import Votebar from '@/components/Votebar'
import Comment from '@/components/Comment'

export default {
  computed: { up(){if (this.$store.state.comment) {
      return this.$store.state.comment.filter(comment => { return comment.id === comment.parent })} else {return []}},},
  mounted() { this.$store.dispatch('getProptypeAction', {userid: this.$auth.user.id, proptype: 'comment',
    where: '`project` = '+this.$route.params.id})},
  components: { Votebar: Votebar, Comment: Comment, },
  methods: {sub(comment, id){if (this.$store.state.comment) {
      return this.$store.state.comment.filter(comment => { return comment.parent === id && comment.id != id })} else {return []}},},
}
</script>
