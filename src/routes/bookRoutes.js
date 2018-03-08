// B''H //


import express from 'express';
import bookIdControllers from '../controllers/bookIdController';
import bookRootControllers from '../controllers/bookRootController';

export default function (sql) {

    const bookRouter = express.Router();
    const bookRootController = bookRootControllers(sql);
    const bookIdController   = bookIdControllers(sql);


    // -- ----------------------------------------------------------------------------
    // Install ExtensionJSONView Chrome plugin to see the JSON nicely
    // Install Postman REST Client chrome plugin - Actually now a Chrome App
    bookRouter.route('/')
        .post(bookRootController.post)
        .get(bookRootController.get);
    // -- ----------------------------------------------------------------------------


    // -- ----------------------------------------------------------------------------
    // USE URL: http://localhost:8000/api/books/3
    bookRouter.route('/:id')
        .all(bookIdController.all)
        .get(bookIdController.get)
        .put(bookIdController.put)
        .patch(bookIdController.patch)
        .delete(bookIdController.dlt);
    // -- ----------------------------------------------------------------------------

    return bookRouter;
}

