<template>
  <div class="mx-auto mt-4 mb-5">
    <!-- NEW POST -->
    <p>Make a question, discuss a topic!</p>
    <vue-tribute :options="options" id="postTribute">
      <b-container
        class="newcommentbox p-0 m-0"
        contenteditable="true"
        @tribute-replaced="mention()"
        @click="check()"
        id="formPost"
        v-on:keyup.enter="formpost('formPost')"
      ></b-container>
    </vue-tribute>

    <!-- POSTS -->
    <div class="row mt-3" v-for="comment in up" :key="comment.id">
      <div class="col-10 col-lg-7 mx-auto cooperationbox p-3">
        <div class="row mb-2 mt-0 ml-0 mr-0 p-0">
          <div class="col-2 col-md-1 space t10 graylight up text-left p-0">
            <img
              v-if="!anonymous"
              class="usercomment rounded-circle img-responsive"
              :src="'/assets/image/user/' + comment.user + '.png'"
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
        <!-- POST EDIT/REPLY FORM BOX -->
        <b-row class="p-0 m-0" v-show="formswitch == comment.id">
          <b-col cols="12">
            <vue-tribute :options="options" id="commentTribute">
              <!-- !!!the mention function should carry the id of the comment !!!-->
              <b-container
                class="newcommentbox"
                contenteditable="true"
                @tribute-replaced="mention()"
                @click="check()"
                :id="'commentInput' + comment.id"
                v-on:keyup.enter="commentform(comment, editreplyid)"
              ></b-container>
            </vue-tribute>
            <b-link @click="edit(comment)" class="hunderstanding">
              Cancel
            </b-link>
          </b-col>
        </b-row>
        <!-- COMMENT -->
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
                  :src="'/assets/image/user/' + subcomment.user + '.png'"
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
            <!-- COMMENT EDIT/REPLY FORM BOX -->
            <b-row class="p-0 m-0" v-show="formswitch == subcomment.id">
              <b-col cols="12">
                <vue-tribute :options="options" id="commentTribute">
                  <!-- !!!the mention function should carry the id of the comment !!!-->
                  <b-container
                    class="newcommentbox"
                    contenteditable="true"
                    @tribute-replaced="mention()"
                    @click="check()"
                    :id="'commentInput' + subcomment.id"
                    v-on:keyup.enter="commentform(subcomment, editreplyid)"
                  ></b-container>
                </vue-tribute>
                <b-link @click="edit(subcomment)" class="hunderstanding">
                  Cancel
                </b-link>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formswitch: false,
      editreplyid: false,
      formComment: '',
      formPost: '',
      enteredmention: false,
      mentionedUsers: [],
    }
  }, //if formswitch = a comment id, textbox appears
  computed: {
    up() {
      if (this.$store.state.comment) {
        return this.$store.state.comment.filter(
          (comment) => comment.parent === 0
        )
      } else {
        return []
      }
    },
    anonymous() {
      let thiscooperation = this.$store.state.cooperation.filter(
        (cooperation) => cooperation.id == this.$route.params.id
      )
      if (thiscooperation[0].anonymous == 1) {
        return true
      }
    },
    options() {
      let members = []
      for (let i = 0; i < this.$store.state.userlist.length; i++) {
        if (this.$store.state.userlist[i].active)
          members.push({
            key: this.$store.state.userlist[i].name + ' ' + this.$store.state.userlist[i].surname,
            value: this.$store.state.userlist[i].name + ' ' + this.$store.state.userlist[i].surname,
            id: this.$store.state.userlist[i].id
          })
      }
      let options = {}
      let mentioned = this.mentionedUsers
      return options = {
        trigger: "@",
        values: members,
        selectTemplate: function (item) {
          mentioned.push({ id: item.original.id })
          this.mentionedUsers = mentioned
          return this.formPost = '<span class="freedom">@' + item.original.value + "</span>"
        },
      }
    }
  },
  mounted() {
    this.options.values = this.members
  },
  methods: {
    noMatchFound() {
      console.log("No matches found!");
    },
    mention() {
      this.enteredmention = true
    },
    append() {
      let kv = Math.random()
        .toString(36)
        .slice(2);
      this.options.values.push({
        key: kv,
        value: kv
      });
    },
    sub(comment, id) {
      if (this.$store.state.comment) {
        let subcomments = this.$store.state.comment.filter(
          (comment) => comment.parent === id && comment.id != id
        )
        subcomments.reverse()
        return subcomments
      } else {
        return []
      }
    },
    async commentform(formcomment, editreplyid) {
      if (this.enteredmention) {
        //if enteredmention is true we should interrupt as the enter comes from a mention
        return this.enteredmention = false
      } else {
        if (formcomment.parent === 0) {
          var parent = formcomment.id
        } else {
          var parent = formcomment.parent
        }
        let data = document.getElementById('commentInput' + formcomment.id).innerHTML
        data = await data.replace(
          /(http:\/\/[^\s]+|https:\/\/[^\s]+)/gm,
          '<a class="ae" href="$1">$1</a>'
        )
        let commentId
        if (editreplyid == 'new') {
          commentId = await this.$store.dispatch('commentForm', {
            id: editreplyid,
            parent: parent,
            cooperation: this.$route.params.id,
            user: this.$auth.user.id,
            content: data,
          })
          this.reply(formcomment.id)
        } else {
          commentId = await this.$store.dispatch('commentForm', {
            id: editreplyid,
            parent: formcomment.parent,
            cooperation: this.$route.params.id,
            user: this.$auth.user.id,
            content: data,
          })
          this.edit(formcomment.id)
        }
        await this.$store.dispatch('notificationPush', {
          array: this.mentionedUsers,
          author: this.$auth.user.id,
          comment: commentId,
          cooperation: this.$route.params.id,
          condition: 0,
          message: data,
        })
        document.getElementById('commentInput' + formcomment.id).innerHTML = ''
        this.mentionedUsers = []
      }
    },
    async formpost(box) {
      if (this.enteredmention) {
        //if enteredmention is true we should interrupt as the enter comes from a mention
        return this.enteredmention = false
      } else {
        let data = document.getElementById(box).innerHTML
        data = await data.replace(
          /(http:\/\/[^\s]+|https:\/\/[^\s]+)/gm,
          '<a class="ae" href="$1">$1</a>'
        )
        let commentId = await this.$store.dispatch('commentForm', {
          id: 'new',
          parent: 0,
          cooperation: this.$route.params.id,
          user: this.$auth.user.id,
          content: data,
        })
        await this.$store.dispatch('notificationPush', {
          array: this.mentionedUsers,
          author: this.$auth.user.id,
          comment: commentId,
          cooperation: this.$route.params.id,
          condition: 0,
          message: data,
        })
        document.getElementById('commentInput' + comment.id).innerHTML = ''
        this.mentionedUsers = []
      }
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
      this.$store.dispatch('commentForm', {
        id: toberemoved.id,
        parent: toberemoved.parent,
        cooperation: this.$route.params.id,
        user: this.$auth.user.id,
        content: 'removed by author',
      })
      this.edit(toberemoved.id)
    },
    check() {
      if (!this.$auth.user) {
        return this.$router.push({ path: '/login' })
      }
    },
  },
}
</script>
