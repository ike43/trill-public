package models

import "gorm.io/gorm"

type Purchase struct {
	gorm.Model
	Total           uint64 `gorm:"not null"`
	PurchaserID     uint64 `gorm:"not null"`
	User            User   `gorm:"foreignKey:PurchaserID"`
	PurchaseDetails []PurchaseDetail
}
