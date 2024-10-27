package main

import (
	"flag"
	"os"

	"github.com/labstack/echo/v4"

	"trill/db"
	"trill/router"
	"trill/setting"
)

func main() {

	// フラグ取得
	seeding := flag.Bool("seeding", false, "bool flag")
	flag.Parse()

	// データベース初期化
	db.Init(*seeding)

	// Echo初期化
	e := echo.New()

	// 各種設定
	setting.SetSetting(e)

	// ルーティング設定
	router.SetRouting(e)

	// サーバ起動
	e.Logger.Fatal(e.Start(":" + os.Getenv("SERVER_PORT")))
}
