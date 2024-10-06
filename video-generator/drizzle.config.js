import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./configs/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://videodb_owner:nmZD59NxqOMk@ep-square-hall-a5ypin4p.us-east-2.aws.neon.tech/ai-video-generator?sslmode=require'
  }
})