// Finite State Machine for a Turnstile

// State types
type Locked = { state: 'Locked' };
type Unlocked = { state: 'Unlocked' };

type Turnstile = Locked | Unlocked;

// Actions
type Action = 'insertCoin' | 'push';

// Transition function
function transition(t: Turnstile, action: Action): Turnstile {
  switch (action) {
    case 'insertCoin':
      if (t.state === 'Unlocked') {
        return t; // Redundant coin, stays unlocked
      }
      return { state: 'Unlocked' };

    case 'push':
      if (t.state === 'Locked') {
        throw new Error('Cannot push through a locked turnstile!');
      }
      return { state: 'Locked' };

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

// Example execution
function runFSM() {
    let machine: Turnstile = { state: 'Locked' };
    console.log(`Initial state: ${machine.state}`);

    machine = transition(machine, 'insertCoin');
    console.log(`After coin: ${machine.state}`);

    machine = transition(machine, 'push');
    console.log(`After push: ${machine.state}`);

    // Uncomment to trigger a formal error
    // machine = transition(machine, 'push'); // ❌ This will throw
}

runFSM();