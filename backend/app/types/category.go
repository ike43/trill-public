package types

type APICategory struct {
	ID   uint64 `json:"id"`
	Name string `json:"name"`
}

type APICategories struct {
	Quantity   int           `json:"quantity"`
	Categories []APICategory `json:"categories"`
}
