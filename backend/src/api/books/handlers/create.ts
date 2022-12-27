/* eslint-disable no-console */
import prisma from "../../../../prisma/client";
import BookController from "../interface";

const createBook: BookController["create"] = async (req, res) => {
  try {
    const { title, published, price, categoryId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const authorId = req.user.id;

    const book = await prisma.book.create({
      data: {
        title,
        published,
        price,
        user: {
          connect: {
            id: authorId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export default createBook;
