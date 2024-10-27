package seeds

import (
	"log/slog"

	"gorm.io/gorm"
)

type Seed struct {
	Name string
	Run  func(*gorm.DB) error
}

func All() []Seed {
	return []Seed{
		// Users
		{
			Name: "CreateUser - Bob",
			Run: func(db *gorm.DB) error {
				return CreateUser(db, "bob@example.com", "uHrdx55u")
			},
		},
		{
			Name: "CreateUser - John",
			Run: func(db *gorm.DB) error {
				return CreateUser(db, "john@example.com", "uHrdx55u")
			},
		},
		{
			Name: "CreateUser - Alice",
			Run: func(db *gorm.DB) error {
				return CreateUser(db, "alice@example.com", "uHrdx55u")
			},
		},
		{
			Name: "CreateUser - Emma",
			Run: func(db *gorm.DB) error {
				return CreateUser(db, "emma@example.com", "uHrdx55u")
			},
		},
		// Categories
		{
			Name: "CreateCategory - 人物",
			Run: func(db *gorm.DB) error {
				return CreateCategory(db, "人物")
			},
		},
		{
			Name: "CreateCategory - 動物",
			Run: func(db *gorm.DB) error {
				return CreateCategory(db, "動物")
			},
		},
		{
			Name: "CreateCategory - 季節・行事",
			Run: func(db *gorm.DB) error {
				return CreateCategory(db, "季節・行事")
			},
		},
		{
			Name: "CreateCategory - ビジネス",
			Run: func(db *gorm.DB) error {
				return CreateCategory(db, "ビジネス")
			},
		},
		{
			Name: "CreateCategory - その他",
			Run: func(db *gorm.DB) error {
				return CreateCategory(db, "その他")
			},
		},
		// Items
		{
			Name: "CreateItem - プレゼンテーション",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "プレゼンテーション", "/images/c65576d6-3bd4-4a24-bcdf-85f6316e66eb.png", 4, 700, 1)
			},
		},
		{
			Name: "CreateItem - 公園のベンチにて",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "公園のベンチにて", "/images/1bae432f-7dca-4e7c-b94b-c59f6af78cce.png", 1, 500, 1)
			},
		},
		{
			Name: "CreateItem - うさぎ",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "うさぎ", "/images/df43c201-2f7a-485f-b609-f971a9e85210.png", 2, 300, 1)
			},
		},
		{
			Name: "CreateItem - サーファー",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "サーファー", "/images/2a6c58d3-ea92-4e90-b359-069d4dfead9a.png", 3, 500, 1)
			},
		},
		{
			Name: "CreateItem - 医者",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "医者", "/images/fa93ccaa-460c-42fe-9625-176eabba97fc.png", 1, 400, 2)
			},
		},
		{
			Name: "CreateItem - ハンバーガー",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "ハンバーガー", "/images/a1bd6ed8-deec-45d1-96e6-bcc5434620f0.png", 5, 400, 2)
			},
		},
		{
			Name: "CreateItem - 犬の散歩",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "犬の散歩", "/images/5e2eb95e-b475-4ef6-9272-301433793b7a.png", 2, 800, 3)
			},
		},
		{
			Name: "CreateItem - グラフ",
			Run: func(db *gorm.DB) error {
				return CreateItem(db, "グラフ", "/images/a3e3c459-ab5a-4123-b95d-84d2fccbf2ef.png", 4, 600, 3)
			},
		},
		// Purchases
		{
			Name: "CreatePurchase - 購入サンプル01",
			Run: func(db *gorm.DB) error {
				return CreatePurchase(db, 1200, 1)
			},
		},
		// PurchaseDetails
		{
			Name: "CreatePurchaseDetails - 購入詳細サンプル01",
			Run: func(db *gorm.DB) error {
				return CreatePurchaseDetails(db, 1, 5, 400)
			},
		},
		{
			Name: "CreatePurchaseDetails - 購入詳細サンプル02",
			Run: func(db *gorm.DB) error {
				return CreatePurchaseDetails(db, 1, 7, 800)
			},
		},
	}
}

func RunAll(db *gorm.DB) {
	for _, seed := range All() {
		if err := seed.Run(db); err != nil {
			slog.Error("Seeding error",
				slog.String("seed name", seed.Name),
				slog.String("error message", err.Error()))
		}
	}
}
