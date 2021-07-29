#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

#переход в дист
cd dist

#инициализация и загрузка
git init
git add -A
git commit -m 'deploy'
git push -f https://ilyasidashov74.github.io/tehnozavr/#/ master:gh-pages
