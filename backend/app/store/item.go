package store

import (
	"fmt"
	"log/slog"
	"strconv"

	"trill/db"
	"trill/models"
	"trill/types"
)

func AddItem(item models.Item) (uint, error) {

	// アイテム追加
	if result := db.Connection.Create(&item); result.Error != nil {
		slog.Error(result.Error.Error())
		return 0, result.Error
	}

	return item.ID, nil
}

func GetItem(iid string) (types.APIItem, error) {

	// アイテム情報取得
	items, err := GetItems([]string{iid}, "", "", "")
	if err != nil {
		return items.Items[0], err
	}

	return items.Items[0], nil
}

func GetItems(iids []string, q string, category string, creator_id string) (types.APIItems, error) {

	// アイテム情報初期化
	var items types.APIItems
	var item types.APIItem

	// アイテム情報取得
	query := db.Connection.Table("items")
	query.Select("items.id, items.title, items.image, categories.id, categories.name, items.price, items.creator_id")
	query.Joins("LEFT JOIN categories ON categories.id = items.category_id")
	query.Where("items.deleted_at IS NULL")
	if len(iids) != 0 {
		query.Where("items.id IN ?", iids)
	}
	if q != "" {
		query.Where("items.title LIKE ?", "%"+q+"%")
	}
	if category != "" {
		query.Where("items.category_id = ?", category)
	}
	if creator_id != "" {
		query.Where("items.creator_id = ?", creator_id)
	}
	query.Order("items.id")
	rows, err := query.Rows()
	if err != nil {
		slog.Error(err.Error())
		return items, err
	}
	defer rows.Close()

	// アイテム情報格納
	count := 0
	for rows.Next() {
		if err := rows.Scan(&item.ID, &item.Title, &item.Image, &item.Category, &item.CategoryName, &item.Price, &item.Creator); err != nil {
			slog.Error(err.Error())
			return items, err
		}
		items.Items = append(items.Items, item)
		count++
	}
	items.Quantity = count

	return items, nil
}

func GetItemsByIds(iids []string) (types.APIItems, error) {

	// アイテム情報取得
	items, err := GetItems(iids, "", "", "")
	if err != nil {
		return items, err
	}

	return items, nil
}

func GetItemsByCreatorId(uid string) (types.APIItems, error) {

	// アイテム情報取得
	items, err := GetItems(nil, "", "", uid)
	if err != nil {
		return items, err
	}

	return items, nil
}

func SearchItems(q string, category string) (types.APIItems, error) {

	// アイテム情報取得
	items, err := GetItems(nil, q, category, "")
	if err != nil {
		return items, err
	}

	return items, nil
}

func UpdateItemPrice(iid string, price string, uid string) error {

	// アイテム情報取得
	item, err := GetItem(iid)
	if err != nil {
		return err
	}

	// アイテム作成者チェック
	if strconv.FormatUint(uint64(item.Creator), 10) != uid {
		return fmt.Errorf("ユーザIDが一致しませんでした")
	}

	// アイテム情報更新
	if result := db.Connection.Model(&models.Item{}).Where("id = ?", iid).Update("price", price); result.Error != nil {
		slog.Error(result.Error.Error())
		return result.Error
	}

	return nil
}

func DeleteItem(iid string, uid string) error {

	// アイテム情報取得
	item, err := GetItem(iid)
	if err != nil {
		return err
	}

	// アイテム作成者チェック
	if strconv.FormatUint(uint64(item.Creator), 10) != uid {
		return fmt.Errorf("ユーザIDが一致しませんでした")
	}

	// アイテム情報更新
	if result := db.Connection.Where("id = ?", iid).Delete(&models.Item{}); result.Error != nil {
		slog.Error(result.Error.Error())
		return result.Error
	}

	return nil
}
