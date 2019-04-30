import { Item } from './item';
import { User } from './user';

describe('Item', () => {
  let item: Item;
  let john: User;
  const expriry = 1556617027;
  beforeEach(() => {
    john = new User('john');
    item = new Item(
      'Sandwich',
      4.95,
      expriry,
      john
    );
  });
  it('should be created with name and creator set and expiry', () => {
    expect(item.name).toEqual('Sandwich');
    expect(item.creator.name).toEqual('john');
    expect(item.expiry).toBe(expriry);
  });
  it('should have current price set to starting price at creation', () => {
    expect(item.currentPrice).toBe(4.95);
  });
  it('should accept bids from users', () => {
    const mary = new User('mary');
    item.setBid(5.00, mary, 1556617020);
    expect(item.currentPrice).toBe(5.00);
    expect(item.highestBidder).toEqual(mary);
  });
  it('should not accept a bid lower than the current bid', () => {
    const mary = new User('mary');
    const tim = new User('tim');
    item.setBid(5.00, mary, 1556617020);
    expect(item.setBid(4, tim, 1556617021)).toBe(false);
    expect(item.currentPrice).toBe(5.00);
    expect(item.highestBidder).toEqual(mary);
  });

  it('should not accept a bid equal to the current bid', () => {
    const mary = new User('mary');
    const tim = new User('tim');
    item.setBid(5.00, mary, 1556617020);
    expect(item.setBid(5.00, tim, 1556617021)).toBe(false);
    expect(item.currentPrice).toBe(5.00);
    expect(item.highestBidder).toEqual(mary);
  });
  it('should not set bid on expired item', () => {
    const mary = new User('mary');
    const tim = new User('tim');
    item.setBid(5.00, mary, 1556617020);
    expect(item.setBid(5.00, tim, 1556617028)).toBe(false);
    expect(item.currentPrice).toBe(5.00);
    expect(item.highestBidder).toEqual(mary);
  });

  it('should be sold after expiry', () => {
    const mary = new User('mary');
    item.setBid(5.00, mary, 1556617020);
    const { status, highestBidder, currentPrice, creator } = item.getStatus(expriry + 1);
    expect(status).toBe('sold');
    expect(highestBidder).toEqual(mary);
    expect(creator).toEqual(john);
    expect(currentPrice).toBe(5.00);
  });

  it('should be unsold after expiry if not bid on', () => {
    const { status, highestBidder } = item.getStatus(expriry + 1);
    expect(status).toBe('unsold');
    expect(highestBidder).toBeNull();
  });
});
