<template>
  <div class="auction-item-container">
    <div class="auction-item-name cell md-list-item-text"> 
      <label class="auction-item-label"> Item Name </label>      
      <span class="auction-item-title"> {{ name }} </span>
    </div> 
    <div
      v-if="status === 'running'" 
      class="auction-item-price cell md-list-item-text">
      <label class="auction-item-label"> Price </label>      
      <span class="auction-item-value">{{ priceInDollars }} </span>
    </div>
    <div
      v-if="status === 'running'" 
      class="auction-item-bids cell md-list-item-text"> 
      <label class="auction-item-label"> Bids </label>      
      <span class="auction-item-value"> {{ bids }} </span>
    </div>
    <div
      v-if="status === 'running'" 
      class="auction-item-expiry cell md-list-item-text">
      <label class="auction-item-label"> Expires In </label>      
      <span class="auction-item-value"> {{ expiresIn }}  </span>
    </div>
    <div
      v-if="status === 'running'" 
      class="auction-item-current-winner cell md-list-item-text">
      <label class="auction-item-label"> Current Winner </label>      
      <span class="auction-item-value"> {{ bidderName }}  </span>
    </div>
    <div
      v-if="status === 'running'" 
      class="auction-item-submit cell" >
      <md-field>
        <label>Price</label>
        <span class="md-prefix">$</span>
        <md-input v-model="bidPrice"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="onBidClicked">
        Place Bid
      </md-button>
    </div>
    <div v-if="status === 'unsold'" class="auction-item-result cell">
      Item Was Not Sold
    </div>
    <div v-if="status === 'sold'" class="auction-item-result cell">
      Item Sold to {{ bidder.name }} for {{ priceInDollars }}
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AuctionItem extends Vue {
  @Prop() private name!: string;
  @Prop() private price!: number;
  @Prop() private bidder!: { name: string };
  @Prop() private expiry!: number;
  @Prop() private bids!: number;
  @Prop() private status!: string;

  private bidPrice: number = 0;
  private expiresIn: string = this.secondsToTimeFormat(this.getDistance());

  private mounted() {
    setInterval(() => {
      const distance = this.getDistance();
      if (distance === 0) {
        this.$emit('expiry');
        clearInterval();
      } else {
        this.expiresIn = this.secondsToTimeFormat(distance);
      }
    }, 1000);
  }

  get bidderName() {
    if (this.bidder) {
      return this.bidder.name;
    }
    return 'No Bids';
  }

  get priceInDollars() {
    const asDollars = this.price / 100;
    return asDollars.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
  }

  private getDistance() {
    let distance = (this.expiry * 1000) - Date.now();
    if (distance < 0) {
      distance = 0;
    }
    return distance;
  }

  private secondsToTimeFormat(seconds: number) {
    return new Date(seconds).toISOString().substr(11, 8);
  }

  private onBidClicked() {
    const priceInCents = this.bidPrice * 100;
    this.$emit('bid', priceInCents);
  }
}
</script>

<style>
.auction-item-container {
  width: 60%;
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  text-align: left;
  padding-left: 10px;
  border: 1px solid #D3DBE3
}

.auction-item-value {
  font-size: 16px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.auction-item-name {
  grid-row: 1;
  grid-column: 1
}
.auction-item-price {
  grid-row: 2;
  grid-column: 1;
}
.auction-item-bids {
  grid-row: 2;
  grid-column: 2;
}
.auction-item-expiry {
  grid-row: 2;
  grid-column: 3;
}
.auction-item-submit {
  grid-row: 2;
  grid-column: 5;
}
.auction-item-result {
  grid-row: 1;
  grid-column: 2;
}
.auction-item-current-winner {
  grid-row: 2;
  grid-column: 4; 
}
.auction-item-label {
  pointer-events: auto;
  top: 0;
  opacity: 1;
  font-size: 12px;
  color:rgba(0,0,0,0.54);
}
.auction-item-title {
  font-size: 18px !important;
  font-weight: bold;
}
</style>
