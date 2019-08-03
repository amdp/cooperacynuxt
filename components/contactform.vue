<template>
  <div class="container">
    <div class="row">
      <h1 id="contact" name="contact" class="transparency heading center space">CONTACT US</h1>
    </div>
    <div class="row">
      <p class="base center">Contact us or feel free to ask us anything that is not clear yet.</p>
    </div>

    <!-- Test -->
    <div class="row">
      <div class="col-md-6 mb-2" v-html="response" v-if="response.length"></div>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well well-sm">
          <form class="form-horizontal" @submit.prevent="sendMail">
            <fieldset>
              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="name">Name</label>
                <div class="col-md-9">
                  <input
                    v-model="name"
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
                <label class="col-md-3 control-label" for="email">Your E-mail</label>
                <div class="col-md-9">
                  <input
                    v-model="email"
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
                <label class="col-md-3 control-label" for="subject">Subject</label>
                <div class="col-md-9">
                  <input
                    v-model="subject"
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
                <label class="col-md-3 control-label" for="message">Your message</label>
                <div class="col-md-9">
                  <textarea
                    v-model="body"
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
                <div class="col-md-3 text-right">
                  <input type="submit" class="btn btn-primary btn-lg" value="Submit" />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "contactForm",
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      body: "",
      response: ""
    };
  },
  methods: {
    async sendMail() {
      const message = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        body: this.body
      };
      try {
        const res = await axios.post("/db/contactemail", message);
        this.name = this.email = this.subject = this.body = "";
        this.response = res.data.message;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
