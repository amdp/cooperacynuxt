<template>
  <b-container>
    <div class="row">
      <h1 id="contact" name="contact" class="transparency heading center space">
        CONTACT US
      </h1>
    </div>
    <div class="row">
      <p class="base center">
        Contact us or feel free to ask us anything that is not clear yet.
      </p>
    </div>

    <!-- Test -->
    <div class="row">
      <div class="col-md-6 mb-2" v-html="response" v-if="response.length"></div>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well well-sm">
          <form class="form-horizontal" @submit.prevent="submit">
            <fieldset>
              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="name">Name</label>
                <div class="col-md-9">
                  <input
                    v-model="formName"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Email input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="email"
                  >Your E-mail</label
                >
                <div class="col-md-9">
                  <input
                    v-model="formEmail"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="form-group">
                <label class="col-md-3 control-label" for="subject"
                  >Subject</label
                >
                <div class="col-md-9">
                  <input
                    v-model="formSubject"
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <!-- Message body -->
              <div class="form-group">
                <label class="col-md-3 control-label" for="message"
                  >Your message</label
                >
                <div class="col-md-9">
                  <textarea
                    v-model="formBody"
                    class="form-control"
                    id="message"
                    name="message"
                    placeholder="Please enter your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>

              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-3">
                  <VueRecaptcha
                    :sitekey="envrecaptcha"
                    size="invisible"
                    ref="recaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    loadRecaptchaScript
                  ></VueRecaptcha>
                </div>
                <div class="col-md-3 text-right">
                  <input
                    type="submit"
                    class="btn btn-primary btn-lg"
                    value="Submit"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'contactForm',
  data() {
    return {
      formName: '',
      formEmail: '',
      formSubject: '',
      formBody: '',
      response: '',
      recaptchaToken: '',
      envrecaptcha: process.env.RECAPTCHA
    }
  },
  components: {
    VueRecaptcha
  },
  mounted() {
    console.log(' ' + JSON.stringify(this.envrecaptcha))
  },
  methods: {
    submit() {
      this.$refs.recaptcha.execute()
    },
    onVerify(res) {
      this.recaptchaToken = res
      this.sendMail()
    },
    onExpired() {
      this.$refs.recaptcha.reset()
    },
    async sendMail() {
      const message = {
        formName: this.formName,
        formEmail: this.formEmail,
        formSubject: this.formSubject,
        formBody: this.formBody,
        recaptchaToken: this.recaptchaToken
      }
      try {
        const res = await this.$store.dispatch('contactEmailAction', message)
        this.formName = this.formEmail = this.formSubject = this.formBody = this.recaptchaToken =
          ''
        this.response = res.message
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
