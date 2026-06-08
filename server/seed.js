import "dotenv/config";
import { initializeDatabase } from "./db.js";

initializeDatabase();
console.log("PetGlobal database ready.");
