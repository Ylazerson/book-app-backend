// B''H //


export default function (sql) {

    // ---------------------------------------------------------
    const post = function (req, res) {


        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {

            const request = new sql.Request();

            request.input('p_title', sql.VarChar(100), req.body.title);
            request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
            request.input('p_author_id', sql.Int, req.body.author_id);
            request.input('p_length', sql.VarChar(50), req.body.length);
            request.input('p_category', sql.VarChar(50), req.body.category);

            request.execute('usp_insert_into_courses',
                function (err, result) {

                    // console.log(result);

                    if (err)
                        res.status(500).send(err);
                    else {
                        res.status(201);
                        res.send(result.recordset);
                    }

                });

        }

    };
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // http://junerockwell.com/difference-parameters-query-strings-express-js/
    //
    // localhost:8000/api/courses
    // localhost:8000/api/courses?category=Science%20Fiction
    let get = function (req, res) {

        const ps = new sql.PreparedStatement();

        ps.input('p_title',     sql.VarChar(100));
        ps.input('p_author_id', sql.Int);
        ps.input('p_category',  sql.VarChar(50));

        ps.prepare('select * from dbo.udf_get_courses(@p_title, @p_author_id, @p_category)',
            function (err) {
                ps.execute({
                        p_title    : req.query.title,
                        p_author_id: req.query.author_id,
                        p_category : req.query.category
                    },
                    function (err, result) {
                        if (err)
                            res.status(500).send(err);
                        else {
                            res.send(result.recordset);
                        }

                    });
            });


    };
    // ---------------------------------------------------------

    return {
        post: post,
        get : get
    }

}

