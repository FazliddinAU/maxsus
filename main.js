// @fazliddin_au | @falastinlik 
// 7967934631:AAECpGlgO7vNY9siDo2BMqDmffM8o6fDYPI

const TelegramBot = require('node-telegram-bot-api');

const token = '7967934631:AAECpGlgO7vNY9siDo2BMqDmffM8o6fDYPI';

const bot = new TelegramBot(token, { polling: true });
const requiredChannel = '@fa_live';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.getChatMember(requiredChannel, chatId)
  .then((chatMember) => {
    // Agar foydalanuvchi kanalga obuna bo'lsa, botdan xabar yuborish
    if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
      bot.sendMessage(chatId, `Kanalga obuna bo'ldingiz✅. Endi botdan foydalanishingiz mumkin.`);
    } else {
      bot.sendMessage(chatId, `Botdan foydalanish uchun ${requiredChannel} kanaliga obuna bo'ling❗`);
    }
  })
  .catch((err) => {
    // Kanalga kirish mumkin bo'lmasa xato xabari
    bot.sendMessage(chatId, 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
    console.error(err);
  })
  
  
  const menuKeyboard = [
    ['📚Kitoblar', `🎧Nashidalar`],  // Birinchi qatordagi tugmalar
    ['📚Darslar', '📊Statistika'], // Ikkinchi qatordagi tugmalar
    ['🛒 Buyurtmalarim', `📮Bo'glanish`]    // Uchinchi qatordagi tugmalar
  ];

  // Menu tugmalarini yuborish
  bot.sendMessage(chatId, <b>'💡Asosiy menyu:'</b>, {
    reply_markup: {
      keyboard: menuKeyboard, // Tugmalarni bu yerda ko'rsatiladi
      one_time_keyboard: true, // Tugmalar faqat bir marta ko'rsatiladi
      resize_keyboard: true    // Tugmalarni ekran o'lchamiga moslashtirish
    }
  });
});

// Foydalanuvchi tugma bosganda nima qilish
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '📚Kitoblar') {
    bot.sendMessage(chatId, 'Onlayn kitoblar (pdf): @fa_live ');
  } else if (text === '🎧Nashidalar') {
    bot.sendMessage(chatId, '@fa_live');
  } else if (text === '📚Darslar') {
    bot.sendMessage(chatId, 'Kerakli darslarni tanlang:');
  } else if (text === '👨‍💻 Kurs yaratish') {
    bot.sendMessage(chatId, 'Yangi kurs yaratish uchun biz bilan bog\'laning!');
  } else if (text === '🛒 Buyurtmalarim') {
    bot.sendMessage(chatId, 'Sizning buyurtmalaringiz: \n1. Dasturlash kursi\n2. Mobil ilova yaratish');
  } else if (text === '💬 Yordam') {
    bot.sendMessage(chatId, 'Yordam kerakmi? Biz bilan bog\'laning!');
  }
});

