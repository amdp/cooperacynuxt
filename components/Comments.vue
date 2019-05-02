<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-3" v-for="comment in up(comments)" :key="comment.id"><div class="col-2"></div><div class="col-8">
      <div class="row"><div class="col-12 space minimini graylight up text-right">
        {{ comment.user }}, {{comment.parent}}, #{{comment.id}} {{comment.created}}</div></div>
      <div class="row"><div class="col-12">{{ comment.content }}</div></div>
      <div class="row"><div class="col-12"><votebars :votesprop="comment" :proptype="'comment'" /></div></div>
          <div class="row mt-2" v-for="subcomment in sub(comments,comment.id)" :key="subcomment.id">
            <div class="col-1"></div><div class="col-11">
              <div class="row"><div class="col-12 space minimini graylight up text-right">
                {{ subcomment.user }}, {{subcomment.parent}}, #{{subcomment.id}} {{comment.created}}</div></div>
              <div class="row"><div class="col-12">{{ subcomment.content }}</div></div>
              <div class="row"><div class="col-12"><votebars :votesprop="subcomment" :proptype="'comment'" /></div></div>
            </div>
          </div>
      <div class="col-2"></div>
    </div></div>
  </div>
</template>

<script>
import Votebars from '@/components/Votebars'
import Comments from '@/components/Comments'

export default {
  computed: { comments(){if (this.$store.state.comments) {return this.$store.state.comments} else{return []}} },
  mounted() { this.$store.dispatch('getCommentsAction', {id: this.$route.params.id})},
  methods:  { up:(comments => {return comments.filter(comment => { return comment.id === comment.parent })}),
              sub:(comments,id) => {return comments.filter(comment => { return comment.parent === id && comment.id != id })}},
  components: { Votebars: Votebars, Comments: Comments, },
}
</script>
