package db

import (
	"log/slog"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"trill/models"
	"trill/seeds"
)

var Connection *gorm.DB

func Init(seeding bool) {

	// 環境変数読み込み
	if err := godotenv.Load(".env.local"); err != nil {
		slog.Error("Error loading .env.local file")
	}

	// 接続情報
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")
	dsn := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + name + "?charset=utf8mb4&parseTime=True&loc=Local"

	var db *gorm.DB
	var err error

	// 接続
	for i := 0; i < 30; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err == nil {
			break
		}

		// 接続失敗
		slog.Error("Failed to connect to database. Retrying...")

		time.Sleep(time.Second)
	}

	// Seedingの場合、テーブルを全削除する
	if seeding {
		db.Migrator().DropTable(
			&models.User{},
			&models.Category{},
			&models.Item{},
			&models.Purchase{},
			&models.PurchaseDetail{},
		)
	}

	// マイグレーション
	db.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Item{},
		&models.Purchase{},
		&models.PurchaseDetail{},
	)

	// Seeding実行
	if seeding {
		seeds.RunAll(db)
	}

	// コネクション格納
	Connection = db
}

func GetConnection() *gorm.DB {
	return Connection
}
