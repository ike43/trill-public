package seeds

import (
	"trill/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreatePurchase(db *gorm.DB, total uint64, purchaser_id uint64) error {
	return db.Clauses(clause.OnConflict{DoNothing: true}).Create(&models.Purchase{
		Total:       total,
		PurchaserID: purchaser_id,
	}).Error
}
