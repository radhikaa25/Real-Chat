export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',  // Default security middleware
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': ["'self'", "ws://localhost:1337"],
        },
      },
    },
  },
];
