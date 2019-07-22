<template>
  <div>
  <br /><img class="page-header" src="~/assets/image/page/banners/news.png" />

  <div class="row mt-2" v-for="news in this.$store.state.news" :key="news.id">
    <p class="subheading freedom center space up margin">{{news.title}}</p>
    <br>
    <p><img class="news" :src="newsImage(news)" v-if="news.img" /></p>
    <br>
    <span class="base" v-html="news.content"></span>
  </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store, params }) {await store.dispatch('getNewsAction', '') },
  methods: {
    newsImage(img){ if (img.img) { return require('~/assets/image/news/' + img.img)} }
  }
}
</script>

  <!-- @foreach ($posts as $post)

  <div class="row" id="{{$post->id}}">

  <br>
  <p class="subheading freedom center space margin">{!! strtoupper($post->title) !!}</p>
  @if($post->img!=='NO')
  <br>
  <img class="img-responsive" src="{{asset('images/news/'.$post->img)}}" alt="null" />
  @endif
  <p class="base"><br>{!!html_entity_decode($post->content)!!}</p>
  </div>
 -->
 