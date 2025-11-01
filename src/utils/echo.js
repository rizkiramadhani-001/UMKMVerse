import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'cpcjylkqykmpqjnhuj4s', // match REVERB_APP_KEY
  wsHost: 'localhost',
  wsPort: 8080,
  forceTLS: false,
});

export default echo;
