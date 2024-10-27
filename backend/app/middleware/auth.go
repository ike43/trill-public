package middleware

import (
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		// セッション取得
		sess, _ := session.Get("session", c)

		// 未ログインの場合
		if sess.Values["authenticated"] != true {

			// エラー返却
			return c.NoContent(http.StatusUnauthorized)
		}

		return next(c)
	}
}

func AuthOnlySelf(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		// セッション取得
		sess, _ := session.Get("session", c)

		// 未ログインの場合
		if sess.Values["authenticated"] != true {

			// エラー返却
			return c.NoContent(http.StatusUnauthorized)
		}

		// パラメータ取得
		uid := c.Param("uid")

		// ユーザIDが一致しない場合
		if uid != sess.Values["uid"] {

			// エラー返却
			return c.NoContent(http.StatusForbidden)
		}

		return next(c)
	}
}
