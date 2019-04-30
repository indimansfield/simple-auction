<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <h4> User: {{ currentUser }} </h4>
    <md-button @click="setUser('Herc')">herc</md-button>
    <md-button @click="setUser('Omar')">Omar</md-button>
    <md-button @click="setUser('Kima')">kima</md-button>
    <h4> Auctions </h4>
    <div class="auction-container" v-for="(item, index) in items" v-bind:key="item.name">
      <AuctionItem
        :name="item.name"
        :price="item.currentPrice"
        :bidder="item.highestBidder"
        :creator="item.creator"
        :expiry="item.expiry"
        :bids="item.bids"
        :status="item.status"
        v-on:bid="onBid(item.name, $event, index)"
        v-on:expiry="onExpiry(item.name, index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AuctionItem from './components/AuctionItem.vue';
import { getAuctions, bid, getItemStatus } from './api';

@Component({
  components: {
    AuctionItem,
  },
})
export default class App extends Vue {
  private items: any[] = [];

  private currentUser = 'Herc';

  private async mounted() {
    this.items = await getAuctions();
  }

  private async onBid(name: string, event: any, index: number) {
    const result = await bid(name, event, this.currentUser);
    this.$set(this.items, index, result);
  }

  private async onExpiry(name: string, index: number) {
    const result = await getItemStatus(name);
    this.$set(this.items, index, result);
  }

  private setUser(name: string) {
    this.currentUser = name;
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 5px;
}

.auction-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
