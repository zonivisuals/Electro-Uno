import { GameEngine } from './gameEngine';
import { Card } from './gameEngine';
import { CardColor } from './gameEngine';

describe('GameEngine', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine(['p1', 'p2', 'p3']);
  });


  test('should initialize game state correctly', () => {
    const state = engine.getCurrentState();

    expect(state.status).toBe('active');

    expect(state.players.length).toBe(3);

    state.players.forEach(player => {
      expect(player.hand.length).toBe(7);
    });
    
    expect(state.discardPile.length).toBe(1);
    
    expect(state.deck.length).toBe(86);
    
    expect(state.currentColor).toBe(state.topCard.color);
  });


  test('should allow valid card play', () => {
    const stateBefore = engine.getCurrentState();
    const currentPlayer = engine.getCurrentPlayer();
    const currentColor = stateBefore.currentColor;

    //non-wild card is valid if its color matches the current color.
    const validCard: Card = {
        id: 'test-valid-card',
        value: '5',
        color: currentColor,
        type: 'number'
    };

    currentPlayer.hand.push(validCard);
    const initialHandLength = currentPlayer.hand.length;

    //play the valid card (for non-wild cardsthe chosenColor parameter is ignored)
    const result = engine.playCard(currentPlayer.address, 'test-valid-card', currentColor);
    expect(result).toBe(true);

    // Check that the card is removed from the player's hand.
    const updatedState = engine.getCurrentState();
    const updatedPlayer = updatedState.players.find(p => p.address === currentPlayer.address)!;
    expect(updatedPlayer.hand.find(c => c.id === 'test-valid-card')).toBeUndefined();

    //verify that the top card has been updated
    expect(updatedState.topCard.id).toBe('test-valid-card');
    //the turn should have advanced to a different player
    expect(updatedState.currentPlayerIndex).not.toBe(stateBefore.currentPlayerIndex);
  });

  test('should not allow invalid card play', () => {
    const currentPlayer = engine.getCurrentPlayer();
    const stateBefore = engine.getCurrentState();

    //create an invalid card that does not match the current color or top card value.
    const invalidColor: CardColor = stateBefore.currentColor === 'red' ? 'blue' : 'red';
    const invalidCard: Card = {
      id: 'test-invalid-card',
      value: '5',
      color: invalidColor,
      type: 'number'
    };

    //if the top card’s value is also 5 change the value to avoid a match
    if (stateBefore.topCard.value === '5') {
      invalidCard.value = 'reverse';
      invalidCard.type = 'action';
    }

    //add the invalid card to the current player's hand.
    currentPlayer.hand.push(invalidCard);

    //attempt to play the invalid card
    const result = engine.playCard(currentPlayer.address, 'test-invalid-card', stateBefore.currentColor);
    expect(result).toBe(false);
  });


  test('should simulate valid draw2 scenarios correctly',()=>{
    const p1 = engine.getCurrentPlayer()
    const state =  engine.getCurrentState()
    const currentColor = state.currentColor
    const draw2Card: Card = {
      id: 'test-draw2-card',
      value: 'draw2',
      color: currentColor,
      type: 'action'
    }
    const nextDraw2Card: Card = {
      id: 'test-nextdraw2-card',
      value: 'draw2',
      color: currentColor,
      type: 'action'
    }
    p1.hand.push(draw2Card)
    const res1 = engine.playCard(p1.address, draw2Card.id)
    
    //same-color draw2
    expect(res1).toBe(true)
    expect(engine.getCurrentState().pendingDraws).toEqual(2)
    
    const p2 = engine.getCurrentPlayer()
    p2.hand.push(nextDraw2Card)
    const res2 = engine.playCard(p2.address, nextDraw2Card.id)

    //same-color draw2 again
    expect(res2).toBe(true)
    expect(engine.getCurrentState().pendingDraws).toEqual(4)
  })

  test("should simulate unvalid draw2 scenarios (force drawing)",()=>{
    const p = engine.getCurrentPlayer()
    const topCard: Card = engine.getCurrentState().topCard
    const discardPile: Card[] = engine.getCurrentState().discardPile
    p.hand = p.hand.filter(c => c.value !== 'draw2' && c.value !== 'wild4')
    engine.increasePendingDrawsBy(2)

    const randomCard = p.hand[0]
    console.log(randomCard)
    const res = engine.playCard(p.address, randomCard.id)

    //draw 2 cards + res = false + discardPile and topCard non changing
    expect(p.hand.length).toBeGreaterThanOrEqual(2)
    expect(res).toBe(false)
    expect(engine.getCurrentState().discardPile.length).toEqual(discardPile.length)
    expect(engine.getCurrentState().topCard).toBe(topCard)
  })

})
/*
  test('should enforce pending draws 2 & 4 correctly', () => {
    //simulate a draw2 card play
    const p1 = engine.getCurrentPlayer();
    const currentState = engine.getCurrentState()
    const currentColor = currentState.currentColor;
    const draw2Card: Card = {
      id: 'test-draw2-card',
      value: 'draw2',
      color: currentColor,
      type: 'action'
    };
    p1.hand.push(draw2Card);

    //p1 plays the draw2 card
    const result1 = engine.playCard(p1.address, 'test-draw2-card', currentColor);
    expect(result1).toBe(true);
    //expect(currentState.pendingDraws).toBe(2);

    // In advanceTurn, the engine should force the next player to draw 2 cards and then reset pendingDraws.
    const stateAfterDraw2 = engine.getCurrentState();
    expect(stateAfterDraw2.pendingDraws).toBe(0);

    //now, test the wild4 scenario using a 2-player game for clarity.
    engine = new GameEngine(['p1', 'p2']);
    const p1_new = engine.getCurrentPlayer();
    const currentColor_new = engine.getCurrentState().currentColor;
    const wild4Card: Card = {
      id: 'test-wild4-card',
      value: 'wild4',
      color: 'wild',
      type: 'wild'
    };
    p1_new.hand.push(wild4Card);
    // p1 plays wild4 with a chosen color (must not be 'wild').
    const resultWild4 = engine.playCard(p1_new.address, 'test-wild4-card', currentColor_new);
    expect(resultWild4).toBe(true);

    // After wild4, the next player should have been forced to draw 4 cards.
    // With 2 players, the forced draw makes p2’s hand: 7 initial + 4 drawn = 11.
    const nextPlayer = engine.getNextPlayer();
    expect(nextPlayer.hand.length).toBe(11);
  });


  test('should apply reverse card effect correctly', () => {
    // Use 3 players so that reversing affects turn order.
    engine = new GameEngine(['p1', 'p2', 'p3']);
    const stateBefore = engine.getCurrentState();
    const p1 = engine.getCurrentPlayer();
    const currentColor = stateBefore.currentColor;
    const reverseCard = {
      id: 'test-reverse-card',
      value: 'reverse',
      color: currentColor,
      type: 'action'
    };
    p1.hand.push(reverseCard);
    const initialDirection = stateBefore.direction;

    // p1 plays the reverse card.
    const result = engine.playCard(p1.address, 'test-reverse-card', currentColor);
    expect(result).toBe(true);

    const stateAfter = engine.getCurrentState();
    // The direction should be flipped.
    expect(stateAfter.direction).toBe(
      initialDirection === 'clockwise' ? 'counter-clockwise' : 'clockwise'
    );
    // In a 3-player game, if p1 was at index 0 and direction becomes counter-clockwise,
    // then the next player (computed via getNextPlayer) should be at index 2.
    if (stateAfter.direction === 'counter-clockwise') {
      expect(stateAfter.currentPlayerIndex).toBe(2);
    } else {
      expect(stateAfter.currentPlayerIndex).toBe(1);
    }
  });


  test('should apply skip card effect correctly', () => {
    // Use 3 players so the skip effect is visible.
    engine = new GameEngine(['p1', 'p2', 'p3']);
    const stateBefore = engine.getCurrentState();
    const p1 = engine.getCurrentPlayer();
    const currentColor = stateBefore.currentColor;
    const skipCard = {
      id: 'test-skip-card',
      value: 'skip',
      color: currentColor,
      type: 'action'
    };
    p1.hand.push(skipCard);

    // p1 plays the skip card.
    const result = engine.playCard(p1.address, 'test-skip-card', currentColor);
    expect(result).toBe(true);

    const stateAfter = engine.getCurrentState();
    // The skip card triggers an extra turn advance.
    // For example, if p1 was at index 0, then normally the next turn would be index 1,
    // but with skip it should become index 2.
    expect(stateAfter.currentPlayerIndex).toBe(2);
  });

  test('should apply wild and wild4 card effects correctly', () => {
    // Test wild card: it should require a valid chosen color.
    engine = new GameEngine(['p1', 'p2']);
    const p1 = engine.getCurrentPlayer();
    const wildCard = {
      id: 'test-wild-card',
      value: 'wild',
      color: 'wild',
      type: 'wild'
    };
    p1.hand.push(wildCard);

    // Playing a wild card with an invalid chosen color ("wild") should throw an error.
    expect(() => {
      engine.playCard(p1.address, 'test-wild-card', 'wild');
    }).toThrow('Must choose valid color');

    // Now add another wild card and play it with a valid chosen color.
    const wildCard2 = {
      id: 'test-wild-card-2',
      value: 'wild',
      color: 'wild',
      type: 'wild'
    };
    p1.hand.push(wildCard2);
    const validChosenColor: CardColor = 'blue';
    const result = engine.playCard(p1.address, 'test-wild-card-2', validChosenColor);
    expect(result).toBe(true);
    const stateAfterWild = engine.getCurrentState();
    expect(stateAfterWild.currentColor).toBe(validChosenColor);

    // Test wild4 card: it should set the color and add 4 to pending draws.
    engine = new GameEngine(['p1', 'p2']);
    const p1_new = engine.getCurrentPlayer();
    const wild4Card = {
      id: 'test-wild4-card',
      value: 'wild4',
      color: 'wild',
      type: 'wild'
    };
    p1_new.hand.push(wild4Card);
    const chosenColor: CardColor = 'green';
    const resultWild4 = engine.playCard(p1_new.address, 'test-wild4-card', chosenColor);
    expect(resultWild4).toBe(true);
    const stateAfterWild4 = engine.getCurrentState();
    // In a 2-player game, after a wild4 the opponent should have drawn 4 cards.
    const nextPlayer = engine.getNextPlayer();
    expect(nextPlayer.hand.length).toBe(11); // 7 initial + 4 drawn
    expect(stateAfterWild4.currentColor).toBe(chosenColor);
  });

  test('should allow drawing cards if it is the player’s turn and no pending draws exist', () => {
    engine = new GameEngine(['p1', 'p2']);
    const currentPlayer = engine.getCurrentPlayer();
    const initialHandLength = currentPlayer.hand.length;

    // The current player draws 2 cards.
    const drawnCards = engine.drawCards(currentPlayer.address, 2);
    expect(drawnCards.length).toBe(2);

    const stateAfter = engine.getCurrentState();
    const updatedPlayer = stateAfter.players.find(p => p.address === currentPlayer.address)!;
    expect(updatedPlayer.hand.length).toBe(initialHandLength + 2);
  });

  test("should not allow drawing cards if it's not the player's turn or if pending draws exist", () => {
    engine = new GameEngine(['p1', 'p2']);

    // p2 is not the current player.
    const state = engine.getCurrentState();
    const p2 = state.players.find(p => p.address === 'p2')!;
    const drawnCardsWrongTurn = engine.drawCards(p2.address, 1);
    expect(drawnCardsWrongTurn.length).toBe(0);

    // Now, simulate a pending-draw situation by having p1 play a draw2 card.
    const p1 = engine.getCurrentPlayer();
    const currentColor = engine.getCurrentState().currentColor;
    const draw2Card = {
      id: 'test-draw2-card-2',
      value: 'draw2',
      color: currentColor,
      type: 'action'
    };
    p1.hand.push(draw2Card);
    engine.playCard(p1.address, 'test-draw2-card-2', currentColor);

    // Even if it were the affected player's turn, drawCards should return an empty array
    // because forced draws occur automatically.
    const nextPlayer = engine.getNextPlayer();
    const drawnCardsPending = engine.drawCards(nextPlayer.address, 1);
    expect(drawnCardsPending.length).toBe(0);
  });

  test('should check win condition correctly', () => {
    engine = new GameEngine(['p1', 'p2']);
    const p1 = engine.getCurrentPlayer();

    // Remove all cards from p1's hand to simulate a win.
    p1.hand.splice(0, p1.hand.length);
    expect(engine.checkWinCondition(p1.address)).toBe(true);
  });

  test('getCurrentState should return a cloned state', () => {
    const state1 = engine.getCurrentState();

    // Mutate the returned state arrays.
    state1.deck.pop();
    state1.discardPile.pop();
    state1.players[0].hand.pop();

    const state2 = engine.getCurrentState();

    // The engine’s internal state should not have been affected by mutations to state1.
    expect(state2.deck.length).not.toBe(state1.deck.length);
    expect(state2.discardPile.length).not.toBe(state1.discardPile.length);
    expect(state2.players[0].hand.length).not.toBe(state1.players[0].hand.length);
  });
});

*/