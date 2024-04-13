#!/bin/bash

# Đường dẫn đến tập tin artisan trong thư mục apps/server
ARTISAN_PATH="./apps/server/artisan"

# Kiểm tra nếu tập tin artisan tồn tại
if [ -f "$ARTISAN_PATH" ]; then
    # Nếu tồn tại, chạy lệnh serve của artisan
    php "$ARTISAN_PATH" serve
else
    # Nếu không tồn tại, hiển thị thông báo lỗi
    echo "Tập tin artisan không tồn tại trong đường dẫn $ARTISAN_PATH"
fi
