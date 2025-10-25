/**
 * Different states for the game, this decides what the game will run every tick,
 * this is JavaScripts sorry excuse for an Enum.
 *
 * Also for consistency, when adding new states to the "Enum" please keep them
 * in order of how they occur.
 */
const GAME_STATES = Object.freeze({
  PRE_START: Symbol("pre-start"),
  X_AXIS: Symbol("x-axis"),
  Y_AXIS: Symbol("y-axis"),
  POST_GUESS: Symbol("post-guess")
});

/**
 * List of games states in order, used to increment and change state.
 *
 * @see FreeToBook.#switchState
 */
const STATES = [
  GAME_STATES.PRE_START,
  GAME_STATES.X_AXIS,
  GAME_STATES.Y_AXIS,
  GAME_STATES.POST_GUESS
];

/** IDs used in the component, saves me fuging up spelling, once again sorry excuse for an enum. */
const IDS = Object.freeze({
  BODY: 'free-to-book-body'
});

/** ASCII character code for space */
const SPACE = 32;

/** Tick rate for the game, decides at what speed we the entire game runs */
const TICK_RATE = 100;

/** px for the plane to move every tick */
const PLANE_SPEED = 100;

class FreeToBook extends HTMLElement {
  #ticker;

  #state = GAME_STATES.PRE_START;

  #stateCounter = 0;

  constructor() {
    super();
  }

  /** Called each time the element is removed from the document. */
  disconnectedCallback() {
    clearInterval(this.#ticker)
  }

  /**
   * Called each time the element is added to the document. The specification recommends that,
   * as far as possible, developers should implement custom element setup in this callback rather
   * than the constructor.
   */
  connectedCallback() {
    this.#render();
  }


  /**
   * Called on every tick after `render()`, needs to be tracked using `#ticker` and should be cleaned
   * on disconnecting callback.
   *
   * @see TICK_RATE
   */
  #onTick() {
    switch (this.#state) {
      case GAME_STATES.PRE_START: {
        console.log('pre-start');
        break;
      }

      case GAME_STATES.X_AXIS: {
        console.log('x-axis');
        break;
      }

      case GAME_STATES.Y_AXIS: {
        console.log('y-axis');
        break;
      }

      case GAME_STATES.POST_GUESS: {
        console.log('post-guess');
        break;
      }
    }
  }

  #switchState() {
    this.#stateCounter++;
    this.#state = STATES[this.#stateCounter % (STATES.length)];

    switch (this.#state) {
      case GAME_STATES.PRE_START: {
        console.log('pre-start');
        break;
      }

      case GAME_STATES.X_AXIS: {
        console.log('x-axis');
        break;
      }

      case GAME_STATES.Y_AXIS: {
        console.log('y-axis');
        break;
      }

      case GAME_STATES.POST_GUESS: {
        console.log('post-guess');
        break;
      }
    }
  }

  /** Initially render the component and setup listeners */
  #render() {
    this.#ticker = setInterval(() => this.#onTick(), TICK_RATE);

    addEventListener('keydown', e => {
      if (e.keyCode === SPACE) {
        this.#switchState()
      }
    });

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        :host {
          background: grey
        }
        .map {
          width: 100%;
        }
      </style>
      <div id=${IDS.BODY}>
        <img src='/assets/map.png' class='map'>
      </div>
    `;
  }
}

customElements.define('free-to-book', FreeToBook);
