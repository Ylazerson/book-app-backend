// B''H //


import express from 'express';
import authorRootControllers from '../controllers/authorRootController';

export default function (sql) {

    const authorRouter         = express.Router();
    const authorRootController = authorRootControllers(sql);


    // -- ----------------------------------------------------------------------------
    authorRouter.route('/')
        .get(authorRootController.get);
    // -- ----------------------------------------------------------------------------


    return authorRouter;
}

