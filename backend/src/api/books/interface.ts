/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "@prisma/client";
import { Controller } from "../../../types/handlers";

interface BookController extends Controller<Book> {}

export default BookController;
