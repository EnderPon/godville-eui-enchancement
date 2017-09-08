# godville-eui-enchancement
Небольшие улучшения для Godville eUI+

## Towns highlight.user.js
Подсвечивает ближайший к герою город, показывает ожидаемую пенсию для всех городов.

## forum floater.user.js
Добавляет табличку с подписками в eUI+

## gv avatar.user.js
Увеличивает аватар по клику на странице бога.

## disable useless buttons.user.js
Отмечает (добавляет класс .disabled) бесполезные и опасные дествия на боссах и в подземелье:
1. лечение на боссе-паразите
2. атаки на боссе-лучике
3. атаки на неверующем
4. гласы на боссе-глушилке
5. гласы на боссе-ушастике
6. влияние в подземке бессилия

## Bingo helper
Выдаёт класс ".bingo" предметам в инвентаре, подходящим под нынешнее бинго.
Список искомых предметов подгружается в 00:10 по Мск, при каждом открытии газеты и при нажатии на "Заполнить ячейки".

Вариант пользовательского CSS для бинго:

```css
#inventory {counter-reset: bingo;}
.bingo {color: red; counter-increment: bingo;}
.bingo:after {content: ' (Б)';}
#inventory ul:after {display: block; content: 'Шмоток для бинго: ' counter(bingo); margin-top: 5px; margin-left: -20px; text-align: center;}
```
