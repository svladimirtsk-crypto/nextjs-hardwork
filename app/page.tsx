// app/page.tsx
"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// ДАННЫЕ
// ─────────────────────────────────────────────

const STACKS_DRIVERS = [
  {
    id: "baza",
    name: "БАЗА",
    icon: "🔧",
    tagline: "Минимум, без которого нельзя",
    audience: "taxi",
    price: 3890,
    items: [
      { name: "Таурин", time: "утро", desc: "Энергия без кофеина" },
      { name: "Омега-3", time: "обед", desc: "Сердце и сосуды" },
      { name: "Магний", time: "вечер", desc: "Мышцы и сон" },
    ],
    color: "#FFD600",
  },
  {
    id: "antistress",
    name: "АНТИ-СТРЕСС",
    icon: "⚡",
    tagline: "Чтобы не взорваться в пробке",
    audience: "taxi",
    price: 3190,
    items: [
      { name: "Л-Теанин", time: "утро", desc: "Спокойствие без сонливости" },
      { name: "Б-комплекс", time: "обед", desc: "Нервная система" },
      { name: "Магний", time: "вечер", desc: "Снижение кортизола" },
    ],
    color: "#7B68EE",
  },
  {
    id: "motor",
    name: "МОТОР",
    icon: "❤️",
    tagline: "Твоё сердце — не расходник",
    audience: "taxi",
    price: 4990,
    items: [
      { name: "КоКю10", time: "утро", desc: "Энергия митохондрий" },
      { name: "Омега-3", time: "обед", desc: "Эластичность сосудов" },
      { name: "Магний", time: "вечер", desc: "Ритм и давление" },
    ],
    color: "#FF4444",
  },
  {
    id: "focus",
    name: "ФОКУС",
    icon: "🎯",
    tagline: "Голова работает — руки не косячат",
    audience: "taxi",
    price: 3790,
    items: [
      { name: "Л-Тирозин", time: "утро", desc: "Дофамин и концентрация" },
      { name: "Лецитин", time: "обед", desc: "Миелиновые оболочки" },
      { name: "Магний", time: "вечер", desc: "Передача импульсов" },
    ],
    color: "#00BFFF",
  },
  {
    id: "profilaktika",
    name: "ПРОФИЛАКТИКА",
    icon: "🛡️",
    tagline: "Чтобы больничный брали другие",
    audience: "taxi",
    price: 1790,
    items: [
      { name: "Витамин Д3", time: "утро", desc: "Иммуномодуляция" },
      { name: "Витамин С", time: "обед", desc: "Антиоксидант" },
      { name: "Цинк", time: "вечер", desc: "Барьерная защита" },
    ],
    color: "#32CD32",
  },
];

const STACKS_BUILDERS = [
  {
    id: "terminator",
    name: "ТЕРМИНАТОР",
    icon: "⚙️",
    tagline: "Суставы сказали «хватит» — ты говоришь «ещё нет»",
    audience: "builder",
    price: 4990,
    items: [
      { name: "Коллаген", time: "утро", desc: "Строительный материал хряща" },
      {
        name: "Глюкозамин+МСМ",
        time: "обед",
        desc: "Смазка для суставов",
      },
      { name: "Магний", time: "вечер", desc: "Снятие спазма" },
    ],
    color: "#FF8C00",
  },
  {
    id: "batareyka",
    name: "БАТАРЕЙКА",
    icon: "🔋",
    tagline: "Заряд до конца смены",
    audience: "builder",
    price: 2890,
    items: [
      { name: "Л-Карнитин", time: "утро", desc: "Транспорт жиров → энергия" },
      { name: "Б-комплекс", time: "обед", desc: "Энергетический метаболизм" },
      { name: "ЦМА", time: "вечер", desc: "Восстановление и тестостерон" },
    ],
    color: "#00FF7F",
  },
  {
    id: "spasatel",
    name: "СПАСАТЕЛЬ",
    icon: "🚑",
    tagline: "Когда уже болит — а к врачу некогда",
    audience: "builder",
    price: 4990,
    items: [
      {
        name: "Куркумин",
        time: "утро",
        desc: "Противовоспалительный щит",
      },
      { name: "Омега-3", time: "обед", desc: "Разрешение воспаления" },
      { name: "Коллаген", time: "вечер", desc: "Ремонт тканей во сне" },
    ],
    color: "#FF6347",
  },
  {
    id: "kaska",
    name: "КАСКА",
    icon: "⛑️",
    tagline: "Защита для того, что между ушами",
    audience: "builder",
    price: 2990,
    items: [
      { name: "Лецитин", time: "утро", desc: "Фосфолипиды мозга" },
      { name: "Б-комплекс", time: "обед", desc: "Нервная проводимость" },
      { name: "Магний", time: "вечер", desc: "Нейромедиаторы" },
    ],
    color: "#FFD700",
  },
  {
    id: "bronya",
    name: "БРОНЯ",
    icon: "🦺",
    tagline: "Не болеешь — не теряешь деньги",
    audience: "builder",
    price: 1790,
    items: [
      { name: "Витамин С", time: "утро", desc: "Иммунные клетки" },
      { name: "Витамин Д3", time: "обед", desc: "Активация Т-клеток" },
      { name: "Цинк", time: "вечер", desc: "Противовирусный барьер" },
    ],
    color: "#4682B4",
  },
];

const COMBOS = [
  {
    id: "combo1",
    name: "БАЗОВЫЙ ВОДИТЕЛЬ",
    stacks: "БАЗА + ПРОФИЛАКТИКА",
    jars: 6,
    oldPrice: 5680,
    price: 4990,
    saving: 690,
    audience: "taxi",
    desc: "Энергия + иммунитет. 6 уникальных банок. Ноль дублей.",
  },
  {
    id: "combo2",
    name: "СТАЛЬНЫЕ НЕРВЫ",
    stacks: "АНТИ-СТРЕСС + ФОКУС",
    jars: 6,
    oldPrice: 6980,
    price: 5890,
    saving: 1090,
    audience: "taxi",
    desc: "Спокойствие + концентрация. Дубль магния = усиленный курс.",
  },
  {
    id: "combo3",
    name: "ПОЛНАЯ ЗАЩИТА ВОДИТЕЛЯ",
    stacks: "БАЗА + МОТОР + ПРОФИЛАКТИКА",
    jars: 9,
    oldPrice: 10670,
    price: 8490,
    saving: 2180,
    audience: "taxi",
    desc: "Сердце + энергия + иммунитет. Максимальный набор.",
  },
  {
    id: "combo4",
    name: "БАЗОВЫЙ СТРОИТЕЛЬ",
    stacks: "ТЕРМИНАТОР + БРОНЯ",
    jars: 6,
    oldPrice: 6780,
    price: 5990,
    saving: 790,
    audience: "builder",
    desc: "Суставы + иммунитет. Витамин С усиливает коллаген.",
  },
  {
    id: "combo5",
    name: "РАБОЧАЯ ЛОШАДКА",
    stacks: "БАТАРЕЙКА + КАСКА",
    jars: 6,
    oldPrice: 5880,
    price: 4990,
    saving: 890,
    audience: "builder",
    desc: "Энергия + мозг. Запасная банка Б-комплекса в подарок.",
  },
  {
    id: "combo6",
    name: "ПОЛНАЯ ЗАЩИТА СТРОИТЕЛЯ",
    stacks: "ТЕРМИНАТОР + БАТАРЕЙКА + БРОНЯ",
    jars: 9,
    oldPrice: 9670,
    price: 7690,
    saving: 1980,
    audience: "builder",
    desc: "Суставы + энергия + иммунитет. 9 уникальных банок.",
  },
  {
    id: "combo7",
    name: "АНТИБОЛЬ",
    stacks: "ТЕРМИНАТОР + СПАСАТЕЛЬ",
    jars: 6,
    oldPrice: 9980,
    price: 8490,
    saving: 1490,
    audience: "builder",
    desc: "Двойной коллаген утро+вечер = 7000 мг/день.",
  },
];

const PROBLEMS = [
  {
    icon: "🔥",
    text: "Спина не разгибается после смены",
  },
  {
    icon: "😴",
    text: "Встаёшь разбитым, хотя спал 7 часов",
  },
  {
    icon: "😤",
    text: "Нервы на пределе — срываешься на ровном месте",
  },
  {
    icon: "🦴",
    text: "Колени хрустят как дверь в подъезде",
  },
  {
    icon: "🤧",
    text: "Третья простуда за сезон",
  },
  {
    icon: "💓",
    text: "Сердце колотится на ровном месте",
  },
];

const FAQ_DATA = [
  {
    q: "Это спортпит?",
    a: "Нет. Это витамины, минералы и добавки. Те же, что в аптеке, только дешевле и в правильных комбинациях.",
  },
  {
    q: "Можно пить с лекарствами?",
    a: "Если пьёшь что-то по рецепту — спроси врача. В инструкции указаны все взаимодействия.",
  },
  {
    q: "Я не водитель и не строитель. Мне подойдёт?",
    a: "Да. Стеки решают универсальные проблемы: стресс, суставы, иммунитет, энергия. Просто названия заточены под рабочих людей.",
  },
  {
    q: "Почему не аптека?",
    a: "Потому что в аптеке 500 банок и ни одной инструкции «что с чем пить». У нас — 3 банки и чёткая схема приёма.",
  },
  {
    q: "А если не поможет?",
    a: "Добавки — не волшебная таблетка. Эффект через 2–4 недели. Если через месяц разницы нет — напиши, разберёмся.",
  },
  {
    q: "Банки вскрытые?",
    a: "Нет. Всё в заводской упаковке, запечатано производителем. Мы не пересыпаем, не переклеиваем.",
  },
];

const BODY_ZONES = [
  {
    zone: "ГОЛОВА",
    y: "top-[8%]",
    stacks: [
      { name: "КАСКА", icon: "⛑️", desc: "Мозг и нервы" },
      { name: "ФОКУС", icon: "🎯", desc: "Концентрация" },
      { name: "АНТИ-СТРЕСС", icon: "⚡", desc: "Нервы и сон" },
    ],
  },
  {
    zone: "ГРУДЬ",
    y: "top-[30%]",
    stacks: [
      { name: "МОТОР", icon: "❤️", desc: "Сердце и сосуды" },
      { name: "БРОНЯ", icon: "🦺", desc: "Иммунитет" },
    ],
  },
  {
    zone: "ЦЕНТР",
    y: "top-[48%]",
    stacks: [{ name: "БАЗА", icon: "🔧", desc: "Фундамент здоровья" }],
  },
  {
    zone: "МЫШЦЫ",
    y: "top-[60%]",
    stacks: [{ name: "БАТАРЕЙКА", icon: "🔋", desc: "Энергия и сила" }],
  },
  {
    zone: "СУСТАВЫ",
    y: "top-[78%]",
    stacks: [
      { name: "ТЕРМИНАТОР", icon: "⚙️", desc: "Хрящи и связки" },
      { name: "СПАСАТЕЛЬ", icon: "🚑", desc: "Воспаление и боль" },
    ],
  },
];

// ─────────────────────────────────────────────
// КОМПОНЕНТЫ
// ─────────────────────────────────────────────

function HazardStripe() {
  return (
    <div
      className="w-full h-3"
      style={{
        background:
          "repeating-linear-gradient(45deg, #FFD600, #FFD600 10px, #1A1A1A 10px, #1A1A1A 20px)",
      }}
    />
  );
}

function Logo({ size = "lg" }: { size?: "sm" | "lg" | "xl" }) {
  const sizes = {
    sm: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl md:text-7xl",
  };
  return (
    <div className="flex flex-col items-center">
      <h1
        className={`${sizes[size]} font-black tracking-wider`}
        style={{ color: "#FFD600" }}
      >
        Хард
        <span className="relative">
          Ворк
          <span
            className="absolute -bottom-1 left-0 w-full h-0.5"
            style={{ backgroundColor: "#FFD600" }}
          />
        </span>
      </h1>
      {size !== "sm" && (
        <p className="text-xs md:text-sm tracking-[0.3em] text-gray-400 mt-2 uppercase">
          Добавки для тех, кто пашет
        </p>
      )}
    </div>
  );
}

function StackCard({
  stack,
  onOrder,
}: {
  stack: (typeof STACKS_DRIVERS)[0];
  onOrder: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg border border-gray-800 bg-[#1E1E1E] overflow-hidden hover:border-gray-600 transition-all duration-300 flex flex-col"
      style={{ borderTopColor: stack.color, borderTopWidth: 3 }}
    >
      <div className="p-5 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{stack.icon}</span>
          <h3
            className="text-lg font-black tracking-wide"
            style={{ color: stack.color }}
          >
            {stack.name}
          </h3>
        </div>
        <p className="text-gray-400 text-sm italic mb-4">«{stack.tagline}»</p>

        <div className="space-y-2">
          {stack.items.map((item, i) => {
            const timeIcons: Record<string, string> = {
              утро: "☀️",
              обед: "🍽️",
              вечер: "🌙",
            };
            return (
              <div
                key={i}
                className="flex items-start gap-2 text-sm"
              >
                <span className="shrink-0 mt-0.5">
                  {timeIcons[item.time]}
                </span>
                <div>
                  <span className="text-white font-semibold">{item.name}</span>
                  <span className="text-gray-500"> — {item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {open && (
          <div className="mt-4 p-3 rounded bg-[#2A2A2A] text-xs text-gray-400 space-y-1">
            <p>📦 3 банки в заводской упаковке</p>
            <p>📋 Карточка-инструкция внутри</p>
            <p>⏱️ Курс: 2 месяца</p>
            <p>🔄 Принимать утро → обед → вечер</p>
          </div>
        )}
      </div>

      <div className="p-5 pt-0 space-y-2">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {open ? "▲ свернуть" : "▼ подробнее"}
        </button>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">
              {stack.price.toLocaleString("ru-RU")} ₽
            </span>
            <span className="text-xs text-gray-500 ml-2">3 банки</span>
          </div>
        </div>

        <button
          onClick={() => onOrder(stack.name)}
          className="w-full py-3 rounded font-bold text-sm tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: stack.color, color: "#1A1A1A" }}
        >
          ЗАКАЗАТЬ
        </button>
      </div>
    </div>
  );
}

function ComboCard({
  combo,
  onOrder,
}: {
  combo: (typeof COMBOS)[0];
  onOrder: (name: string) => void;
}) {
  return (
    <div className="rounded-lg border border-yellow-900/50 bg-gradient-to-b from-[#2A2200] to-[#1E1E1E] overflow-hidden hover:border-yellow-700/50 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-black text-[#FFD600] tracking-wide">
            🔥 {combo.name}
          </h3>
          <span className="text-xs px-2 py-1 rounded bg-red-900/50 text-red-400 font-bold">
            −{combo.saving.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-2">{combo.stacks}</p>
        <p className="text-sm text-gray-400 mb-4">{combo.desc}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-600 line-through text-sm">
            {combo.oldPrice.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-2xl font-black text-white">
            {combo.price.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-xs text-gray-500">
            {combo.jars} банок
          </span>
        </div>

        <button
          onClick={() => onOrder(combo.name)}
          className="w-full py-3 rounded font-bold text-sm tracking-wide bg-[#FFD600] text-[#1A1A1A] hover:brightness-110 active:scale-[0.98] transition-all duration-200"
        >
          ЗАКАЗАТЬ КОМБО
        </button>
      </div>
    </div>
  );
}

function FAQItem({ item }: { item: (typeof FAQ_DATA)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-[#FFD600] transition-colors"
      >
        <span className="font-semibold text-sm md:text-base pr-4">
          {item.q}
        </span>
        <span className="text-[#FFD600] text-xl shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-gray-400 text-sm leading-relaxed">
          {item.a}
        </p>
      )}
    </div>
  );
}

function BodyMap() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Силуэт тела — CSS art */}
      <div className="relative mx-auto" style={{ width: 120, height: 420 }}>
        {/* Голова */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-gray-600"
        />
        {/* Шея */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-3 h-4 border-x-2 border-gray-600"
        />
        {/* Торс */}
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-24 border-2 border-gray-600 rounded-b-lg"
        />
        {/* Руки */}
        <div
          className="absolute top-16 left-1/2 -translate-x-[52px] w-5 h-20 border-2 border-gray-600 rounded-b"
        />
        <div
          className="absolute top-16 left-1/2 translate-x-[32px] w-5 h-20 border-2 border-gray-600 rounded-b"
        />
        {/* Ноги */}
        <div
          className="absolute top-[152px] left-1/2 -translate-x-[18px] w-7 h-28 border-2 border-gray-600 rounded-b"
        />
        <div
          className="absolute top-[152px] left-1/2 translate-x-[10px] w-7 h-28 border-2 border-gray-600 rounded-b"
        />
        {/* Колени */}
        <div
          className="absolute top-[240px] left-1/2 -translate-x-[15px] w-4 h-4 rounded-full border-2 border-gray-500"
        />
        <div
          className="absolute top-[240px] left-1/2 translate-x-[12px] w-4 h-4 rounded-full border-2 border-gray-500"
        />
        {/* Голени */}
        <div
          className="absolute top-[258px] left-1/2 -translate-x-[16px] w-6 h-28 border-2 border-gray-600 rounded-b"
        />
        <div
          className="absolute top-[258px] left-1/2 translate-x-[10px] w-6 h-28 border-2 border-gray-600 rounded-b"
        />
      </div>

      {/* Выноски */}
      {BODY_ZONES.map((zone, zi) => {
        const positions = [
          { top: "5%", side: "left" },
          { top: "28%", side: "right" },
          { top: "46%", side: "left" },
          { top: "56%", side: "right" },
          { top: "72%", side: "left" },
        ];
        const pos = positions[zi];
        const isLeft = pos.side === "left";

        return (
          <div
            key={zi}
            className={`absolute ${isLeft ? "left-0 md:-left-4 text-right" : "right-0 md:-right-4 text-left"}`}
            style={{ top: pos.top, width: "38%" }}
          >
            <div
              className={`inline-block p-2 rounded text-xs bg-[#1E1E1E]/90 border border-gray-800`}
            >
              {zone.stacks.map((s, si) => (
                <div key={si} className="flex items-center gap-1 mb-1 last:mb-0">
                  <span>{s.icon}</span>
                  <span className="text-[#FFD600] font-bold">{s.name}</span>
                  <span className="text-gray-500 hidden sm:inline"> — {s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// ГЛАВНАЯ СТРАНИЦА
// ─────────────────────────────────────────────

export default function Home() {
  const [tab, setTab] = useState<"taxi" | "builder">("taxi");
  const [orderModal, setOrderModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formSent, setFormSent] = useState(false);

  const handleOrder = (stackName: string) => {
    setOrderModal(stackName);
    setFormSent(false);
    setFormData({ name: "", phone: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно отправить данные на API / в Telegram бот
    setFormSent(true);
  };

  const currentStacks =
    tab === "taxi" ? STACKS_DRIVERS : STACKS_BUILDERS;
  const currentCombos = COMBOS.filter((c) => c.audience === tab);

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#111111" }}
    >
      {/* ═══════════ НАВБАР ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <a
              href="#stacks"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden md:block"
            >
              Стеки
            </a>
            <a
              href="#combo"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden md:block"
            >
              Комбо
            </a>
            <a
              href="#faq"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden md:block"
            >
              Вопросы
            </a>
            <a
              href="#order"
              className="px-4 py-2 rounded text-xs font-bold bg-[#FFD600] text-[#1A1A1A] hover:brightness-110 transition-all"
            >
              ЗАКАЗАТЬ
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════ ГЕРОЙ ═══════════ */}
      <HazardStripe />
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Logo size="xl" />

          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Готовые наборы витаминов и минералов для водителей и строителей.
          </p>
          <p className="mt-2 text-gray-500">
            Не нужно разбираться — бери свой стек и пей по инструкции.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#stacks"
              className="px-8 py-4 rounded-lg text-base font-black bg-[#FFD600] text-[#1A1A1A] hover:brightness-110 transition-all active:scale-[0.98]"
            >
              ВЫБРАТЬ СВОЙ СТЕК →
            </a>
            <a
              href="#how"
              className="px-8 py-4 rounded-lg text-base font-bold border-2 border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all"
            >
              КАК ЭТО РАБОТАЕТ
            </a>
          </div>

          {/* Минимальная статистика */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { num: "3", label: "банки в стеке" },
              { num: "2", label: "месяца курс" },
              { num: "10", label: "стеков на выбор" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-black"
                  style={{ color: "#FFD600" }}
                >
                  {stat.num}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HazardStripe />

      {/* ═══════════ ПРОБЛЕМА ═══════════ */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            ЗНАКОМО?
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Если хотя бы 2 пункта про тебя — читай дальше
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg bg-[#1A1A1A] border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <span className="text-2xl shrink-0">{p.icon}</span>
                <span className="text-sm md:text-base text-gray-300">
                  {p.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl md:text-2xl font-bold text-white">
              Ты не болен. Ты на износе.
            </p>
            <p className="text-gray-500 mt-2">
              Организм работает без обслуживания. Пора это исправить.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ ЧТО ТАКОЕ СТЕК ═══════════ */}
      <section id="how" className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            ЧТО ТАКОЕ СТЕК
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "📦",
                title: "3 банки",
                desc: "Каждая банка — отдельный препарат. Утро, обед, вечер.",
              },
              {
                step: "02",
                icon: "📋",
                title: "Инструкция",
                desc: "Что пить, когда, сколько. Карточка внутри каждого набора.",
              },
              {
                step: "03",
                icon: "🔄",
                title: "2 месяца",
                desc: "Полный курс. Через 2 месяца — повтори или попробуй другой стек.",
              },
            ].map((s, i) => (
              <div key={i} className="text-center p-6">
                <div
                  className="text-5xl font-black mb-4"
                  style={{ color: "#FFD600", opacity: 0.2 }}
                >
                  {s.step}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg border border-gray-800 bg-[#1A1A1A] text-center">
            <p className="text-gray-400 text-sm">
              Не надо гуглить «какой магний лучше».
              <br />
              Не надо сравнивать 200 банок на маркетплейсе.
              <br />
              <span className="text-white font-bold">Мы уже всё собрали.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ АНАТОМИЧЕСКАЯ СХЕМА ═══════════ */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2">
            ТВОЁ ТЕЛО — ТВОЙ ИНСТРУМЕНТ
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Руководство по обслуживанию
          </p>

          <div className="relative" style={{ minHeight: 500 }}>
            <BodyMap />
          </div>
        </div>
      </section>

      {/* ═══════════ ПЕРЕКЛЮЧАТЕЛЬ АУДИТОРИИ ═══════════ */}
      <HazardStripe />
      <section id="stacks" className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            ВЫБЕРИ СВОЮ КАТЕГОРИЮ
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Стеки заточены под конкретные задачи
          </p>

          {/* Табы */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-700 overflow-hidden">
              <button
                onClick={() => setTab("taxi")}
                className={`px-6 py-3 text-sm font-bold transition-all ${
                  tab === "taxi"
                    ? "bg-[#FFD600] text-[#1A1A1A]"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                🚖 ВОДИТЕЛИ
              </button>
              <button
                onClick={() => setTab("builder")}
                className={`px-6 py-3 text-sm font-bold transition-all ${
                  tab === "builder"
                    ? "bg-[#FFD600] text-[#1A1A1A]"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                🏗️ СТРОИТЕЛИ
              </button>
            </div>
          </div>

          {/* Подзаголовок для аудитории */}
          <p className="text-center text-gray-500 text-sm mb-8">
            {tab === "taxi"
              ? "Таксисты • Дальнобойщики • Курьеры • Экспедиторы"
              : "Рабочие на стройке • Монтажники • Разнорабочие • Сварщики"}
          </p>

          {/* Карточки стеков */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStacks.map((stack) => (
              <StackCard
                key={stack.id}
                stack={stack}
                onOrder={handleOrder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ КОМБО ═══════════ */}
      <section id="combo" className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-4">
            🔥 КОМБО — БОЛЬШЕ ЗАЩИТЫ, МЕНЬШЕ ЦЕНА
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Бери 2–3 стека вместе — скидка до 20%. Дубли = усиленный курс.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCombos.map((combo) => (
              <ComboCard
                key={combo.id}
                combo={combo}
                onOrder={handleOrder}
              />
            ))}
          </div>
        </div>
      </section>
      <HazardStripe />

      {/* ═══════════ ДОВЕРИЕ ═══════════ */}
      <section className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            ПОЧЕМУ ХардВорк
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "✅",
                title: "Сертифицированные бренды",
                desc: "Бе Фёрст, Натур Фудс, Натурал Сапп — продаются в любом магазине спортпита",
              },
              {
                icon: "✅",
                title: "Открытый состав",
                desc: "Никаких «секретных формул». Дозировки проверяемые, состав на каждой банке",
              },
              {
                icon: "✅",
                title: "Доказательная база",
                desc: "Стеки собраны на основе клинических исследований. Ссылки в каждой инструкции",
              },
              {
                icon: "✅",
                title: "Не лекарство",
                desc: "Не заменяет врача. Но если ты здоров и хочешь оставаться — это минимальная забота",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-lg border border-gray-800 bg-[#1A1A1A]"
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ КАК ЗАКАЗАТЬ ═══════════ */}
      <section id="order" className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-12">
            КАК ЗАКАЗАТЬ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                icon: "👆",
                title: "Выбери стек",
                desc: "Или комбо — если хочешь максимальную защиту",
              },
              {
                num: "2",
                icon: "💬",
                title: "Напиши нам",
                desc: "ВотсАп, Телеграм — подтвердим заказ за 5 минут",
              },
              {
                num: "3",
                icon: "📦",
                title: "Получи набор",
                desc: "С инструкцией внутри. Начни курс в тот же день",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-6xl font-black mb-4"
                  style={{ color: "#FFD600", opacity: 0.15 }}
                >
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Контакты */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <a
              href="https://wa.me/79XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-[#25D366] text-white font-bold text-sm hover:brightness-110 transition-all"
            >
              💬 ВотсАп
            </a>
            <a
              href="https://t.me/hardvork_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-[#0088CC] text-white font-bold text-sm hover:brightness-110 transition-all"
            >
              ✈️ Телеграм
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
            ВОПРОСЫ
          </h2>

          <div>
            {FAQ_DATA.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ФИНАЛЬНЫЙ CTA ═══════════ */}
      <HazardStripe />
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">ГОТОВ?</h2>
          <p className="text-gray-400 mb-8">
            Выбери свой стек. Начни курс сегодня.
            <br />
            Через 2 недели почувствуешь разницу.
          </p>

          <a
            href="#stacks"
            className="inline-block px-10 py-5 rounded-lg text-lg font-black bg-[#FFD600] text-[#1A1A1A] hover:brightness-110 transition-all active:scale-[0.98]"
          >
            ВЫБРАТЬ СТЕК И ЗАКАЗАТЬ →
          </a>

          <p className="mt-8 text-xs text-gray-600">
            Не является лекарственным средством. БАД.
            <br />
            Перед применением проконсультируйтесь с врачом.
          </p>
        </div>
      </section>
      <HazardStripe />

      {/* ═══════════ ФУТЕР ═══════════ */}
      <footer className="py-12 px-4 bg-[#0A0A0A] border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />

            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#stacks" className="hover:text-white transition-colors">
                Стеки
              </a>
              <a href="#combo" className="hover:text-white transition-colors">
                Комбо
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                Вопросы
              </a>
              <a href="#order" className="hover:text-white transition-colors">
                Заказать
              </a>
            </div>

            <div className="text-xs text-gray-600 text-center md:text-right">
              <p>© 2025 ХардВорк</p>
              <p>Добавки для тех, кто пашет</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ МОДАЛКА ЗАКАЗА ═══════════ */}
      {orderModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderModal(null);
          }}
        >
          <div className="w-full max-w-md rounded-lg border border-gray-700 bg-[#1A1A1A] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-[#FFD600]">
                ЗАКАЗ: {orderModal}
              </h3>
              <button
                onClick={() => setOrderModal(null)}
                className="text-gray-500 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {formSent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h4 className="text-lg font-bold mb-2">Заявка отправлена!</h4>
                <p className="text-sm text-gray-400 mb-6">
                  Мы свяжемся с тобой в течение 30 минут для подтверждения
                  заказа.
                </p>
                <button
                  onClick={() => setOrderModal(null)}
                  className="px-6 py-3 rounded bg-[#FFD600] text-[#1A1A1A] font-bold text-sm hover:brightness-110 transition-all"
                >
                  ЗАКРЫТЬ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded bg-[#111] border border-gray-700 text-white text-sm focus:border-[#FFD600] focus:outline-none transition-colors"
                    placeholder="Как тебя зовут"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded bg-[#111] border border-gray-700 text-white text-sm focus:border-[#FFD600] focus:outline-none transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <p className="text-xs text-gray-600">
                  Или напиши напрямую:{" "}
                  <a
                    href="https://t.me/hardvork_bot"
                    className="text-[#0088CC] hover:underline"
                  >
                    Телеграм
                  </a>{" "}
                  /{" "}
                  <a
                    href="https://wa.me/79XXXXXXXXX"
                    className="text-[#25D366] hover:underline"
                  >
                    ВотсАп
                  </a>
                </p>

                <button
                  type="submit"
                  className="w-full py-4 rounded font-black text-sm bg-[#FFD600] text-[#1A1A1A] hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>

                <p className="text-[10px] text-gray-600 text-center">
                  Нажимая кнопку, ты соглашаешься на обработку персональных
                  данных
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
