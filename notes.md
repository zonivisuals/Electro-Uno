to implement in gameEngine module:
    ...
done: 
    - initializeGame(players)
    - playCard(player@, cardId, chosenColor)
    - shuffleDeck(deck)
    - isValidPlay(card)
    - drawCards(player@, count)
    - handleSpecialCards(card, chosenColor)
    - isTurn(player)
    - shuffleDeck(deck)
    - reshuffleDiscardPile()
    - forceDrawCards(player, count)
    - generateDeck()
    - advanceTurn()
    - handleSpecialCard(card, chosenColor)
    - getCurrentState()
    - getCurrentPlayer()
    - getNextPlayer()
    - checkWinCondition(player@)

types of cards:
    - number
    - action:
        . skip
        . reverse
        . draw2
    -wild:
        . wild
        . wild4
