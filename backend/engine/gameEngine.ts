type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild'

type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4'  

type Card = {
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
    currentColor: CardColor
    status: 'waiting' | 'active' | 'complete'
    deck: Card[]
    topCard: Card
    direction: 'clockwise' | 'counter-clockwise'
    discardPile: Card[]
    players: Player[]
}

export class GameEngine {
    private state: GameState;
    constructor(players: string[]){
        this.state = this.initializeGame(players)
    }

    private initializeGame(players: string[]): GameState{
        const currentDeck = this.generateDeck()
        const shuffledDeck = this.shuffleDeck(deck)

        //assign 7 cards to each player
        const gamePlayers: Player[] = players.map(address => ({
            address,
            hand: shuffledDeck.splice(0,7)
        }))
        return{
            currentPlayerIndex : 0,
            status : 'active',
            deck : currentDeck,
            topCard : shuffledDeck.pop() || null,
            direction : 'clockwise',
            discardPile : [],
            players : gamePlayers
        }
    }

    public playCard(playerAddress: string, cardId: string): boolean{
        const currentPlayer = this.state.players.find(p => p.address == playerAddress)
        if(!currentPlayer || !this.isTurn(currentPlayer)) return false
        
        const cardIndex = currentPlayer?.hand.findIndex(c => c.id == cardId)
        if(cardIndex === -1) return false
        
        const card = currentPlayer?.hand[cardIndex]
        if(!this.isValidPlay(card)) return false

        //drop the card
        currentPlayer.hand.splice(cardIndex, 1)
        this.state.topCard = card
        this.state.discardPile.push(card)
    
        //handle special card play
        if(this.isSpecialCard(card)){
            this.handleSpecialCard(card)
        }

        this.advanceTurn()
        return true
    }

    private handleSpecialCard(card: Card): void{
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
                this.handleDrawCards(2)
                break
            //will add wild cards later
        }
    }   

    private advanceTurn(): void{
        const increment = this.state.direction === "clockwise" ? 1 : -1
        this.state.currentPlayerIndex = (this.state.currentPlayerIndex + increment + this.state.players.length) % this.state.players.length
    }

    private isSpecialCard(card: Card): boolean{
        if(card.type === "number") return false
        return true 
    }

    private generateDeck(): Card[]{
        const colors: CardColor[] = ['red', 'blue', 'green', 'yellow']
        const values: CardValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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
        
    private shuffleDeck(deck: Card[]):void{
        for(let i=deck.length - 2; i>0; i--){
            const j = Math.floor(Math.random()*(i+1))
            const temp = deck[j]
            deck[j] = deck[i]
            deck[i] = temp
        }
    }
}