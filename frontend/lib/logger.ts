import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: { target: 'pino-pretty', options: { colorize: true } }, // Pretty in dev
});

export default logger;