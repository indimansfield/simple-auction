<template>
  <div class="auction-item-container">
    <div class="auction-item-name cell md-list-item-text"> 
      <label class="auction-item-label"> Item Name </label>      
      <span class="auction-item-title"> {{ name }} </span>
    </div>
    <div class="auction-item-price cell md-list-item-text">
      <label class="auction-item-label"> Price </label>      
      <span class="auction-item-value">{{ priceInDollars }} </span>
    </div>
    <div class="auction-item-bids cell md-list-item-text"> 
      <label class="auction-item-label"> Bids </label>      
      <span class="auction-item-value"> {{ bids }} </span>
    </div>
    <div class="auction-item-expiry cell md-list-item-text">
      <label class="auction-item-label"> Expires In </label>      
      <span class="auction-item-value"> {{ expiresIn }}  </span>
    </div>
    <div class="auction-item-submit cell">
      <md-field>
        <label>Price</label>
        <span class="md-prefix">$</span>
        <md-input v-model="bidPrice"></md-input>
      </md-field>
      <md-button class="md-raised md-primary">
        Place Bid
      </md-button>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AuctionItem extends Vue {
  @Prop() private name!: string;
  @Prop() private price!: number;
  @Prop() private bidder!: string;
  @Prop() private creator!: string;
  @Prop() private expiry!: number;
  @Prop() private bids!: number;

  private bidPrice: number = 0;

  get priceInDollars() {
    const asDollars = this.price / 100;
    return asDollars.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
  }

  get expiresIn() {
    let distance = (this.expiry * 1000) - Date.now();
    console.log(distance);
    if(distance < 0) {
      distance = 0;
    }
    return new Date(distance).toISOString().substr(11, 8);
  }
}
</script>

<style>
.auction-item-container {
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  text-align: left;
}

.auction-item-value {
  font-size: 16px;
}

.auction-item-title {
  font-size: 18px;
  font-weight: bold;
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
  grid-column: 4;
}
.auction-item-label {
  pointer-events: auto;
  top: 0;
  opacity: 1;
  font-size: 12px;
  color:rgba(0,0,0,0.54);
}
</style>
