<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <AuctionItem
      name='paperclip'
      price=3000
      bidder="chief"
      creator="bob"
      expiry=1556627904
      bids=10
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import AuctionItem from './components/AuctionItem.vue';

@Component({
  components: {
    HelloWorld,
    AuctionItem,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
