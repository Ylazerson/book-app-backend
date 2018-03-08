// B''H //



export default function (sql) {

    // ---------------------------------------------------------
    // .all is express middleware that'll run then pass onto get, put, patch, or delete
    const all = function (req, res, next) {

        // const id = req.params.id;
        const ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);

        ps.prepare('select * from books where id = @id',
            function (err) {
                ps.execute({
                        id: req.params.id
                    },
                    function (err, result) {
                        if (result.recordset.length === 0) {
                            res.status(404).send('Not Found');
                        } else {
                            req.book = result.recordset[0];
                            next();
                        }

                    });
            });

    };
    // ---------------------------------------------------------



    // ---------------------------------------------------------
    //
    let get = function (req, res) {
        res.send(req.book);
    };
    // ---------------------------------------------------------




    // ---------------------------------------------------------
    // put = UPDATE all fields
    let put = function (req, res) {

        const request = new sql.Request();

        // http://junerockwell.com/difference-parameters-query-strings-express-js/
        request.input('p_id',        sql.VarChar(50), req.params.id);
        request.input('p_title',     sql.VarChar(50), req.body.title);
        request.input('p_author',    sql.VarChar(50), req.body.author);
        request.input('p_genre',     sql.VarChar(50), req.body.genre);
        request.input('p_read_flag', sql.Int,         req.body.read_flag);

        request.execute('usp_update_book',
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
        request.input('p_id',        sql.VarChar(50), req.params.id);
        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
        request.input('p_title',     sql.VarChar(50), req.body.title);
        request.input('p_author',    sql.VarChar(50), req.body.author);
        request.input('p_genre',     sql.VarChar(50), req.body.genre);
        request.input('p_read_flag', sql.Int,         req.body.read_flag);
        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
        request.input('p_title_update',     sql.Int, req.body.title     ? 1 : 0);
        request.input('p_author_update',    sql.Int, req.body.author    ? 1 : 0);
        request.input('p_genre_update',     sql.Int, req.body.genre     ? 1 : 0);
        request.input('p_read_flag_update', sql.Int, req.body.read_flag ? 1 : 0);

        request.execute('usp_update_book',
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

        ps.prepare('delete from books where id = @id',
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

