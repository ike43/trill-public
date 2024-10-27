package types

type APIPurchase struct {
	ID           uint64 `json:"id"`
	Datetime     string `json:"datetime"`
	Total        uint64 `json:"total"`
	Title        string `json:"title"`
	Image        string `json:"image"`
	Category     string `json:"category"`
	CategoryName string `json:"category_name"`
	Price        uint64 `json:"price"`
}

type APIPurchases struct {
	Quantity  int           `json:"quantity"`
	Purchases []APIPurchase `json:"purchases"`
}
