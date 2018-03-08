-- B''H --


USE [Books]
GO


IF OBJECT_ID('dbo.udf_get_courses', 'IF') IS NOT NULL DROP FUNCTION dbo.udf_get_courses;
GO


-- -------------------------------------------------------------------------------------------------------
/*
select   *
from     dbo.udf_get_courses('Building Horses', null, null)
order by id

select   *
from     dbo.udf_get_courses(null, 1, null)
order by id

select   *
from     dbo.udf_get_courses(null, 1, 'JavaScript')
order by id
*/
-- -------------------------------------------------------------------------------------------------------


CREATE FUNCTION dbo.udf_get_courses 
    (     
     @p_title      varchar(100),
	 @p_author_id  int,
     @p_category   varchar(50)    
	) RETURNS TABLE
AS
RETURN

    SELECT   [id],
             [title],
             [watch_url],
             [author_id],
             [length],
             [category]
    FROM     [dbo].[courses]
	WHERE    [title]     = isnull(@p_title,     [title])
	  and    [author_id] = isnull(@p_author_id, [author_id])
	  and    [category]  = isnull(@p_category,  [category])	  

GO