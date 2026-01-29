import { defineConfig } from '@prisma/config';

export default defineConfig({
  // Ici, on met juste le chemin sous forme de texte
  schema: 'prisma/schema.prisma',
  
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
