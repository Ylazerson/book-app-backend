// B''H //


export default function (sql) {


    // ---------------------------------------------------------
    // localhost:8000/api/authors
    // localhost:8000/api/authors?first_name=Rick
    let get = function (req, res) {

        const ps = new sql.PreparedStatement();

        ps.input('p_first_name', sql.VarChar(100));
        ps.input('p_last_name', sql.VarChar(100));

        ps.prepare('select * from dbo.udf_get_authors(@p_first_name, @p_last_name)',
            function (err) {
                ps.execute({
                        p_first_name: req.query.first_name,
                        p_last_name : req.query.last_name
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
        get: get
    }

}

