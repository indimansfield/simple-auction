# Simple Auctions
Simple Auction Application. Written in Typescript, Vue, Node
Auction items are located in `server/src/index.ts`

To Use:
* Select User at top of page.
* Place Bid on items.
* Once item expires it will be sold to highest bidder.
* All auctions are in memory to Restart auctions just restart the server.
* To run automated tests:
* `cd server`
* `yarn test` 


### Requirements
* node 10
* yarn

### Set up
 * Clone the repository
 * `cd simple-auction/server`
 * `yarn install`
 * `yarn start`
 
#### In a new terminal window
 * `cd simple-auction/client`
 * `yarn install`
 * `yarn serve`

 * Open window at `localhost:8080`
