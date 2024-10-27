package utilities

func SliceContains(slice []string, target string) bool {

	// 全件くり返し
	for _, value := range slice {

		// 同一のものが存在する場合
		if value == target {

			// trueを返却
			return true
		}
	}

	return false
}
