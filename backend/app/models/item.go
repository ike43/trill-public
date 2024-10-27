package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Title      string `gorm:"not null"`
	Image      string `gorm:"not null"`
	CategoryID uint64 `gorm:"not null"`
	Category   Category
	Price      uint64 `gorm:"not null"`
	CreatorID  uint64 `gorm:"not null"`
	User       User   `gorm:"foreignKey:CreatorID"`
}
