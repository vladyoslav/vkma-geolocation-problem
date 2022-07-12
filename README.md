<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png" width="320" alt="React Logo" /></a>
</p>
<p align="center">A <a href="https://javascript.com" target="_blank">JavaScript</a> library for building user interfaces.</p>

## Установка
```bash
$ yarn
```

## Настройка
Переименовать файл `.env.example` в `.env`, скопировать свой Mapbox токен в `VITE_MAPBOX_TOKEN`

## Запуск
```bash
# development and watch mode
$ yarn dev

# production mode
$ yarn build && yarn serve
```

## Использование с **VK Tunnel**/**Ngrok**/etc.
В `vite.config.ts` в объекте `server` убираем `https`, `host` и `proxy`, добавляем:
```typescript
hmr: {
  clientPort: 443
}
```
Подробнее - https://github.com/vitejs/vite/discussions/5399.

## Лицензия
[MIT](LICENSE)
