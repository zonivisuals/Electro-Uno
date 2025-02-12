export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild'

type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4'  

export type Card = {
    id: string
    value: CardValue
    color: CardColor
    type:"number" | "action" | "wild"
}

type Player = {
    address: string
    hand: Card[]
}

type GameState = {
    currentPlayerIndex: number
    status: 'waiting' | 'active' | 'complete'
    deck: Card[]
    topCard: Card
    direction: 'clockwise' | 'counter-clockwise'
    discardPile: Card[]
    players: Player[]
    currentColor: CardColor //when wild declaration
    pendingDraws: number //when draw2 and wild4
}

export class GameEngine {
    private state: GameState;
    constructor(players: string[]){
        this.state = this.initializeGame(players)
    }

    private initializeGame(players: string[]): GameState{
        const currentDeck = this.generateDeck()
        const shuffledDeck = this.shuffleDeck(currentDeck)

        //assign the first non-wild card to topcard
        let topCard = shuffledDeck.find(c => c.type != 'wild') || shuffledDeck[0]
        shuffledDeck.splice(shuffledDeck.indexOf(topCard),1)

        //assign 7 cards to each player
        const gamePlayers: Player[] = players.map(address => ({
            address,
            hand: shuffledDeck.splice(0,7)
        }))
        return{
            currentPlayerIndex : 0,
            status : 'active',
            deck : currentDeck,
            topCard,
            direction : 'clockwise',
            discardPile : [topCard],
            players : gamePlayers,
            currentColor: topCard.color,
            pendingDraws: 0
        }
    }

    private generateDeck(): Card[]{
        const colors: CardColor[] = ['red', 'blue', 'green', 'yellow']
        const values: CardValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2']

        const deck: Card[] = []

        //generate number & action cards
        colors.forEach(color => {
            values.forEach(value => {
                let count = value == '0' ? 1 : 2
                for(let i=0; i<count;i++){
                    deck.push({ 
                        id: `${color}-${value}-${i}`,
                        value: value,
                        color: color,
                        type: value === 'skip' || value === 'reverse' || value === 'draw2' ? 'action' : 'number' 
                    })
                }
            })
        });

        //generate wild cards
        for(let i=0; i<4; i++){
            deck.push({
                id: `wild4-${i}`,
                value: 'wild4',
                color: 'wild',
                type: 'wild'
            })
        
            deck.push({
                id: `wild-${i}`,
                value: 'wild',
                color: 'wild',
                type: 'wild'
            })
        }

        return deck;
    }

    private shuffleDeck(deck: Card[]): Card[]{
        for(let i=deck.length - 1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1))
            const temp = deck[j]
            deck[j] = deck[i]
            deck[i] = temp
        }
        return deck
    }

    public handleSpecialCard(card: Card, chosenColor?: CardColor): void{
        switch(card.value){
            case "reverse":
                this.state.direction = this.state.direction === 'clockwise' 
                ? 'counter-clockwise' 
                : 'clockwise';
              break;
            
            case "skip":
                this.advanceTurn()
                break

            case "draw2":
                this.state.pendingDraws+= 2
                break

            case "wild":
            case "wild4":
                if(!chosenColor || chosenColor === 'wild'){
                    throw new Error('Must choose valid color')
                }
                this.state.currentColor = chosenColor
                if(card.value === 'wild4')
                    this.state.pendingDraws += 4
                break
            default:

        }
    }   

    public playCard(playerAddress: string, cardId: string, chosenColor?: CardColor): boolean{
        const currentPlayer = this.state.players.find(p => p.address == playerAddress)
        if(!currentPlayer || !this.isTurn(playerAddress)) return false
        
        const cardIndex = currentPlayer?.hand.findIndex(c => c.id == cardId)
        if(cardIndex === -1) return false
        
        const card = currentPlayer?.hand[cardIndex]
        if(!this.isValidPlay(card)) return false

        //temporarly fixed
        if(this.state.pendingDraws > 0){
            if(card.value !== 'draw2' && card.value!== 'wild4'){
                this.forceDrawCards(currentPlayer, this.state.pendingDraws)
                this.state.pendingDraws = 0
                this.advanceTurn()
                return false //no cards played
            }
        }

        //drop card and update discardPile
        currentPlayer.hand.splice(cardIndex,1)
        this.state.discardPile.push(card)
        this.state.topCard = card

        //handle card effect
        this.handleSpecialCard(card, chosenColor!)
        
        //check if winner or UNOer
        if(currentPlayer.hand.length === 0){
            this.state.status = 'complete'
            return true
        }
        if(currentPlayer.hand.length === 1) console.log('UNO!')
    

        this.advanceTurn()
        return true
    }

    public drawCards(playerAddress: string, count:number = 1): Card[]{
        if(!this.isTurn(playerAddress) || this.state.pendingDraws > 0) 
            return []
        const player = this.state.players.find(p => p.address === playerAddress)
        const drawnCards: Card[] = []

        while(count > 0 && this.state.deck.length > 0){
            if(this.state.deck.length === 0)
                this.reshuffleDiscardPile()
            drawnCards.push(this.state.deck.pop()!)
            count--
        }
        player?.hand.push(...drawnCards)
        return drawnCards
    }

    private reshuffleDiscardPile(): void {
        const currentTopCard = this.state.discardPile.pop()!;
        this.state.deck = this.shuffleDeck([...this.state.discardPile]);
        this.state.discardPile = [currentTopCard];
    }

    private isValidPlay(card: Card): boolean{
        return card.value === this.state.topCard.value
                || card.color === this.state.currentColor
                || card.type === 'wild'
                || (this.state.topCard.type === 'wild' && card.color === this.state.currentColor)
    }

    private advanceTurn(): void {
        const increment = this.state.direction === 'clockwise' ? 1 : -1;
        let nextIndex = this.state.currentPlayerIndex;
        
        nextIndex = (nextIndex + increment + this.state.players.length) % 
                    this.state.players.length;
        this.state.currentPlayerIndex = nextIndex;
      }
    
      //force a player to draw cards
      private forceDrawCards(player: Player, count: number): void {
        let drawn = 0;
        while (drawn < count && this.state.deck.length > 0) {
          if (this.state.deck.length === 0) this.reshuffleDiscardPile();
          player.hand.push(this.state.deck.pop()!);
          drawn++;
        }
      }
    
      public getCurrentState(): GameState {
        return { 
          ...this.state,
          //clone sensitive arrays
          deck: [...this.state.deck],
          discardPile: [...this.state.discardPile],
          players: this.state.players.map(p => ({
            ...p,
            hand: [...p.hand]
          }))
        };
      }
    
      public getCurrentPlayer(): Player {
        return this.state.players[this.state.currentPlayerIndex];
      }
    
      public getNextPlayer(): Player {
        const increment = this.state.direction === 'clockwise' ? 1 : -1;
        const nextIndex = (this.state.currentPlayerIndex + increment + 
                          this.state.players.length) % this.state.players.length;
        return this.state.players[nextIndex];
      }
    
      public checkWinCondition(playerAddress: string): boolean {
        const player = this.state.players.find(p => p.address === playerAddress);
        return !!player && player.hand.length === 0;
      }
    
      private isTurn(playerAddress: string): boolean {
        return this.getCurrentPlayer().address === playerAddress && this.state.status === 'active';
      }


      //testing purposes
      public increasePendingDrawsBy(n: number): void{
        this.state.pendingDraws += n
      }
    }