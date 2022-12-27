/* eslint-disable no-console */
import BookController from "../interface";
import prisma from "../../../../prisma/client";

const deleteBook: BookController["delete"] = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: `Book: ${deletedBook.title} deleted successfully ` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default deleteBook;
