package main

import (
	// "errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type post struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

var posts []post

func getPosts(context *gin.Context) {
	// context.IndentedJSON(http.StatusOK, posts);
	context.JSON(http.StatusOK, posts)
}

type inputPost struct {
	Title string `json:"title"`
}

func createPost(context *gin.Context) {
	var input inputPost
	if err := context.BindJSON(&input); err != nil {
		fmt.Println(err)
		return
	}

	postId := uuid.New()
	newPost := post{
		ID:    postId.String(),
		Title: input.Title,
	}
	posts = append(posts, newPost)
	context.JSON(http.StatusCreated, newPost)
}

func main() {
	router := gin.Default()
	postsRouter := router.Group("/posts")
	postsRouter.GET("/", getPosts)
	postsRouter.POST("/", createPost)
	router.Run(":4000")
}
