package seeds

import (
	"trill/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreatePurchaseDetails(db *gorm.DB, purchase_id uint64, item_id uint64, price uint64) error {
	return db.Clauses(clause.OnConflict{DoNothing: true}).Create(&models.PurchaseDetail{
		PurchaseID: purchase_id,
		ItemID:     item_id,
		Price:      price,
	}).Error
}
