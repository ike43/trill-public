package handler

import (
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"trill/store"
	"trill/types"
	"trill/utilities"
)

func AddCartItem(c echo.Context) error {

	// セッション取得
	sess, _ := session.Get("session", c)

	// セッション設定
	sess.Options = &sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	}

	// フォームデータ取得
	iid := c.FormValue("id")

	// アイテム存在確認
	_, err := store.GetItem(iid)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	// カート初期化
	if sess.Values["cart"] == nil {
		sess.Values["cart"] = []string{}
	}

	// カートへアイテム追加
	if !utilities.SliceContains(sess.Values["cart"].([]string), iid) {
		sess.Values["cart"] = append(sess.Values["cart"].([]string), iid)
	}
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusNoContent)
}

func GetCartItem(c echo.Context) error {

	// アイテム情報初期化
	var items types.APIItems

	// セッション取得
	sess, _ := session.Get("session", c)

	// カート情報有無確認
	if sess.Values["cart"] == nil {
		items.Quantity = 0
		return c.JSON(http.StatusOK, items)
	}

	// カート情報取得
	cart := sess.Values["cart"].([]string)
	ids := make([]string, len(cart))
	copy(ids, cart)

	// カート内アイテム数確認
	if len(cart) == 0 {
		items.Quantity = 0
		return c.JSON(http.StatusOK, items)
	}

	// アイテム情報取得
	items, err := store.GetItemsByIds(ids)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, items)
}

func DeleteCartItem(c echo.Context) error {

	// セッション取得
	sess, _ := session.Get("session", c)

	// パラメータ取得
	iid := c.Param("iid")

	// カートからアイテム削除
	sess.Values["cart"] = utilities.SliceRemove(sess.Values["cart"].([]string), iid)
	sess.Save(c.Request(), c.Response())

	return c.NoContent(http.StatusNoContent)
}
