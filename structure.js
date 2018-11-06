export default {
  //Квартиры. Пока есть только они, пушо данные для других объектов недвижки никто не парсил и не обрабатывал
  typeProperty: 'string',   //Тип недвижимости, возможно лучше хранить типо в отедльной таблице и связывать через ID, но я не эксперт в этой области/
  typeAdvert: 'string',     //Тип объявления (вторичка или новостройка).
  urlAdvert: 'string',      //URL объявления
  urlThumbImage: 'string',  //Ну тут понятно. По идее картинки должны обрабатываться, резаться, ресайзиться, вопрсо где? На сервере или на клиенте.
  address: 'string',        // Без комментариев
  contactPerson: 'string',  // Имя владельца (контактное лицо в объявлении)
  header: 'string',         // Заголовок объявления
  price: 'string',          // No comments
  pricePm: 'string',        // ↑
  countRooms: 'string',     // ↑
  totalArea: 'string',      // ↑
  livingArea: 'string',     // ↑
  floor: 'string',          // ↑
  description: 'string',    // ↑
  street: 'string',         // ↑
  house: 'string',          // ↑
  metro: 'string',          // ↑
  phone: 'string',          // Определяет есть ли телефон, целесообразнее хранить такие штуки в bool или в виде 0 1 чиселок, но у меня colhozEdition база
  internet: 'string',       // ↑
  balcony: 'string',        // ↑
  privateApartment: 'string', // Не помню что это, кажись я это не отображаю
  kitchenArea: 'string',    // NC
  repair: 'string',         // ↑ (хотя это combobox)
  bathroom: 'string',       // ↑
  gas: 'string',            // ↑ ===== Gas! Gas! Gas! I'm gonna step on the gas ======
  security: 'string',       // Охрана
  yearConstruct: 'string',  // Год постройки здания
  wallMaterial: 'string',   // NC
  waterSupply: 'string',    // ↑
  ceilingHeight: 'string',  // ↑
  heatingSystem: 'string',  // ↑
  lift: 'string',           // ↑
  garbageChute: 'string',   // Мусоропровод
  seriesBuilding: 'string', // ???
  stageConstruct: 'string', // ???
  furnish: 'string',        // NC
  yearDelivery: 'string',   // Год сдачи
  mortgage: 'string',       // Ипотека... Даже on english звучит крайне жутко
  nameRC: 'string',         // Название чего то там, тоже почти ни у кого нет
  city: 'string',           // NC
  lat: 'string',            // ↑
  lng: 'string',            // ↑
}
