package handler

import (
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"trill/store"
)

func AddPurchase(c echo.Context) error {

	// パラメータ取得
	uid := c.Param("uid")

	// セッション取得
	sess, _ := session.Get("session", c)

	// カート情報有無確認
	if sess.Values["cart"] == nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	// カート情報取得
	cart := sess.Values["cart"].([]string)
	ids := make([]string, len(cart))
	copy(ids, cart)

	// カート内アイテム数確認
	if len(cart) == 0 {
		return c.NoContent(http.StatusInternalServerError)
	}

	// 購入情報登録
	err := store.AddPurchase(uid, ids)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	// カートリセット
	sess.Values["cart"] = nil
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusNoContent)
}

func GetPurchasedItemList(c echo.Context) error {

	// パラメータ取得
	uid := c.Param("uid")

	// アイテム情報取得
	items, err := store.GetPurchasedItems(uid)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, items)
}

func GetPurchaseHistory(c echo.Context) error {

	// パラメータ取得
	uid := c.Param("uid")

	// 購入履歴情報取得
	purchases, err := store.GetPurchaseHistory(uid)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, purchases)
}
