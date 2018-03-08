-- B''H --






USE [Books]
GO


-- ---------------------------------------------------------------------------------------------------------------
/*
EXEC [dbo].[usp_update_book] 
    @p_id         = 7,	
    @p_title      = 'The Hooongie Doongie',
	@p_author     =  null,    
	@p_genre      = 'Comedy',	    
	@p_read_flag  = 1


EXEC [dbo].[usp_update_book] 
    @p_id           = 7,	
    @p_title        = null,
	@p_author       = 'Jooon Man',    
	@p_genre        = 'Comedy Classics',	
	@p_read_flag    = 0,    
	@p_title_update = 0
*/
-- ---------------------------------------------------------------------------------------------------------------


create procedure dbo.usp_update_book
    @p_id               int,	
    @p_title            varchar(50),	    
	@p_author           varchar(50),	    
	@p_genre            varchar(50),	    
	@p_read_flag        int,
	-- -------------------------------
	@p_title_update     int = 1,
	@p_author_update    int = 1,
	@p_genre_update     int = 1,
	@p_read_flag_update int = 1
as
begin

	-- --------------------------------------------------------------
	update  [dbo].[books]
	   set  [title]     = case when @p_title_update     = 1 then @p_title     else [title]     end,
            [author]    = case when @p_author_update    = 1 then @p_author    else [author]    end,
            [genre]     = case when @p_genre_update     = 1 then @p_genre     else [genre]     end,
            [read_flag] = case when @p_read_flag_update = 1 then @p_read_flag else [read_flag] end
    where   [id]        = @p_id;
    -- --------------------------------------------------------------


	-- --------------------------------------------------------------
    select  * 
    from    [dbo].[books]
	where   [id] = @p_id;
	-- --------------------------------------------------------------


end

GO

    