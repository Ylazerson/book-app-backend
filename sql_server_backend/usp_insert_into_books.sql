-- B''H --






USE [Books]
GO


-- ---------------------------------------------------------------------------------------------------------------
-- EXEC [dbo].[usp_insert_into_books] 'The Long Tale', 'Jerry Mongoose', 'Fiction', 0
-- ---------------------------------------------------------------------------------------------------------------


create procedure dbo.usp_insert_into_books
    @p_title      varchar(50),
    @p_author     varchar(50),
    @p_genre      varchar(50),
    @p_read_flag  int
as
begin

    declare @inserted_data table 
    (
    [id]         [int],
    [title]      [varchar](50),
    [author]     [varchar](50),
    [genre]      [varchar](50),
    [read_flag]  [int]
    );

    insert into [dbo].[books]
           (
            [title],
            [author],
            [genre],
            [read_flag]
           )
    output inserted.id,
           inserted.title,
           inserted.author,
           inserted.genre,
           inserted.read_flag
    into   @inserted_data      
    values
           (
            @p_title,
            @p_author,
            @p_genre,
            @p_read_flag
           );


    select  * 
    from     @inserted_data

end

GO

    