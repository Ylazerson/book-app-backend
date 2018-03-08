-- B''H --


USE [Books]
GO





CREATE TABLE [dbo].[authors](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](100) NOT NULL,
	[last_name] [varchar](100) NOT NULL,
	[modified_date] [datetime] NULL,
 CONSTRAINT [PK_authors] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
/****** Object:  Table [dbo].[books]    Script Date: 10/19/2017 3:21:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[books](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NULL,
	[author] [varchar](50) NULL,
	[genre] [varchar](50) NULL,
	[read_flag] [int] NULL
)
GO
/****** Object:  Table [dbo].[courses]    Script Date: 10/19/2017 3:21:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[courses](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](100) NOT NULL,
	[watch_url] [varchar](200) NULL,
	[author_id] [int] NULL,
	[length] [varchar](50) NULL,
	[category] [varchar](50) NULL,
	[modified_date] [datetime] NOT NULL,
 CONSTRAINT [PK_courses] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
SET IDENTITY_INSERT [dbo].[authors] ON 
GO
INSERT [dbo].[authors] ([id], [first_name], [last_name], [modified_date]) VALUES (1, N'Jack', N'Mooski', CAST(N'2017-07-17T19:29:50.130' AS DateTime))
GO
INSERT [dbo].[authors] ([id], [first_name], [last_name], [modified_date]) VALUES (2, N'Bill', N'Hooligan', CAST(N'2017-07-17T19:30:09.550' AS DateTime))
GO
INSERT [dbo].[authors] ([id], [first_name], [last_name], [modified_date]) VALUES (3, N'Rick', N'Dumana', CAST(N'2017-07-17T19:30:16.287' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[authors] OFF
GO
SET IDENTITY_INSERT [dbo].[books] ON 
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (1, N'Big Man', N'Jason Taller', N'Fiction', 0)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (2, N'Small Man Story', N'Jack Smaller', N'Fiction', 1)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (3, N'Looner Man', N'Jack Smaller', N'Non Fiction', 0)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (4, N'The Long Tale', N'Jerry Mongoose', N'Fiction', 0)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (5, N'The Long Tale', N'Jerry Mongoose', N'Fiction', 0)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (6, N'The Cooooooook', N'Jon Doools', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (10, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (11, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (12, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (13, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (15, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (16, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (17, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (7, N'The WankSander', NULL, N'Fiction', 1)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (9, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
INSERT [dbo].[books] ([id], [title], [author], [genre], [read_flag]) VALUES (14, N'The New Crekker', N'Jon D Hooliganer', N'Science Fiction', NULL)
GO
SET IDENTITY_INSERT [dbo].[books] OFF
GO
SET IDENTITY_INSERT [dbo].[courses] ON 
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (1, N'JavaScript React', NULL, 1, N'18:09', N'JavaScript', CAST(N'2017-07-17T20:13:51.043' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (2, N'Clean Code: Writing Code for Humans', N'http://www.pluralsight.com/courses/writing-clean-code-humans', 1, N'35:10', N'OK Practices', CAST(N'2017-07-17T21:11:48.833' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (4, N'The Long Tale', N'google.com', 3, N'6:08', N'Torah', CAST(N'2017-07-17T20:33:52.090' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (5, N'Writing Code for Moshiach ', N'google.com', 2, N'35:10', N'Software Decent Practices', CAST(N'2017-07-21T19:58:52.583' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (6, N'Writing Code for Dogs', N'google.com', 2, N'35:10', N'Software Decent Practices', CAST(N'2017-07-17T21:11:59.320' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (7, N'Koooona Matataasasssd', N'', 1, N'16:08', N'Cooking', CAST(N'2017-07-21T16:25:35.897' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (8, N'Cornball to the office', N'', 2, N'14:05', N'Fiction', CAST(N'2017-07-21T21:48:14.403' AS DateTime))
GO
INSERT [dbo].[courses] ([id], [title], [watch_url], [author_id], [length], [category], [modified_date]) VALUES (9, N'Cooooolio Mon Yepppp', N'', 1, N'5:08', N'Nothing', CAST(N'2017-10-02T00:28:50.430' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[courses] OFF
GO
ALTER TABLE [dbo].[courses]  WITH CHECK ADD  CONSTRAINT [FK_courses_authors] FOREIGN KEY([author_id])
REFERENCES [dbo].[authors] ([id])
GO
ALTER TABLE [dbo].[courses] CHECK CONSTRAINT [FK_courses_authors]
GO
