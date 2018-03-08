-- B''H --


USE [Books]
GO


IF OBJECT_ID('dbo.udf_Get_Books', 'IF') IS NOT NULL DROP FUNCTION dbo.udf_Get_Books;
GO


-- -------------------------------------------------------------------------------------------------------
/*
select   *
from     dbo.udf_Get_Books('Jack Smaller', null, null)
order by id

select   *
from     dbo.udf_Get_Books('Jack Smaller', 'Fiction', null)
order by id

select   *
from     dbo.udf_Get_Books(null, 'Fiction', null)
order by id

select   *
from     dbo.udf_Get_Books(null, null, 1)
order by id
*/
-- -------------------------------------------------------------------------------------------------------


CREATE FUNCTION dbo.udf_Get_Books 
    (     
     @p_author     varchar(50),
     @p_genre      varchar(50),
     @p_read_flag  int
	) RETURNS TABLE
AS
RETURN

  
    SELECT   [id],
             [title],
             [author],
             [genre],
             [read_flag]
    FROM     [dbo].[books]
	WHERE    [author]    = isnull(@p_author,    [author])
	  and    [genre]     = isnull(@p_genre,     [genre])
	  and    [read_flag] = isnull(@p_read_flag, [read_flag])


GO