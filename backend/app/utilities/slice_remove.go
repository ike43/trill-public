package utilities

func SliceRemove(slice []string, target string) []string {

	// 返却値初期化
	result := []string{}

	// 全件くり返し
	for _, value := range slice {

		// 同一のものでない場合
		if value != target {

			// 値を追加
			result = append(result, value)
		}
	}

	return result
}
