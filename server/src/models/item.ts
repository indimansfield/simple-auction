import { User } from './user';

export class Item {
  public name: string;
  public startingPrice: number;
  public currentPrice: number;
  public bids: number = 0;
  public creator: User;
  public highestBidder: User | null = null;
  public expiry: number;

  private status: 'sold' | 'running' | 'unsold' = 'running';

  constructor(
    name: string,
    startingPrice: number,
    expiry: number,
    creator: User
  ) {
    this.name = name;
    this.startingPrice = startingPrice;
    this.currentPrice = startingPrice;
    this.expiry = expiry;
    this.creator = creator;
  }

  public setBid(price: number, bidder: User, time: number): boolean {
    if (price <= this.currentPrice) {
      return false;
    }
    if (time > this.expiry) {
      return false;
    }
    this.currentPrice = price;
    this.highestBidder = bidder;
    return true;
  }

  public getStatus(time: number) {
    if (time > this.expiry) {
      if (this.highestBidder) {
        this.status = 'sold';
      } else {
        this.status = 'unsold';
      }
    }
    const { name, status, expiry, highestBidder, currentPrice, creator } = this;
    return {
      name,
      status,
      currentPrice,
      expiry,
      highestBidder,
      creator
    };
  }



}

