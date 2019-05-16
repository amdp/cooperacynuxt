<template>
  <div class="mx-auto mt-4 mb-5">
    <div class="row mt-3" v-for="comment in up" :key="comment.id">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="row">
          <div class="col-1 space minimini graylight up text-left p-0">
            <img class="usercomment rounded-circle" :src="userImage(comment.user)" /></div>
          <div class="col-11 p-0">{{ comment.content }}</div>
        </div>
        <div class="row">
          <div class="col-12 space minimini graylight up text-right">#{{comment.id}} {{comment.created}} 
            <span class="gray finger" @click="reply(comment)"> - Reply</span>
          </div>
        </div>
        <div class="row"><div class="col-12"><votebar :voteprop="comment" :proptype="'comment'" /></div></div>
        <div class="row" v-if="editreply==comment.id">
          <div class="col-12">
            <b-form @submit.prevent="submitcomment(comment,editreplyid)">
              <b-button type="submit" style="display: none"></b-button>
              <b-form-input id="commentInput" v-model="formComment" size="sm"></b-form-input>
            </b-form>
          </div>
        </div>
        <div class="row mt-2" v-for="subcomment in sub(comment,comment.id)" :key="subcomment.id">
          <div class="col-1"></div>
          <div class="col-11">
            <div class="row">
              <div class="col-1 space minimini graylight up text-left p-0">
                <img class="usercomment rounded-circle" :src="userImage(subcomment.user)" /></div>
              <div class="col-11 p-0">{{ subcomment.content }}</div>
            </div>
            <div class="row">
              <div class="col-12 space minimini graylight up text-right">#{{subcomment.id}} {{comment.created}}
                <span class="gray finger" @click="reply(subcomment)"> - Reply</span>
              </div>
            </div>
            <div class="row"><div class="col-12"><votebar :voteprop="subcomment" :proptype="'comment'" /></div></div>
            <div class="row" v-if="editreply==subcomment.id"><div class="col-12">
            <b-form @submit.prevent="submitcomment(comment,editreplyid)">
              <b-button type="submit" style="display: none"></b-button>
              <b-form-input id="commentInput" v-model="formComment" size="sm" ></b-form-input>
            </b-form></div></div>
          </div>
        </div>
      <div class="col-2"></div>
    </div>
  </div>
</div>
</template>

<script>
import Votebar from '@/components/Votebar'
import Comment from '@/components/Comment'
import { constants } from 'zlib';

export default {
  data() { return {editreply: false, editreplyid: false, formComment: '',}},
  computed: { up(){if (this.$store.state.comment) {
      return this.$store.state.comment.filter(comment => { return comment.id === comment.parent })} else {return []}},},
  mounted() { this.$store.dispatch('getProptypeAction', {userid: this.$auth.user.id, proptype: 'comment',
    where: '`project` = '+this.$route.params.id})},
  components: { Votebar: Votebar, Comment: Comment, },
  methods: {
    userImage(commentuser){ if(commentuser){return require('../assets/image/user/' + commentuser + '.png')}else{}},
    submitcomment(submitted, submittedid){this.$store.dispatch('commentFormAction', { id: submittedid, 
      parent: submitted.id, project: this.$route.params.id, user: this.$auth.user.id, content: this.formComment})
      this.reply(submitted.id)},
    sub(comment, id){if (this.$store.state.comment) {
      return this.$store.state.comment.filter(comment => { return comment.parent === id && comment.id != id })} else {return []}},
    reply(replycomment){this.editreply == replycomment.id ? (this.editreply = false, this.formComment = '') 
    : (this.editreply = replycomment.id, this.editreplyid = 'new', this.formComment = 'to #'+replycomment.id+': ')}},
}
</script>
