package seeds

import (
	"trill/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateItem(db *gorm.DB, title string, image string, category_id uint64, price uint64, creator_id uint64) error {
	return db.Clauses(clause.OnConflict{DoNothing: true}).Create(&models.Item{
		Title:      title,
		Image:      image,
		CategoryID: category_id,
		Price:      price,
		CreatorID:  creator_id,
	}).Error
}
