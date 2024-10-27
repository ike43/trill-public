package router

import (
	"github.com/labstack/echo/v4"

	"trill/handler"
	"trill/middleware"
)

func SetRouting(e *echo.Echo) {

	// 静的ファイルのルーティング設定
	e.Static("/images", "../public/images")

	// APIのルーティング設定
	version := "v1"
	prefix := "/api/" + version
	g := e.Group(prefix)
	g.POST("/login", handler.Login)
	g.POST("/logout", handler.Logout, middleware.Auth)
	g.GET("/items", handler.GetItemList)
	g.GET("/items/:iid", handler.GetItem)
	g.POST("/items", handler.AddItem, middleware.Auth)
	g.PUT("/items/:iid", handler.UpdateItem, middleware.Auth)
	g.DELETE("/items/:iid", handler.DeleteItem, middleware.Auth)
	g.GET("/cart-items", handler.GetCartItem)
	g.POST("/cart-items", handler.AddCartItem)
	g.DELETE("/cart-items/:iid", handler.DeleteCartItem)
	g.GET("/users/:uid/sale/items", handler.GetSalesItemList, middleware.AuthOnlySelf)
	g.GET("/users/:uid/sale/history", handler.GetSalesHistory, middleware.AuthOnlySelf)
	g.GET("/users/:uid/purchase/items", handler.GetPurchasedItemList, middleware.AuthOnlySelf)
	g.POST("/users/:uid/purchase/items", handler.AddPurchase, middleware.AuthOnlySelf)
	g.GET("/users/:uid/purchase/history", handler.GetPurchaseHistory)
	g.GET("/categories", handler.GetCategoryList)
}
