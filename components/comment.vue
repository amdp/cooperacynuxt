<template>
  <div class="mx-auto mt-4 mb-5">
    <!-- NEW POST -->
    <b-form @submit.prevent="formpost()">
      <b-form-group
        label-for="postInput"
        label="New Post:"
        description="Make a question, discuss a topic!"
      >
        <b-button type="submit" style="display: none"></b-button>
        <b-form-input
          id="postInput"
          v-model="formPost"
          size="sm"
          @keyup="check()"
        ></b-form-input>
      </b-form-group>
    </b-form>

    <!-- POSTS -->
    <div class="row mt-3" v-for="comment in up" :key="comment.id">
      <div class="col-10 col-lg-7 mx-auto projectbox p-3">
        <div class="row mb-2 mt-0 ml-0 mr-0 p-0">
          <div class="col-2 col-md-1 space t10 graylight up text-left p-0">
            <img
              v-if="!anonymous"
              class="usercomment rounded-circle img-responsive"
              :src="userImage(comment.user)"
            />
          </div>
          <p class="col-10 col-md-11" v-html="comment.content"></p>
        </div>
        <div class="row">
          <div class="col-12 space t10 up text-right graylight">
            <span v-if="!anonymous">
              {{ comment.name }} {{ comment.surname }}
            </span>
            <span> #{{ comment.id }} {{ comment.created }} </span>
            <br />
            <span
              v-if="$auth.user.id == comment.user"
              class="gray finger"
              @click="remove(comment)"
            >
              Delete
            </span>
            <span
              v-if="$auth.user.id == comment.user"
              class="gray finger"
              @click="edit(comment)"
            >
              - Edit</span
            >
            <span class="gray finger" @click="reply(comment)"> - Reply</span>
          </div>
        </div>
        <div class="row m-0 p-0">
          <div class="col-12 mb-3">
            <votebar
              :voteprop="comment"
              :proptype="'comment'"
              :voteId="comment.id"
            />
          </div>
        </div>
        <!-- POSTS EDIT/REPLY FORM BOX -->
        <div class="row" v-if="formswitch == comment.id">
          <div class="col-12">
            <b-form @submit.prevent="formcomment(comment, editreplyid)">
              <b-button type="submit" style="display: none"></b-button>
              <b-form-input
                id="commentInput"
                v-model="formComment"
                size="sm"
              ></b-form-input>
              <b-link @click="edit(comment)" class="hunderstanding"
                >Cancel</b-link
              >
            </b-form>
          </div>
        </div>
        <!-- COMMENTS -->
        <div
          class="row mt-2"
          v-for="subcomment in sub(comment, comment.id)"
          :key="subcomment.id"
        >
          <div class="col-11 mx-auto">
            <div class="row mb-2 mt-0 ml-0 mr-0 p-0">
              <div class="col-2 col-md-1 space t10 graylight up text-left p-0">
                <img
                  v-if="!anonymous"
                  class="usercomment rounded-circle"
                  :src="userImage(subcomment.user)"
                />
              </div>
              <div class="col-10 col-md-11" v-html="subcomment.content"></div>
            </div>
            <div class="row">
              <div class="col-12 space t10 up text-right graylight">
                <span v-if="!anonymous">
                  {{ subcomment.name }} {{ subcomment.surname }}
                </span>
                <span> #{{ subcomment.id }} {{ subcomment.created }} </span>
                <br />
                <span
                  v-if="$auth.user.id == subcomment.user"
                  class="gray finger"
                  @click="remove(subcomment)"
                >
                  Delete
                </span>
                <span
                  v-if="$auth.user.id == subcomment.user"
                  class="gray finger"
                  @click="edit(subcomment)"
                >
                  - Edit</span
                >
                <span class="gray finger" @click="reply(subcomment)">
                  - Reply</span
                >
              </div>
            </div>
            <div class="row m-0 p-0">
              <div class="col-12 mb-3">
                <votebar :voteprop="subcomment" :proptype="'comment'" />
              </div>
            </div>
            <!-- COMMENTS EDIT/REPLY FORM BOX -->
            <div class="row" v-if="formswitch == subcomment.id">
              <div class="col-12">
                <b-form @submit.prevent="formcomment(subcomment, editreplyid)">
                  <b-button type="submit" style="display: none"></b-button>
                  <b-form-input
                    id="commentInput"
                    v-model="formComment"
                    size="sm"
                  ></b-form-input>
                  <b-link @click="edit(subcomment)" class="hunderstanding"
                    >Cancel</b-link
                  >
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import votebar from '@/components/votebar'
import comment from '@/components/comment'

export default {
  components: { votebar: votebar, comment: comment },
  data() {
    return {
      formswitch: false,
      editreplyid: false,
      formComment: '',
      formPost: ''
    }
  }, //if formswitch = a comment id, textbox appears
  computed: {
    up() {
      if (this.$store.state.comment) {
        return this.$store.state.comment.filter(comment => comment.parent === 0)
      } else {
        return []
      }
    },
    anonymous() {
      let thisproject = this.$store.state.project.filter(
        project => project.id == this.$route.params.id
      )
      if (thisproject[0].anonymous == 1) {
        return true
      }
    }
  },
  methods: {
    formcomment(comment, editreplyid) {
      if (comment.parent === 0) {
        var parent = comment.id
      } else {
        var parent = comment.parent
      }
      this.formComment = this.formComment.replace(
        /(http:\/\/[^\s]+|https:\/\/[^\s]+)/gm,
        '<a class="ae" href="$1">$1</a>'
      )
      if (editreplyid == 'new') {
        this.$store.dispatch('commentFormAction', {
          id: editreplyid,
          parent: parent,
          project: this.$route.params.id,
          user: this.$auth.user.id,
          content: this.formComment
        })
        this.reply(comment.id)
      } else {
        this.$store.dispatch('commentFormAction', {
          id: editreplyid,
          parent: comment.parent,
          project: this.$route.params.id,
          user: this.$auth.user.id,
          content: this.formComment
        })
        this.edit(comment.id)
      }
    },
    sub(comment, id) {
      if (this.$store.state.comment) {
        let subcomments = this.$store.state.comment.filter(
          comment => comment.parent === id && comment.id != id
        )
        subcomments.reverse()
        return subcomments
      } else {
        return []
      }
    },
    userImage(commentuser) {
      try {
        return require('../assets/image/user/' + commentuser + '.png')
      } catch (e) {
        return require('../assets/image/user/0.png')
      }
    },
    formpost() {
      this.formPost = this.formPost.replace(
        /(http:\/\/[^\s]+|https:\/\/[^\s]+)/gm,
        '<a class="ae" href="$1">$1</a>'
      )
      this.$store.dispatch('commentFormAction', {
        id: 'new',
        parent: 0,
        project: this.$route.params.id,
        user: this.$auth.user.id,
        content: this.formPost
      })
      this.formPost = ''
    },
    reply(replycomment) {
      this.check()
      if (this.formswitch == replycomment.id) {
        this.formswitch = false //turns off the box
      } else {
        this.formswitch = replycomment.id
        this.editreplyid = 'new' //use new due to
        this.formComment = 'to #' + replycomment.id + ': '
      }
    },
    edit(editcomment) {
      this.check()
      if (this.formswitch == editcomment.id) {
        this.formswitch = false //turns off the box
      } else {
        this.formswitch = editcomment.id
        this.editreplyid = editcomment.id
        if (editcomment.content) {
          this.formComment = editcomment.content.replace(
            /(<a class="ae" href="[^"]+">|<\/a>)/gm,
            ''
          )
        }
      }
    },
    remove(toberemoved) {
      this.check()
      this.$store.dispatch('commentFormAction', {
        id: toberemoved.id,
        parent: toberemoved.parent,
        project: this.$route.params.id,
        user: this.$auth.user.id,
        content: 'removed by author'
      })
      this.edit(toberemoved.id)
    },
    check() {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
