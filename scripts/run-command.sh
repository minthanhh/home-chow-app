#!/bin/bash

MOBILE_FOLDER="./apps/mobile"
ARTISAN_PATH="./apps/server/artisan"

if [ "$1" = "run-many" ]; then
    # Serve
    if [ "$2" = "serve" ]; then
        # Expo Serve
        if [ -d "$MOBILE_FOLDER" ]; then
            cd "$MOBILE_FOLDER" || exit
            yarn start
        else
            echo "Thư mục $MOBILE_FOLDER không tồn tại"
        fi

        # Laravel Serve
        if [ -f "$ARTISAN_PATH" ]; then
            php "$ARTISAN_PATH" serve &
        else
            echo "Tập tin artisan không tồn tại trong đường dẫn $ARTISAN_PATH"
        fi
    else
        echo "Thư mục $MOBILE_FOLDER hoặc $ARTISAN_PATH không tồn tại"
    fi

    # Test
    if [ "$2" = "test" ]; then
        # Expo Serve
        if [ -d "$MOBILE_FOLDER" ]; then
            cd "$MOBILE_FOLDER" || exit
            yarn test
        else
            echo "Thư mục $MOBILE_FOLDER không tồn tại"
        fi
    else
        echo "Thư mục $MOBILE_FOLDER hoặc $ARTISAN_PATH không tồn tại"
    fi

elif [ "$1" = "run" ]; then
    if [ "$2" = "expo:serve" ]; then
        # Expo Serve
        if [ -d "$MOBILE_FOLDER" ]; then
            cd "$MOBILE_FOLDER" || exit
            yarn start
        else
            echo "Thư mục $MOBILE_FOLDER không tồn tại"
        fi
        echo "Thư mục $MOBILE_FOLDER không tồn tại"
    fi

    if [ "$2" = "laravel:serve" ]; then
        # Expo Serve
        if [ -f "$ARTISAN_PATH" ]; then
            php "$ARTISAN_PATH" serve &
        else
            echo "Tập tin artisan không tồn tại trong đường dẫn $ARTISAN_PATH"
        fi
    fi
    
    if [ "$2" = "expo:test" ]; then
        # Expo Serve
        if [ -d "$MOBILE_FOLDER" ]; then
            cd "$MOBILE_FOLDER" || exit
            yarn test
        else
            echo "Thư mục $MOBILE_FOLDER không tồn tại"
        fi
    
else
    echo "Sử dụng: $0 [run-many serve|test || run expo:serve]"
    exit 1
fi
