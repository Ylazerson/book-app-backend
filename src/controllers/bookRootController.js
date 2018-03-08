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

            request.input('p_title',     sql.VarChar(50), req.body.title);
            request.input('p_author',    sql.VarChar(50), req.body.author);
            request.input('p_genre',     sql.VarChar(50), req.body.genre);
            request.input('p_read_flag', sql.Int,         req.body.read_flag);

            request.execute('usp_insert_into_books',
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
    // localhost:8000/api/books
    // localhost:8000/api/books?genre=Science%20Fiction
    // localhost:8000/api/books?genre=Fiction
    // localhost:8000/api/books?genre=Fiction&read_flag=0
    // localhost:8000/api/books?genre=Fiction&read_flag=0&author=Jerry%20Mongoose
    // localhost:8000/api/books?read_flag=0
    let get = function (req, res) {

        /*
        const p_author    = req.query.author;
        const p_genre     = req.query.genre;
        const p_read_flag = req.query.read_flag;
        */

        const ps = new sql.PreparedStatement();

        ps.input('p_author',    sql.VarChar(50));
        ps.input('p_genre',     sql.VarChar(50));
        ps.input('p_read_flag', sql.Int);

        ps.prepare('select * from dbo.udf_Get_Books(@p_author, @p_genre, @p_read_flag)',
            function (err) {
                ps.execute({
                        p_author    : req.query.author,
                        p_genre     : req.query.genre,
                        p_read_flag : req.query.read_flag
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

