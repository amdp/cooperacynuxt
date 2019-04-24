<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-5" v-for="comment in up(comments)" :key="comment.id">
      <div class="col-10" >
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <!-- <img :src="require('@/assets/images/comments/' + comment.id + '.png')" width="100px" />-->
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up">{{ comment.user }}, {{comment.parent}}, {{comment.id}}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ comment.content }}</div>
            </div>
          </div>
        </div>
        <votes :votesprop="comment" :proptype="'comment'" />
                                  <div class="row mt-5" v-for="subcomment in sub(comments,comment.id)" :key="subcomment.id">
      <div class="col-10" >
        <div class="row">
          <div class="col-1"></div>
          <div class="col-2">
            <!-- <img :src="require('@/assets/images/comments/' + comment.id + '.png')" width="100px" />-->
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 space subheading up">{{ subcomment.user }}, {{subcomment.parent}}, {{subcomment.id}}</div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">{{ subcomment.content }}</div>
            </div>
          </div>
        </div>
        <votes :votesprop="subcomment" :proptype="'comment'" />
      </div>
                                </div>
    </div>
  </div>
  </div>
</template>

<script>
import Votes from '@/components/Votes'
import Comments from '@/components/Comments'

export default {
  computed: { comments(){return this.$store.state.commentsvx.comments}},
  mounted() { this.$store.dispatch('commentsvx/getCommentsAction', {id: this.$route.params.id})},
  methods:  { up:(comments =>{return comments.filter(comment => { return comment.id === comment.parent })}),
              sub: function (comments,id){return comments.filter(comment => { return comment.parent === id && comment.id != id })}},
  components: { Votes: Votes, Comments: Comments, },
}
</script>
