package types

type APIItem struct {
	ID           uint64 `json:"id"`
	Title        string `json:"title"`
	Image        string `json:"image"`
	Category     string `json:"category"`
	CategoryName string `json:"category_name"`
	Price        uint64 `json:"price"`
	Creator      uint64 `json:"creator"`
	Seller       bool   `json:"seller"`
	Purchased    bool   `json:"purchased"`
	CartAdded    bool   `json:"cart_added"`
}

type APIItems struct {
	Quantity int       `json:"quantity"`
	Items    []APIItem `json:"items"`
}
