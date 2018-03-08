// B''H //



export default function (sql) {

    // ---------------------------------------------------------
    // .all is express middleware that'll run then pass onto get, put, patch, or delete
    const all = function (req, res, next) {

        // const id = req.params.id;
        const ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);

        ps.prepare('select * from courses where id = @id',
            function (err) {
                ps.execute({
                        id: req.params.id
                    },
                    function (err, result) {
                        if (result.recordset.length === 0) {
                            res.status(404).send('Not Found');
                        } else {
                            req.course = result.recordset[0];
                            next();
                        }

                    });
            });

    };
    // ---------------------------------------------------------



    // ---------------------------------------------------------
    //
    let get = function (req, res) {
        res.send(req.course);
    };
    // ---------------------------------------------------------




    // ---------------------------------------------------------
    // put = UPDATE all fields
    let put = function (req, res) {

        const request = new sql.Request();

        // http://junerockwell.com/difference-parameters-query-strings-express-js/
        request.input('p_id',        sql.Int,          req.params.id);
        request.input('p_title',     sql.VarChar(100), req.body.title);
        request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
        request.input('p_author_id', sql.Int,          req.body.author_id);
        request.input('p_length',    sql.VarChar(50),  req.body.length);
        request.input('p_category',  sql.VarChar(50),  req.body.category);

        request.execute('usp_update_course',
            function (err, result) {

                if (err)
                    res.status(500).send(err);
                else {
                    res.send(result.recordset[0]);
                }

            });

    };
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // patch = UPDATE only fields passed in
    let patch = function (req, res) {

        const request = new sql.Request();

        // http://junerockwell.com/difference-parameters-query-strings-express-js/
        request.input('p_id',        sql.Int,          req.params.id);
        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
        request.input('p_title',     sql.VarChar(100), req.body.title);
        request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
        request.input('p_author_id', sql.Int,          req.body.author_id);
        request.input('p_length',    sql.VarChar(50),  req.body.length);
        request.input('p_category',  sql.VarChar(50),  req.body.category);
        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
        request.input('p_title_update',     sql.Int, req.body.title     ? 1 : 0);
        request.input('p_watch_url_update', sql.Int, req.body.watch_url ? 1 : 0);
        request.input('p_author_id_update', sql.Int, req.body.author_id ? 1 : 0);
        request.input('p_length_update',    sql.Int, req.body.length    ? 1 : 0);
        request.input('p_category_update',  sql.Int, req.body.category  ? 1 : 0);

        request.execute('usp_update_course',
            function (err, result) {

                if (err)
                    res.status(500).send(err);
                else {
                    res.send(result.recordset[0]);
                }

            });

    };
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    //
    let dlt = function (req, res) {

        const ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);

        ps.prepare('delete from courses where id = @id',
            function (err) {
                ps.execute({
                        id: req.params.id
                    },
                    function (err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(204).send('Item deleted');
                        }

                    });
            });

    };
    // ---------------------------------------------------------


    return {
        all   : all,
        get   : get,
        put   : put,
        patch : patch,
        dlt   : dlt
    }

}

