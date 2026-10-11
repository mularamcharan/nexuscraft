import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const databasePath = path.join(process.cwd(), "database", "nexuscraft.sqlite");

mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);
database.exec("PRAGMA busy_timeout = 10000");
database.exec("PRAGMA foreign_keys = ON");
database.exec("PRAGMA journal_mode = WAL");
database.exec(
  readFileSync(path.join(process.cwd(), "database/migrations/001-initial.sql"), "utf8")
);
database.exec(
  readFileSync(path.join(process.cwd(), "database/seeds/001-sample-projects.sql"), "utf8")
);

export { database };
