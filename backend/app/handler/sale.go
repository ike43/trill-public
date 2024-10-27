package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"trill/store"
)

func GetSalesItemList(c echo.Context) error {

	// パラメータ取得
	uid := c.Param("uid")

	// アイテム情報取得
	items, err := store.GetItemsByCreatorId(uid)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, items)
}

func GetSalesHistory(c echo.Context) error {

	// パラメータ取得
	uid := c.Param("uid")

	// 販売履歴情報取得
	sales, err := store.GetSalesHistory(uid)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, sales)
}
