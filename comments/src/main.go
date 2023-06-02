package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type comment struct {
	CommentId string `json:"commentId"`
	Content   string `json:"content"`
}

var commentsByPostId map[string]([]comment)

func getCommentsByPost(context *gin.Context) {
	postId := context.Param("id")

	comments, ok := commentsByPostId[postId]
	if !ok {
		// comments return an empty array as a response
		comments = make([]comment, 0)
	}

	context.JSON(http.StatusOK, comments)
}

type inputComment struct {
	Content string `json:"content"`
}

func createCommentForPost(context *gin.Context) {
	var input inputComment
	if err := context.BindJSON(&input); err != nil {
		fmt.Println(err)
		return
	}

	postId := context.Param("id")

	comments := commentsByPostId[postId]

	commentsByPostId[postId] = append(comments, comment{
		CommentId: uuid.New().String(),
		Content:   input.Content,
	})

	context.JSON(http.StatusCreated, commentsByPostId[postId])
}

func main() {
	commentsByPostId = make(map[string]([]comment))

	router := gin.Default()
	router.Use(cors.Default())
	commentsRouter := router.Group("/posts/:id/comments")
	commentsRouter.GET("", getCommentsByPost)
	commentsRouter.POST("", createCommentForPost)
	router.Run(":4001")
}
