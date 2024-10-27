package store

import (
	"log/slog"
	"strconv"

	"trill/db"
	"trill/models"
	"trill/types"
)

func AddPurchase(uid string, ids []string) error {

	// アイテム情報取得
	query := db.Connection.Table("items")
	query.Select("items.id, items.title, items.image, categories.id, categories.name, items.price")
	query.Joins("LEFT JOIN categories ON categories.id = items.category_id")
	query.Where("items.deleted_at IS NULL AND items.id IN ?", ids)
	query.Order("items.id")
	rows, err := query.Rows()
	if err != nil {
		slog.Error(err.Error())
		return err
	}
	defer rows.Close()

	// アイテム情報格納
	var items types.APIItems
	var item types.APIItem
	total := 0
	for rows.Next() {
		if err := rows.Scan(&item.ID, &item.Title, &item.Image, &item.Category, &item.CategoryName, &item.Price); err != nil {
			slog.Error(err.Error())
			return err
		}
		items.Items = append(items.Items, item)
		total += int(item.Price)
	}

	// トランザクション開始
	tx := db.Connection.Begin()

	// 購入履歴保存
	converted_uid, _ := strconv.ParseUint(uid, 10, 0)
	purchase := models.Purchase{
		PurchaserID: converted_uid,
		Total:       uint64(total),
	}
	if result := tx.Create(&purchase); result.Error != nil {
		slog.Error(result.Error.Error())
		tx.Rollback()
		return result.Error
	}

	// 購入履歴詳細保存
	purchase_details := []models.PurchaseDetail{}
	for _, value := range items.Items {
		purchase_detail := models.PurchaseDetail{
			PurchaseID: uint64(purchase.ID),
			ItemID:     uint64(value.ID),
			Price:      uint64(value.Price),
		}
		purchase_details = append(purchase_details, purchase_detail)
	}
	if result := tx.Create(&purchase_details); result.Error != nil {
		slog.Error(result.Error.Error())
		tx.Rollback()
		return result.Error
	}

	// トランザクションコミット
	tx.Commit()

	return nil
}

func GetPurchasedItems(uid string) (types.APIItems, error) {

	// アイテム情報初期化
	var items types.APIItems
	var item types.APIItem

	// アイテム情報取得
	query := db.Connection.Table("purchase_details")
	query.Select("items.id, items.title, items.image, categories.id, categories.name, purchase_details.price")
	query.Joins("LEFT JOIN purchases ON purchases.id = purchase_details.purchase_id")
	query.Joins("LEFT JOIN items ON items.id = purchase_details.item_id")
	query.Joins("LEFT JOIN categories ON categories.id = items.category_id")
	query.Where("purchases.purchaser_id = ?", uid)
	query.Order("purchases.created_at DESC")
	rows, err := query.Rows()
	if err != nil {
		slog.Error(err.Error())
		return items, err
	}
	defer rows.Close()

	// アイテム情報格納
	count := 0
	for rows.Next() {
		if err := rows.Scan(&item.ID, &item.Title, &item.Image, &item.Category, &item.CategoryName, &item.Price); err != nil {
			slog.Error(err.Error())
			return items, err
		}
		items.Items = append(items.Items, item)
		count++
	}
	items.Quantity = count

	return items, nil
}

func GetPurchaseHistory(uid string) (types.APIPurchases, error) {

	// 購入履歴情報初期化
	var purchases types.APIPurchases
	var purchase types.APIPurchase

	// 購入履歴取得
	query := db.Connection.Table("purchase_details")
	query.Select("purchases.id, DATE_FORMAT(purchases.created_at, '%Y/%m/%d'), purchases.total, items.title, items.image, categories.id, categories.name, purchase_details.price")
	query.Joins("LEFT JOIN purchases ON purchases.id = purchase_details.purchase_id")
	query.Joins("LEFT JOIN items ON items.id = purchase_details.item_id")
	query.Joins("LEFT JOIN categories ON categories.id = items.category_id")
	query.Where("purchases.purchaser_id = ?", uid)
	query.Order("purchases.created_at DESC")
	rows, err := query.Rows()
	if err != nil {
		slog.Error(err.Error())
		return purchases, err
	}
	defer rows.Close()

	// 購入履歴情報格納
	count := 0
	for rows.Next() {
		if err := rows.Scan(&purchase.ID, &purchase.Datetime, &purchase.Total, &purchase.Title, &purchase.Image, &purchase.Category, &purchase.CategoryName, &purchase.Price); err != nil {
			slog.Error(err.Error())
			return purchases, err
		}
		purchases.Purchases = append(purchases.Purchases, purchase)
		count++
	}
	purchases.Quantity = count

	return purchases, nil
}

func GetSalesHistory(uid string) (types.APISales, error) {

	// アイテム情報初期化
	var sales types.APISales
	var sale types.APISale

	// 販売履歴情報取得
	query := db.Connection.Table("purchase_details")
	query.Select("DATE_FORMAT(purchases.created_at, '%Y/%m/%d'), items.title, items.image, categories.id, categories.name, purchase_details.price")
	query.Joins("LEFT JOIN purchases ON purchases.id = purchase_details.purchase_id")
	query.Joins("LEFT JOIN items ON items.id = purchase_details.item_id")
	query.Joins("LEFT JOIN categories ON categories.id = items.category_id")
	query.Where("items.creator_id = ?", uid)
	query.Order("purchases.created_at DESC")
	rows, err := query.Rows()
	if err != nil {
		slog.Error(err.Error())
		return sales, err
	}
	defer rows.Close()

	// 販売履歴情報格納
	count := 0
	for rows.Next() {
		if err := rows.Scan(&sale.Datetime, &sale.Title, &sale.Image, &sale.Category, &sale.CategoryName, &sale.Price); err != nil {
			slog.Error(err.Error())
			return sales, err
		}
		sales.Sales = append(sales.Sales, sale)
		count++
	}
	sales.Quantity = count

	return sales, nil
}
