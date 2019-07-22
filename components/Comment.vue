<template>
  <div class="mx-auto mt-4 mb-5">
    
    <!-- NEW COMMENT POST -->
    <b-form @submit.prevent="formpost()">
      <b-form-group label-for="postInput" label="New Post:" description="Enter a new comment, post, question or topic">
      <b-button type="submit" style="display: none"></b-button>
      <b-form-input id="postInput" v-model="formPost" size="sm"></b-form-input>
      </b-form-group>
    </b-form>

    <!-- POST (COMMENT) -->
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
            <span v-if="$auth.user.id==comment.user" class="gray finger" @click="remove(comment)"> - Delete</span>
            <span v-if="$auth.user.id==comment.user" class="gray finger" @click="edit(comment)">   - Edit</span>
            <span class="gray finger" @click="reply(comment)">  - Reply</span>
          </div>
        </div>
        <div class="row"><div class="col-12"><votebar :voteprop="comment" :proptype="'comment'" /></div></div>
        <!-- POST (COMMENT) FORM TEXTBOX -->
        <div class="row" v-if="formswitch==comment.id">
          <div class="col-12">
            <b-form @submit.prevent="formcomment(comment,editreplyid)">
              <b-button type="submit" style="display: none"></b-button>
              <b-form-input id="commentInput" v-model="formComment" size="sm"></b-form-input>
              <b-link @click="edit(subcomment)" class="hunderstanding">Cancel</b-link>
            </b-form>
          </div>
        </div>
        <!-- COMMENT (SUBCOMMENT) -->
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
                <span v-if="$auth.user.id==subcomment.user" class="gray finger" @click="remove(subcomment)">  - Delete</span>
                <span v-if="$auth.user.id==subcomment.user" class="gray finger" @click="edit(subcomment)">    - Edit</span>
                <span class="gray finger" @click="reply(subcomment)">   - Reply</span>
              </div>
            </div>
            <div class="row"><div class="col-12"><votebar :voteprop="subcomment" :proptype="'comment'" /></div></div>
            <!-- COMMENT (SUBCOMMENT) FORM TEXTBOX -->
            <div class="row" v-if="formswitch==subcomment.id"><div class="col-12">
            <b-form @submit.prevent="formcomment(subcomment,editreplyid)">
              <b-button type="submit" style="display: none"></b-button>
              <b-form-input id="commentInput" v-model="formComment" size="sm" ></b-form-input>
              <b-link @click="edit(subcomment)" class="hunderstanding">Cancel</b-link>
            </b-form></div></div>
          </div>
        </div>
      <div class="col-2"></div>
    </div>
  </div>
</div>
</template>

<script>
import votebar from '~/components/votebar'
import comment from '~/components/comment'
import { constants } from 'zlib';

export default {
  data() { return {formswitch: false, editreplyid: false, formComment: '', formPost: '',}},//if formswitch = a comment id, textbox appears
  computed: { up(){if(this.$store.state.comment){return this.$store.state.comment.filter(comment=>{ return comment.parent === 0 })}
    else {return []}},},
  components: { votebar: votebar, comment: comment, },
  methods: {
    formcomment(comment, newoldid){if(comment.parent===0) {var parent=comment.id} else {var parent=comment.parent}
      newoldid=='new'? (this.$store.dispatch('commentFormAction', { id: newoldid, parent: parent, 
      project: this.$route.params.id, user: this.$auth.user.id, content: this.formComment}), this.reply(comment.id))
      : this.$store.dispatch('commentFormAction', { id: newoldid, parent: comment.parent, project: this.$route.params.id, user: this.$auth.user.id, content: this.formComment}); this.edit(comment.id) },
    sub(comment, id){if (this.$store.state.comment){
      return this.$store.state.comment.filter(comment=>{return comment.parent === id && comment.id != id })} else {return []}},
    userImage(commentuser){ if(commentuser){return require('../assets/image/user/' + commentuser + '.png')}else{}},
    formpost(){this.$store.dispatch('commentFormAction', { id: 'new', parent: 0, project: this.$route.params.id, user: this.$auth.user.id, content: this.formPost}); this.formPost = '' },
    reply(replycomment){this.formswitch == replycomment.id ? (this.formswitch = false, this.formComment = '')//turns off the box
    : (this.formswitch = replycomment.id, this.editreplyid = 'new', this.formComment = 'to #'+replycomment.id+': ')},
    edit(editcomment){this.formswitch == editcomment.id ? (this.formswitch = false, this.formComment = '')//turns off the box
    : (this.formswitch = editcomment.id, this.editreplyid = editcomment.id, this.formComment = editcomment.content)},
    remove(deletecomment){this.$store.dispatch('commentFormAction', { id: deletecomment.id, parent: deletecomment.parent, 
    project: this.$route.params.id, user: this.$auth.user.id, content: 'removed by author'}); this.edit(deletecomment.id) }, },
}
</script>
