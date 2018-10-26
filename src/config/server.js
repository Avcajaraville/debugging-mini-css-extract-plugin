import path from 'path';

export const config = {
  // eslint-disable-next-line no-magic-numbers
  port: process.env.PORT || 3000
};

export const indexTemplate = path.join(__dirname, '..', 'index.template.html');

export const codes = {
  ok: 200,
  notFoundError: 404,
  internalError: 500
};

export const env = {
  isProd: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
};
