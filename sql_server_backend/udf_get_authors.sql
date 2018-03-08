-- B''H --


USE [Books]
GO


IF OBJECT_ID('dbo.udf_get_authors', 'IF') IS NOT NULL DROP FUNCTION dbo.udf_get_authors;
GO


-- -------------------------------------------------------------------------------------------------------
/*
select   *
from     dbo.udf_get_authors(null, null)
order by id

select   *
from     dbo.udf_get_authors(null, 'Mooski')
order by id

select   *
from     dbo.udf_get_authors('Jack', null)
order by id
*/
-- -------------------------------------------------------------------------------------------------------


CREATE FUNCTION dbo.udf_get_authors 
    (     
     @p_first_name  varchar(100),	 
     @p_last_name   varchar(100)    
	) RETURNS TABLE
AS
RETURN

    SELECT   [id],
             [first_name],
             [last_name]      
    FROM     [dbo].[authors]
	WHERE    [first_name] = isnull(@p_first_name, [first_name])	  
	  and    [last_name]  = isnull(@p_last_name,  [last_name])	 


GO