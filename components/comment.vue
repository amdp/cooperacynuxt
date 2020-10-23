<template>
  <b-container class="mx-auto mt-4 mb-5 fumetto">
    <!-- NEW POST -->
    <b-container class="p-2">Make a question, discuss a topic!</b-container>
    <vue-tribute :options="options" id="postTribute" class="px-2">
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
    <b-row class="m-0 p-0 mt-3" v-for="comment in up" :key="comment.id">
      <b-col cols="12" lg="7" class="p-0 mx-auto cooperationbox">
        <b-row class="m-0 p-0">
          <b-col cols="2" md="1" class="space t10 graylight up text-left p-0">
            <img
              v-if="!anonymous"
              class="usercommentimg rounded-circle img-responsive"
              :src="'/assets/image/user/' + comment.user + '.png'"
            />
          </b-col>
          <b-col cols="10" md="11" class="t12 m-0 p-0 px-1 bianchetto">
            <b-container v-if="!anonymous" class="m-0 p-0 up hb">
              {{ comment.name }} {{ comment.surname }}
            </b-container>
            <span v-html="comment.content"></span>
          </b-col>
        </b-row>
        <b-row class="m-0 mx-2 p-0">
          <b-col cols="6" class="m-0 p-0 t10 b up">
            <a class="finger ae" @click="reply(comment)">Reply</a>&nbsp;
            <a
              v-if="$auth.user.id == comment.user"
              class="finger af"
              @click="edit(comment)"
              >Edit</a
            >&nbsp;
            <a
              v-if="$auth.user.id == comment.user"
              class="finger au"
              @click="remove(comment)"
            >
              Delete
            </a>
          </b-col>
          <b-col cols="6" class="m-0 p-0 t10 text-right">
            {{ comment.created.replace(/T|:..\.000Z/gm, ' ') }}
            #{{ comment.id }}
          </b-col>
        </b-row>
        <b-row class="m-0 p-0">
          <b-col cols="12" class="m-0 p-0">
            <votebar
              :voteprop="comment"
              :proptype="'comment'"
              :voteId="comment.id"
            />
          </b-col>
        </b-row>

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
        <b-row
          class="m-0 mt-2 p-0"
          v-for="subcomment in sub(comment, comment.id)"
          :key="subcomment.id"
        >
          <b-col cols="12" class="p-0 m-0">
            <b-row class="m-0 p-0">
              <b-col cols="1" class="m-0 p-0"></b-col>
              <b-col
                cols="2"
                md="1"
                class="space t10 graylight up text-left p-0"
              >
                <img
                  v-if="!anonymous"
                  class="usercommentimg rounded-circle img-responsive"
                  :src="'/assets/image/user/' + subcomment.user + '.png'"
                />
              </b-col>
              <b-col cols="9" md="10" class="t12 m-0 p-0 px-1 bianchetto">
                <b-container v-if="!anonymous" class="m-0 p-0 up hb">
                  {{ subcomment.name }} {{ subcomment.surname }}
                </b-container>
                <span v-html="subcomment.content"></span>
              </b-col>
            </b-row>
            <b-row class="m-0 mx-2 p-0">
              <b-col cols="6" class="m-0 p-0 t10 b up">
                <a class="finger ae" @click="reply(subcomment)">Reply</a>&nbsp;
                <a
                  v-if="$auth.user.id == subcomment.user"
                  class="finger af"
                  @click="edit(subcomment)"
                  >Edit</a
                >&nbsp;
                <a
                  v-if="$auth.user.id == subcomment.user"
                  class="finger au"
                  @click="remove(subcomment)"
                >
                  Delete
                </a>
              </b-col>
              <b-col cols="6" class="m-0 p-0 t10 text-right">
                {{ subcomment.created.replace(/T|:..\.000Z/gm, ' ') }}
                #{{ subcomment.id }}
              </b-col>
            </b-row>
            <b-row class="m-0 p-0">
              <b-col cols="12" class="m-0 p-0">
                <votebar
                  :voteprop="subcomment"
                  :proptype="'comment'"
                  :voteId="subcomment.id"
                />
              </b-col>
            </b-row>

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
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="circle"></div>
  </b-container>
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
        document.getElementById('formPost').innerHTML = ''
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
