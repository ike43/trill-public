package types

type APISale struct {
	Datetime     string `json:"datetime"`
	Title        string `json:"title"`
	Image        string `json:"image"`
	Category     string `json:"category"`
	CategoryName string `json:"category_name"`
	Price        uint64 `json:"price"`
}

type APISales struct {
	Quantity int       `json:"quantity"`
	Sales    []APISale `json:"sales"`
}
