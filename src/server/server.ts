import app from './app';
import CONFIG from './shared/config';

const PORT = process.env.PORT || CONFIG.port;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
