let keyWords = 
  [
    "воздушные линии",
    "на деревянных опорах",
    "на металлических опорах",
    "на железобетонных опорах",
    "изолированным",
    "неизолированным",
    "медным проводом",
    "стальным проводом",
    "сталеалюминиевым проводом",
    "алюминиевым проводом",
    "сечением до 50 квадратных мм включительно",
    "сечением от 50 до 100 квадратных мм включительно",
    "сечением от 100 до 200 квадратных мм включительно",
    "сечением от 200 до 500 квадратных мм включительно",
    "сечением от 500 до 800 квадратных мм включительно",
    "сечением свыше 800 квадратных мм",
    "0,4 кВ и ниже",
    "1−20 кВ",
    "27,5−60 кВ",
    "110 кВ и выше",


    "кабельные линии",
    "в траншеях",
    "в блоках",
    "в каналах",
    "в туннелях и коллекторах",
    "в галереях и на эстакадах",
    "прокладываемые путем горизонтального наклонного бурения,",
    "одножильные",
    "многожильные",
    "с резиновой или пластмассовой изоляцией",
    "с бумажной изоляцией",
    "сечением провода до 50 квадратных мм включительно",
    "сечением провода от 50 до 100 квадратных мм включительно",
    "сечением провода от 100 до 200 квадратных мм включительно",
    "сечением провода от 200 до 250 квадратных мм включительно",
    "сечением провода от 250 до 300 квадратных мм включительно",
    "сечением провода от 300 до 400 квадратных мм включительно",
    "сечением провода от 400 до 500 квадратных мм включительно",
    "сечением провода от 500 до 800 квадратных мм включительно",
    "сечением провода свыше 800 квадратных мм",
    "1−10 кВ",
    "15−20 кВ",
    "с одним кабелем в траншее",
    "с одним кабелем в блоке",
    "с одним кабелем в канале",
    "с одним кабелем в туннеле или коллекторе",
    "с одним кабелем в галерее или на эстакаде",
    "с двумя кабелями в траншее",
    "с двумя кабелями в блоке",
    "с двумя кабелями в канале",
    "с двумя кабелями в туннеле или коллекторе",
    "с двумя кабелями в галерее или на эстакаде",
    "с тремя кабелями в траншее",
    "с тремя кабелями в блоке",
    "с тремя кабелями в канале",
    "с тремя кабелями в туннеле или коллекторе",
    "с тремя кабелями в галерее или на эстакаде",
    "с четырьмя кабелями в траншее",
    "с четырьмя кабелями в блоке",
    "с четырьмя кабелями в канале",
    "с четырьмя кабелями в туннеле или коллекторе",
    "с четырьмя кабелями в галерее или на эстакаде",
    "с количеством кабелей в траншее более четырех",
    "с количеством кабелей в блоке более четырех",
    "с количеством кабелей в канале более четырех",
    "с количеством кабелей в туннеле или коллекторе более четырех",
    "с количеством кабелей в галерее или на эстакаде более четырех",

    "сечением провода более 800 квадратных мм",
    "с одной трубой в скважине",
    "с двумя трубами в скважине",
    "с тремя трубами в скважине",
    "с четырьмя трубами в скважине",
    "с количеством труб в скважине более четырех",


    "средства коммерческого учета электрической энергии (мощности)",
    "однофазные",
    "трехфазные",
    "прямого включения",
    "косвенного включения",
    "полукосвенного включения",
    "35 кВ",


    "реклоузеры",
    "линейные разъединители",
    "выключатели нагрузки, устанавливаемые вне трансформаторных подстанций и распределительных и переключательных пунктов",
    "распределительные пункты (РП), за исключением комплектных распределительных устройств наружной установки (КРН, КРУН),",
    "комплектные распределительные устройства наружной установки (КРН, КРУН)",
    "переключательные пункты",
    "номинальным током до 100 А включительно",
    "номинальным током от 100 до 250 А включительно",
    "номинальным током от 250 до 500 А включительно",
    "номинальным током от 500 до 1000 А включительно",
    "номинальным током свыше 1000 А",
    "с количеством ячеек до 5 включительно",
    "с количеством ячеек от 5 до 10 включительно",
    "с количеством ячеек от 10 до 15 включительно",
    "с количеством ячеек свыше 15",


    "однотрансформаторные подстанции (за исключением РТП)",
    "двухтрансформаторные и более подстанции (за исключением РТП)",
    "столбового/мачтового типа",
    "шкафного или киоскового типа",
    "блочного типа",
    "встроенного типа",
    "6/0,4 кВ",
    "10/0,4 кВ",
    "20/0,4 кВ",
    "6/10(10/6) кВ",
    "10/20(20/10) кВ",
    "6/20(20/6) кВ",
    "мощностью до 25 кВА включительно",
    "мощностью от 25 до 100 кВА включительно",
    "мощностью от 100 до 250 кВА включительно",
    "мощностью от 250 до 400 кВА включительно",
    "мощностью от 400 до 630 кВА включительно",
    "мощностью от 630 до 1000 кВА включительно",
    "мощностью от 1000 до 1250 кВА включительно",
    "мощностью от 1250 до 1600 кВА включительно",
    "мощностью от 1600 до 2000 кВА включительно",
    "мощностью от 2000 до 2500 кВА включительно",
    "мощностью от 2500 до 3150 кВА включительно",
    "мощностью от 3150 до 4000 кВА включительно",
    "мощностью свыше 4000 кВА",

    
    "распределительные однотрансформаторные подстанции",
    "распределительные двухтрансформаторные и более подстанции",
    "мощностью свыше 3150 кВА",
    "открытого типа",
    "закрытого типа",


    "35/6(10) кВ",
    "35/0,4 кВ",
    "110/35 кВ",
    "110/6(10) кВ",
    "110/35/6(10) кВ",
    "мощностью до 6,3 МВА включительно",
    "мощностью от 6,3 до 10 МВА включительно",
    "мощностью от 10 до 16 МВА включительно",
    "мощностью от 16 до 25 МВА включительно",
    "мощностью от 25 до 32 МВА включительно",
    "мощностью от 32 до 40 МВА включительно",
    "мощностью от 40 до 63 МВА включительно",
    "мощностью от 63 до 80 МВА включительно",
    "мощностью от 80 до 100 МВА включительно",
    "мощностью свыше 100 МВА"
      
  ];

  export default keyWords;