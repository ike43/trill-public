package seeds

import (
	"trill/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateCategory(db *gorm.DB, name string) error {
	return db.Clauses(clause.OnConflict{DoNothing: true}).Create(&models.Category{
		Name: name,
	}).Error
}
