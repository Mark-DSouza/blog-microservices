package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type post struct {
	PostId string `json:"postId"`
	Title  string `json:"title"`
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

	postId := uuid.New().String()
	newPost := post{
		PostId: postId,
		Title:  input.Title,
	}
	posts = append(posts, newPost)
	context.JSON(http.StatusCreated, newPost)
}

func main() {
	posts = make([]post, 0)

	router := gin.Default()
	router.Use(cors.Default())

	postsRouter := router.Group("/posts")
	postsRouter.GET("", getPosts)
	postsRouter.POST("", createPost)

	router.Run(":4000")
}
