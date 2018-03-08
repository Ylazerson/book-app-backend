-- B''H --


USE [Books]
GO



drop procedure dbo.usp_insert_into_courses
go




-- ---------------------------------------------------------------------------------------------------------------
-- EXEC [dbo].[usp_insert_into_courses] 'The Long Tale', 'google.com', 3, '6:08', 'Torah'
-- ---------------------------------------------------------------------------------------------------------------


create procedure dbo.usp_insert_into_courses
    @p_title            varchar(100),
    @p_watch_url        varchar(200),
    @p_author_id        int,
    @p_length           varchar(50),
    @p_category         varchar(50)
as
begin

    declare @inserted_data table 
    (
    [id]         [int],
	[title]      [varchar](100),
	[watch_url]  [varchar](200),
	[author_id]  [int],
	[length]     [varchar](50),
	[category]   [varchar](50)
    );

    insert into [dbo].[courses]
           (
	       [title],
           [watch_url],
       	   [author_id],
	       [length],
	       [category],
		   [modified_date]
           )
    output inserted.[id],
           inserted.[title],
           inserted.[watch_url],
           inserted.[author_id],
           inserted.[length],
		   inserted.[category]
    into   @inserted_data      
    values
           (
           @p_title,
           @p_watch_url,
           @p_author_id,
           @p_length,
           @p_category,
		   getdate()
           );


    select  * 
    from     @inserted_data

end

GO

    