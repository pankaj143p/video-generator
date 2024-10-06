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
import { boolean, serial, varchar } from "drizzle-orm/pg-core";

const { pgTable } = require("drizzle-orm/pg-core");

export const users = pgTable("users", {
   id: serial('id').primaryKey(),
   name: varchar('name', 200).notNull(),
   email: varchar('email', 200).notNull(),
   password: varchar('password', 200).notNull(),
   imageUrl: varchar('imageUrl', 200),
   subscription: boolean('subscription').$default(false),
});
