package handler

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"

	"trill/store"
	"trill/types"
)

func Login(c echo.Context) error {

	// アイテム情報初期化
	var userInfo types.APIUser

	// フォームデータ取得
	email := c.FormValue("email")
	password := c.FormValue("password")

	// ユーザ取得
	user := store.GetUserByEmail(email)
	userInfo.ID = uint64(user.ID)

	// パスワード照合
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	// ログイン失敗時
	if err != nil {

		// エラー返却
		return c.NoContent(http.StatusUnauthorized)
	}

	// クッキー設定
	cookie := new(http.Cookie)
	cookie.Name = "uid"
	cookie.Value = strconv.FormatUint(uint64(user.ID), 10)
	cookie.Domain = os.Getenv("CORS_ORIGINS")
	cookie.Path = "/"
	cookie.Expires = time.Now().Add(time.Hour * 24 * 7)
	c.SetCookie(cookie)

	// セッション取得
	sess, _ := session.Get("session", c)

	// セッション設定
	sess.Options = &sessions.Options{
		Path:   "/",
		MaxAge: 86400 * 7,
	}
	sess.Values["authenticated"] = true
	sess.Values["uid"] = strconv.FormatUint(uint64(user.ID), 10)

	// セッション保存
	sess.Save(c.Request(), c.Response())
	return c.JSON(http.StatusOK, userInfo)
}

func Logout(c echo.Context) error {

	// クッキー削除
	cookie := new(http.Cookie)
	cookie.Name = "uid"
	cookie.Value = "0"
	cookie.Domain = os.Getenv("CORS_ORIGINS")
	cookie.Path = "/"
	cookie.Expires = time.Unix(0, 0)
	c.SetCookie(cookie)

	// セッション取得
	sess, _ := session.Get("session", c)

	// セッション削除
	sess.Options.MaxAge = -1

	// セッション保存
	sess.Save(c.Request(), c.Response())
	return c.NoContent(http.StatusNoContent)
}
