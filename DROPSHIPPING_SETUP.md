# Дропшиппинг Настройка для LongevityBase

## Как это работает

1. **Клиент делает заказ** - Выбирает продукт и оплачивает через Stripe
2. **Мы собираем оплату и адрес** - Stripe Checkout собирает полную информацию
3. **Автоматическое создание заказа** - Webhook автоматически создаёт заказ у партнёра
4. **Партнёр отправляет товар** - Shopify/партнёр отправляет товар напрямую клиенту
5. **Мы получаем прибыль** - Разница между ценой продажи и ценой у партнёра

## Настройка Stripe Webhook

1. Зайдите в Stripe Dashboard → Developers → Webhooks
2. Добавьте endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Выберите события: `checkout.session.completed`
4. Скопируйте webhook secret в `.env` как `STRIPE_WEBHOOK_SECRET`

## Интеграция с Shopify

### Получение Admin API Token

1. Зайдите в Shopify Admin → Settings → Apps and sales channels
2. Develop apps → Create an app
3. Название: "LongevityBase Dropshipping"
4. Admin API scopes нужны:
   - `write_orders` - создание заказов
   - `read_products` - просмотр продуктов
5. Install app и скопируйте Admin API access token
6. Добавьте в `.env`:
   \`\`\`
   SHOPIFY_DOMAIN=your-store.myshopify.com
   SHOPIFY_ADMIN_TOKEN=shpat_xxxxx
   \`\`\`

### Связывание продуктов

В `lib/seed.ts` добавьте `vendorProductId` для продуктов Shopify:

\`\`\`typescript
{
  id: "6",
  vendor: "shopify",
  vendorProductId: "7234567890123", // Shopify variant ID
}
\`\`\`

Чтобы найти variant ID:
1. В Shopify Admin откройте продукт
2. Нажмите на вариант продукта
3. ID будет в URL: `/admin/products/xxx/variants/7234567890123`

## Маржа и Ценообразование

Установите `priceInCents` выше, чем цена у партнёра:

\`\`\`typescript
{
  price: 299,        // Отображаемая цена
  priceInCents: 29900, // $299 - цена для клиента
  // Партнёр получит заказ, вы платите им их цену (например $200)
  // Ваша прибыль: $99
}
\`\`\`

## Тестирование

1. Используйте Stripe Test Mode
2. Тестовая карта: `4242 4242 4242 4242`
3. Проверьте создание заказа в Shopify
4. Убедитесь что адрес передаётся правильно

## Для других партнёров

Если партнёр не Shopify:
- Используйте `vendor: "other"` 
- Заказ будет залогирован, но не создан автоматически
- Вы получите уведомление для ручной обработки
- Позже можно добавить интеграцию с их API

## Отслеживание заказов

В будущем добавим:
- База данных для хранения заказов
- Admin панель для просмотра заказов
- Автоматические уведомления клиентам
- Синхронизация статуса доставки
