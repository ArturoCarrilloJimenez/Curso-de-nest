export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoAppName: process.env.MONGODB_APPNAME,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
});
