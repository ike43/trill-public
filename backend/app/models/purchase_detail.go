package models

import "gorm.io/gorm"

type PurchaseDetail struct {
	gorm.Model
	PurchaseID uint64 `gorm:"not null"`
	ItemID     uint64 `gorm:"not null"`
	Item       Item
	Price      uint64 `gorm:"not null"`
}
