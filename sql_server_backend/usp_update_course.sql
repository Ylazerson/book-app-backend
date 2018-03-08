-- B''H --


drop procedure dbo.usp_update_course
go

USE [Books]
GO


-- ---------------------------------------------------------------------------------------------------------------
/*
EXEC [dbo].[usp_update_course] 
    @p_id               = 1,
    @p_title            = 'JavaScript React',
    @p_watch_url        = 'google.com',
    @p_author_id        = 2,
    @p_length           = null,
    @p_category         = null,
	-- -------------------------------
    @p_length_update    = 0,
    @p_category_update  = 0


EXEC [dbo].[usp_update_course] 
    @p_id               = 1,
    @p_title            = 'JavaScript React',
    @p_watch_url        = null,
    @p_author_id        = 1,
    @p_length           = '18:09',
    @p_category         = null,
	-- -------------------------------    
    @p_category_update  = 0

*/
-- ---------------------------------------------------------------------------------------------------------------


create procedure dbo.usp_update_course
    @p_id               int,
    @p_title            varchar(100),
    @p_watch_url        varchar(200),
    @p_author_id        int,
    @p_length           varchar(50),
    @p_category         varchar(50),
	-- -------------------------------
    @p_title_update     int = 1,
    @p_watch_url_update int = 1,
    @p_author_id_update int = 1,
    @p_length_update    int = 1,
    @p_category_update  int = 1
as
begin

	-- --------------------------------------------------------------
	update  [dbo].[courses]
	   set  [title]         = case when @p_title_update     = 1 then @p_title     else [title]     end,
            [watch_url]     = case when @p_watch_url_update = 1 then @p_watch_url else [watch_url] end,
            [author_id]     = case when @p_author_id_update = 1 then @p_author_id else [author_id] end,
            [length]        = case when @p_length_update    = 1 then @p_length    else [length]    end,
            [category]      = case when @p_category_update  = 1 then @p_category  else [category]  end,
            [modified_date] = getdate()
    where   [id]            = @p_id;
    -- --------------------------------------------------------------


	-- --------------------------------------------------------------
    select  * 
    from    [dbo].[courses]
	where   [id] = @p_id;
	-- --------------------------------------------------------------


end

GO

    