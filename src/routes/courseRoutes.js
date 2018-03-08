// B''H //


import express from 'express';
import courseIdControllers from '../controllers/courseIdController';
import courseRootControllers from '../controllers/courseRootController';

export default function (sql) {

    const courseRouter         = express.Router();
    const courseRootController = courseRootControllers(sql);
    const courseIdController   = courseIdControllers(sql);


    // -- ----------------------------------------------------------------------------
    // Install ExtensionJSONView Chrome plugin to see the JSON nicely
    // Install Postman REST Client chrome plugin - Actually now a Chrome App
    courseRouter.route('/')
        .post(courseRootController.post)
        .get(courseRootController.get);
    // -- ----------------------------------------------------------------------------


    // -- ----------------------------------------------------------------------------
    // USE URL: http://localhost:8000/api/courses/3
    courseRouter.route('/:id')
        .all(courseIdController.all)
        .get(courseIdController.get)
        .put(courseIdController.put)
        .patch(courseIdController.patch)
        .delete(courseIdController.dlt);
    // -- ----------------------------------------------------------------------------

    return courseRouter;
}

