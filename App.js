import App from './index';
import Sentry from 'sentry-expo';
Sentry.enableInExpoDevelopment = false

Sentry.config('https://47f30c7c90ce47aa840d4002a316edd1@sentry.io/1292194').install();
export default App;
