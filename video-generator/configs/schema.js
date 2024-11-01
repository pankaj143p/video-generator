// import { boolean, serial, varchar } from "drizzle-orm/mysql-core";

// const { pgTable } = require("drizzle-orm/pg-core");

// export const users=pgTable("users", {
//    id:serial('id').primaryKey(),
//    name: varchar('name',200).notNull(),
//    email: varchar('email',200).notNull(),
//    password: varchar('password',200).notNull(),
//    imageUrl:varchar('imageUrl',200),
//    subscription:boolean('subscription').$default(false),
// })
import { pgTable, boolean, serial, varchar } from "drizzle-orm/pg-core";

// const { pgTable } = require("drizzle-orm/pg-core");

export const Users = pgTable("users", {
   id: serial('id').primaryKey(),
   name: varchar('name', 200).notNull(),
   email: varchar('email', 200).notNull(),
   imageUrl: varchar('imageUrl', 200),
   subscription: boolean('subscription').default(false),
});

export const VideoData = pgTable("videoData", {
   id: serial('id').primaryKey(),
   script: varchar('script', 200).notNull(),
   audioFileUrl: varchar('audioFileUrl', 200).notNull(),
   caption: varchar('caption', 200).notNull(),
   imageList : varchar('imageList', 200).array(),
   createdBy: varchar('createdBy', 200).notNull(),
});
