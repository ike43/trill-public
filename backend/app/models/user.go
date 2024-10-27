package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `gorm:"not nul;unique"`
	Password string `gorm:"not null"`
}
