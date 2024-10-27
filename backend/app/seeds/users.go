package seeds

import (
	"trill/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateUser(db *gorm.DB, email string, password string) error {
	hasedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return db.Clauses(clause.OnConflict{DoNothing: true}).Create(&models.User{
		Email:    email,
		Password: string(hasedPassword),
	}).Error
}
