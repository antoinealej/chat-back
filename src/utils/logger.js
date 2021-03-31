import winston from 'winston';
import configs from '../configs';

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      level: configs.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});
