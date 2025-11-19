import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  findNodeHandle,
  UIManager
} from 'react-native';

import PantallaBase from '../components/PantallaBase';
import { Ionicons } from '@expo/vector-icons';


const OFFSET_X = 100;

const elementos = [
  {
    simbolo: 'H',
    numero: 1,
    nombre: 'Hidrógeno',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFcXnf-SGC8eK2lzVZjOrM_WrOWNxSPFUIQ&s',
    definicion: 'Gas incoloro, inodoro y altamente inflamable. Es el más ligero y abundante del universo.',
    curioso: 'Forma parte del agua y del 90% de las estrellas.',
    tipo: 'No metal',
    grupo: 1,
    periodo: 1
  },
  {
    simbolo: 'He',
    numero: 2,
    nombre: 'Helio',
    imagen: 'https://profearantxa.es/wp-content/uploads/2022/10/2022-10-08-at-23-14-00.png',
    definicion: 'Gas noble, incoloro e inerte. Segundo elemento más abundante en el universo.',
    curioso: 'Se usa en globos y en criogenia por su bajo punto de ebullición.',
    tipo: 'Gas noble',
    grupo: 18,
    periodo: 1
  },
{
  simbolo: 'Li',
  numero: 3,
  nombre: 'Litio',
  imagen: 'https://images.ecestaticos.com/7h3i3DTokfFaM3C7ExWDY65JX8k=/246x68:2175x1515/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Febb%2F97b%2F31e%2Febb97b31e26102fac36eba521365a96d.jpg',
  definicion: 'Metal alcalino blando y plateado. Reacciona fácilmente con el agua.',
  curioso: 'Se usa en baterías recargables y medicamentos para el trastorno bipolar.',
  tipo: 'Metal alcalino',
  grupo: 1,
  periodo: 2
},
{
  simbolo: 'Be',
  numero: 4,
  nombre: 'Berilio',
  imagen: 'https://www.lenntech.com/images/espanol/tabla-peiodica/Be.htm8.jpg',
  definicion: 'Metal alcalinotérreo duro y quebradizo. Tóxico en altas concentraciones.',
  curioso: 'Se usa en aleaciones ligeras para aeronáutica.',
  tipo: 'Metal alcalinotérreo',
  grupo: 2,
  periodo: 2
},
{
  simbolo: 'B',
  numero: 5,
  nombre: 'Boro',
  imagen: 'https://chemcess.com/wp-content/uploads/2023/11/boron.jpg',
  definicion: 'Metaloide esencial en plantas. Tiene propiedades semiconductoras.',
  curioso: 'Se usa en detergentes y vidrios resistentes al calor.',
  tipo: 'Metaloide',
  grupo: 13,
  periodo: 2
},
{
  simbolo: 'C',
  numero: 6,
  nombre: 'Carbono',
  imagen: 'https://content.nationalgeographic.com.es/medio/2024/06/25/carbono-carbon_666f57ef_240625120908_1280x852.jpg',
  definicion: 'Elemento esencial para la vida. Forma compuestos orgánicos.',
  curioso: 'Puede formar diamantes o grafito, según su estructura.',
  tipo: 'No metal',
  grupo: 14,
  periodo: 2
},
{
  simbolo: 'N',
  numero: 7,
  nombre: 'Nitrógeno',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssXXYbcqsxsBSebEuON3hMfXQEzxY9oLJ_g&s',
  definicion: 'Gas incoloro que forma el 78% del aire. Es esencial para proteínas.',
  curioso: 'Se usa en fertilizantes y atmósferas inertes.',
  tipo: 'No metal',
  grupo: 15,
  periodo: 2
},
{
  simbolo: 'O',
  numero: 8,
  nombre: 'Oxígeno',
  imagen: 'https://media.istockphoto.com/id/1438098691/es/vector/modelos-de-mol%C3%A9culas-de-o2-de-ox%C3%ADgeno-ilustraci%C3%B3n-vectorial-de-fondo-azul-cosm%C3%A9ticos-de.jpg?s=612x612&w=0&k=20&c=z_zPBs9QWrrAzs7jNATo4IiMKrp5tNSebt3SQiwm24U=',
  definicion: 'Gas vital para la respiración. Forma parte del agua.',
  curioso: 'Es el tercer elemento más abundante en el universo.',
  tipo: 'No metal',
  grupo: 16,
  periodo: 2
},
{
  simbolo: 'F',
  numero: 9,
  nombre: 'Flúor',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlAQs3b2LkAdyEErN37EEJszuALH28tfZhA&s',
  definicion: 'Gas amarillo pálido, altamente reactivo. El más electronegativo.',
  curioso: 'Se usa en pastas dentales y refrigerantes.',
  tipo: 'Halógeno',
  grupo: 17,
  periodo: 2
},
{
  simbolo: 'Ne',
  numero: 10,
  nombre: 'Neón',
  imagen: 'https://i.ytimg.com/vi/Wwgy8av_WRM/maxresdefault.jpg',
  definicion: 'Gas noble incoloro. Brilla en rojo en tubos de descarga.',
  curioso: 'Se usa en letreros luminosos y láseres.',
  tipo: 'Gas noble',
  grupo: 18,
  periodo: 2
},
{
  simbolo: 'Na',
  numero: 11,
  nombre: 'Sodio',
  imagen: 'https://media.istockphoto.com/id/1789527265/es/foto/s%C3%ADmbolo-del-elemento-de-sodio-de-la-tabla-peri%C3%B3dica-en-espa%C3%B1ol-cerca-de-sodio-met%C3%A1lico-aislado.jpg?s=612x612&w=0&k=20&c=urwCYX1W8Kz_N-_FcPE2YO8uccgbLQ58ciTSzEoncPw=',
  definicion: 'Metal alcalino blando y plateado. Reacciona violentamente con agua.',
  curioso: 'Es esencial en la transmisión nerviosa y se encuentra en la sal común.',
  tipo: 'Metal alcalino',
  grupo: 1,
  periodo: 3
},-
{
  simbolo: 'Mg',
  numero: 12,
  nombre: 'Magnesio',
  imagen: 'https://geologiaweb.com/wp-content/uploads/2021/04/magnesio.jpg',
  definicion: 'Metal alcalinotérreo ligero. Arde con llama blanca brillante.',
  curioso: 'Se usa en fuegos artificiales y aleaciones ligeras.',
  tipo: 'Metal alcalinotérreo',
  grupo: 2,
  periodo: 3
},
{
  simbolo: 'Al',
  numero: 13,
  nombre: 'Aluminio',
  imagen: 'https://www.shutterstock.com/image-photo/aluminum-ingot-bar-next-ore-260nw-2005139579.jpg',
  definicion: 'Metal ligero, resistente a la corrosión. Muy abundante en la corteza terrestre.',
  curioso: 'Se usa en latas, aviones y ventanas.',
  tipo: 'Post-metal',
  grupo: 13,
  periodo: 3
},
{
  simbolo: 'Si',
  numero: 14,
  nombre: 'Silicio',
  imagen: 'https://geologiaweb.com/wp-content/uploads/2021/04/silicio.jpg',
  definicion: 'Metaloide semiconductivo. Fundamental en la electrónica moderna.',
  curioso: 'Es la base de los microchips y paneles solares.',
  tipo: 'Metaloide',
  grupo: 14,
  periodo: 3
},
{
  simbolo: 'P',
  numero: 15,
  nombre: 'Fósforo',
  imagen: 'https://concepto.de/wp-content/uploads/2024/08/fosforo-blanco.jpg',
  definicion: 'No metal esencial para la vida. Forma parte del ADN y huesos.',
  curioso: 'El fósforo blanco es altamente reactivo y peligroso.',
  tipo: 'No metal',
  grupo: 15,
  periodo: 3
},
{
  simbolo: 'S',
  numero: 16,
  nombre: 'Azufre',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlW_LaUE6Lk_5grfKbk0UlLV6TIWjIhA3hA&s',
  definicion: 'No metal amarillo, presente en proteínas y volcanes.',
  curioso: 'Se usa en pólvora, fertilizantes y tratamientos médicos.',
  tipo: 'No metal',
  grupo: 16,
  periodo: 3
},
{
  simbolo: 'Cl',
  numero: 17,
  nombre: 'Cloro',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMmw2QV6wlpFuFTyaTICWbROCEYjJsqC66Q&s',
  definicion: 'Gas verde amarillento, muy reactivo. Se usa como desinfectante.',
  curioso: 'Es vital en la producción de PVC y purificación de agua.',
  tipo: 'Halógeno',
  grupo: 17,
  periodo: 3
},
{
  simbolo: 'Ar',
  numero: 18,
  nombre: 'Argón',
  imagen: 'https://img.freepik.com/vector-premium/elemento-argon-concepto-quimica-tabla-periodica-elementos_635702-508.jpg',
  definicion: 'Gas noble incoloro. No reacciona fácilmente.',
  curioso: 'Se usa en iluminación y atmósferas protectoras para soldadura.',
  tipo: 'Gas noble',
  grupo: 18,
  periodo: 3
},
{
  simbolo: 'K',
  numero: 19,
  nombre: 'Potasio',
  imagen: 'https://profearantxa.es/wp-content/uploads/2022/10/2022-10-11-at-15-24-06.png',
  definicion: 'Metal alcalino blando. Esencial para funciones celulares.',
  curioso: 'Reacciona violentamente con agua y se almacena en aceite.',
  tipo: 'Metal alcalino',
  grupo: 1,
  periodo: 4
},
{
  simbolo: 'Ca',
  numero: 20,
  nombre: 'Calcio',
  imagen: 'https://profearantxa.es/wp-content/uploads/2022/10/2022-10-11-at-15-27-34.png',
  definicion: 'Metal alcalinotérreo. Fundamental para huesos y dientes.',
  curioso: 'Se encuentra en la leche y en rocas como la caliza.',
  tipo: 'Metal alcalinotérreo',
  grupo: 2,
  periodo: 4
},
{
  simbolo: 'Sc',
  numero: 21,
  nombre: 'Escandio',
  imagen: 'https://mineriaenlinea.com/wp-content/uploads/2020/05/escandio-e1590616640684.jpeg',
  definicion: 'Metal de transición ligero. Poco común pero útil en aleaciones.',
  curioso: 'Se usa en bicicletas de alto rendimiento.',
  tipo: 'Metal de transición',
  grupo: 3,
  periodo: 4
},
{
  simbolo: 'Ti',
  numero: 22,
  nombre: 'Titanio',
  imagen: 'https://significado.com/wp-content/uploads/2015/05/Titanio.jpg',
  definicion: 'Metal fuerte y ligero. Resistente a la corrosión.',
  curioso: 'Se usa en prótesis, aviones y joyería.',
  tipo: 'Metal de transición',
  grupo: 4,
  periodo: 4
},
{
  simbolo: 'V',
  numero: 23,
  nombre: 'Vanadio',
  imagen: 'https://www.gaceta.unam.mx/wp-content/uploads/2019/02/190218-Aca4-des-f1-eritronio-vanadio.jpg',
  definicion: 'Metal de transición duro. Mejora la resistencia del acero.',
  curioso: 'Se usa en herramientas y turbinas.',
  tipo: 'Metal de transición',
  grupo: 5,
  periodo: 4
},
{
  simbolo: 'Cr',
  numero: 24,
  nombre: 'Cromo',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIWpYlMDILWzK8wdElNl2S7pR_uVHbteT1A&s',
  definicion: 'Metal brillante y resistente. Usado en recubrimientos.',
  curioso: 'Da el brillo a los autos y utensilios cromados.',
  tipo: 'Metal de transición',
  grupo: 6,
  periodo: 4
},
{
  simbolo: 'Mn',
  numero: 25,
  nombre: 'Manganeso',
  imagen: 'https://comunidadesautlan.com/wp-content/uploads/2018/08/manganeso-para-que-sirve.jpg',
  definicion: 'Metal de transición duro y frágil. Importante en aleaciones.',
  curioso: 'Es esencial para el metabolismo y se usa en baterías.',
  tipo: 'Metal de transición',
  grupo: 7,
  periodo: 4
},
{
  simbolo: 'Fe',
  numero: 26,
  nombre: 'Hierro',
  imagen: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Iron_electrolytic_and_1cm3_cube.jpg',
  definicion: 'Metal de transición fuerte y maleable. Vital en la sangre.',
  curioso: 'Forma el núcleo de la Tierra y se oxida formando óxido (herrumbre).',
  tipo: 'Metal de transición',
  grupo: 8,
  periodo: 4
},
{
  simbolo: 'Co',
  numero: 27,
  nombre: 'Cobalto',
  imagen: 'https://codam.com.ar/wp-content/uploads/2021/01/cobalto-3-ch.jpg',
  definicion: 'Metal de transición azul grisáceo. Se usa en imanes y pigmentos.',
  curioso: 'Es parte de la vitamina B12 y se usa en baterías.',
  tipo: 'Metal de transición',
  grupo: 9,
  periodo: 4
},
{
  simbolo: 'Ni',
  numero: 28,
  nombre: 'Níquel',
  imagen: 'https://storage.googleapis.com/stateless-mexicominero-org/2023/02/457a8f95-niquel.png',
  definicion: 'Metal de transición resistente a la corrosión. Usado en monedas.',
  curioso: 'Se usa en acero inoxidable y baterías recargables.',
  tipo: 'Metal de transición',
  grupo: 10,
  periodo: 4
},
{
  simbolo: 'Cu',
  numero: 29,
  nombre: 'Cobre',
  imagen: 'https://storage.googleapis.com/stateless-mexicominero-org/2023/02/05547643-cobre.png',
  definicion: 'Metal rojizo conductor de electricidad. Usado desde la antigüedad.',
  curioso: 'Forma parte de cables, monedas y esculturas.',
  tipo: 'Metal de transición',
  grupo: 11,
  periodo: 4
},
{
  simbolo: 'Zn',
  numero: 30,
  nombre: 'Zinc',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfcVHzbLYBb6LknR4BB7FMn67MMHEWyTvpg&s',
  definicion: 'Metal gris azulado. Protege contra la corrosión.',
  curioso: 'Se usa en cremas solares y galvanizado de metales.',
  tipo: 'Metal de transición',
  grupo: 12,
  periodo: 4
},
{
  simbolo: 'Ga',
  numero: 31,
  nombre: 'Galio',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfcVHzbLYBb6LknR4BB7FMn67MMHEWyTvpg&s',
  definicion: 'Metal que se derrite en la mano. Usado en semiconductores.',
  curioso: 'Se usa en LEDs y termómetros sin mercurio.',
  tipo: 'Post-metal',
  grupo: 13,
  periodo: 4
},
{
  simbolo: 'Ge',
  numero: 32,
  nombre: 'Germanio',
  imagen: 'https://clickmica.fundaciondescubre.es/files/2020/05/512px-Germanium.jpg',
  definicion: 'Metaloide semiconductivo. Similar al silicio.',
  curioso: 'Se usa en fibra óptica y detectores infrarrojos.',
  tipo: 'Metaloide',
  grupo: 14,
  periodo: 4
},
{
  simbolo: 'As',
  numero: 33,
  nombre: 'Arsénico',
  imagen: 'https://media.istockphoto.com/id/184957763/es/foto/sulfuro-de-ars%C3%A9nico-mineral.jpg?s=612x612&w=0&k=20&c=GJrPuLkOyoA8XWRwEWMlfzODxxdVKo_JZ1US_M05Z6E=',
  definicion: 'Metaloide tóxico. Usado en pesticidas y semiconductores.',
  curioso: 'Fue usado históricamente como veneno.',
  tipo: 'Metaloide',
  grupo: 15,
  periodo: 4
},
{
  simbolo: 'Se',
  numero: 34,
  nombre: 'Selenio',
  imagen: 'https://www.ecured.cu/images/thumb/0/04/Selenio_4.JPG/260px-Selenio_4.JPG',
  definicion: 'No metal esencial en pequeñas cantidades. Fotoconductor.',
  curioso: 'Se usa en fotocopiadoras y suplementos nutricionales.',
  tipo: 'No metal',
  grupo: 16,
  periodo: 4
},
{
  simbolo: 'Br',
  numero: 35,
  nombre: 'Bromo',
  imagen: 'https://ichef.bbci.co.uk/ace/ws/640/amz/worldservice/live/assets/images/2014/10/10/141010142536_bromo_640_624x351_spl.jpg.webp',
  definicion: 'Líquido rojo oscuro. Halógeno reactivo.',
  curioso: 'Se usa en retardantes de llama y fotografía.',
  tipo: 'Halógeno',
  grupo: 17,
  periodo: 4
},
{
  simbolo: 'Kr',
  numero: 36,
  nombre: 'Kriptón',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvEClAkA86MSwnCFY7kGAlsFVcfJMP1FsHw&s',
  definicion: 'Gas noble incoloro. Brilla en tubos de descarga.',
  curioso: 'Se usa en iluminación y fotografía de alta velocidad.',
  tipo: 'Gas noble',
  grupo: 18,
  periodo: 4
}
  
];
const combinaciones = [
  {
    elementos: ['H', 'O'],
    compuesto: 'Agua (H₂O)',
    imagen: 'https://img.freepik.com/premium-vector/water-h2o-molecule-models-blue-chemical-formulas-natural_228260-462.jpg',
    definicion: 'Compuesto vital formado por dos átomos de hidrógeno y uno de oxígeno.',
    curioso: 'Cubre el 71% de la superficie terrestre y es esencial para la vida.'
  },
  {
    elementos: ['Na', 'Cl'],
    compuesto: 'Sal común (NaCl)',
    imagen: 'https://www.lifeder.com/wp-content/uploads/2018/09/cloruro-de-sodio-1068x715.jpg',
    definicion: 'Cristal blanco formado por sodio y cloro. Usado como condimento.',
    curioso: 'Fue tan valiosa que se usaba como moneda en la antigüedad.'
  },
  {
    elementos: ['Fe', 'O'],
    compuesto: 'Óxido de hierro (Fe₂O₃)',
    imagen: 'https://m.media-amazon.com/images/I/81KH4wmU-2L._SL1500_.jpg',
    definicion: 'Compuesto que forma la herrumbre, resultado de la oxidación del hierro.',
    curioso: 'La herrumbre puede debilitar estructuras metálicas si no se controla.'
  },
  {
    elementos: ['C', 'O'],
    compuesto: 'Dióxido de carbono (CO₂)',
    imagen: 'https://concepto.de/wp-content/uploads/2018/04/co2-min-e1523637201853.jpg',
    definicion: 'Gas formado por carbono y oxígeno, presente en la atmósfera.',
    curioso: 'Las plantas lo absorben durante la fotosíntesis para producir oxígeno.'
  },
  {
    elementos: ['Ca', 'C'],
    compuesto: 'Carbonato de calcio (CaCO₃)',
    imagen: 'https://cdn.awsli.com.br/600x700/957/957939/produto/229015672/carbonato-de-calcio-czxs4f752z.jpg',
    definicion: 'Sustancia presente en rocas como la caliza y en conchas marinas.',
    curioso: 'Es el principal componente de la tiza escolar tradicional.'
  },
  {
  elementos: ['Mg', 'O'],
  compuesto: 'Óxido de magnesio (MgO)',
  imagen: 'https://www.ecured.cu/images/9/94/Oxido_de_magnesio.jpg',
  definicion: 'Compuesto blanco resultante de la combustión del magnesio en presencia de oxígeno.',
  curioso: 'Se usa como antiácido y aislante térmico en laboratorios.'
},
{
  elementos: ['Al', 'Cl'],
  compuesto: 'Cloruro de aluminio (AlCl₃)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2018/03/Cloruro-de-aluminio-lifeder-imagen-min.jpg',
  definicion: 'Sal formada por aluminio y cloro, usada como catalizador en química orgánica.',
  curioso: 'Es higroscópico: absorbe agua del ambiente y se vuelve gelatinoso.'
},
{
  elementos: ['K', 'Br'],
  compuesto: 'Bromuro de potasio (KBr)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2021/01/Potassium_bromide.jpg',
  definicion: 'Sal incolora usada en fotografía y medicina.',
  curioso: 'En el siglo XIX se usaba como sedante y anticonvulsivo.'
},
{
  elementos: ['N', 'H'],
  compuesto: 'Amoníaco (NH₃)',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdxMSXgbQGTx66_R8FTsn3A49QkCPBCfDkQ&s',
  definicion: 'Gas incoloro con olor fuerte, compuesto de nitrógeno e hidrógeno.',
  curioso: 'Es esencial en fertilizantes y también se usa en productos de limpieza.'
},
{
  elementos: ['C', 'H'],
  compuesto: 'Metano (CH₄)',
  imagen: 'https://img.freepik.com/fotos-premium/ch4-metano-formula-quimica-estructura-quimica-3d-ilustracion-3d_118019-4691.jpg?w=2000',
  definicion: 'Gas inflamable compuesto por carbono e hidrógeno, principal componente del gas natural.',
  curioso: 'Es uno de los gases de efecto invernadero más potentes.'
},
{
  elementos: ['Ca', 'Cl'],
  compuesto: 'Cloruro de calcio (CaCl₂)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2021/02/Cloruro-de-calcio-esquema-lifeder.jpg',
  definicion: 'Sal blanca usada para deshielo, conservación de alimentos y control de humedad.',
  curioso: 'Produce calor al disolverse en agua.'
},
{
  elementos: ['Na', 'S'],
  compuesto: 'Sulfuro de sodio (Na₂S)',
  imagen: 'https://www.qdsincerechem.com/wp-content/uploads/2022/11/11-1.jpg',
  definicion: 'Compuesto iónico usado en curtido de cuero y tratamiento de aguas.',
  curioso: 'Tiene un olor característico a huevos podridos por el azufre.'
},
{
  elementos: ['H', 'Cl'],
  compuesto: 'Ácido clorhídrico (HCl)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2021/12/foto-acido-clorhidrico.jpg',
  definicion: 'Solución acuosa de cloruro de hidrógeno, altamente corrosiva.',
  curioso: 'Está presente en el jugo gástrico del estómago humano.'
},
{
  elementos: ['C', 'O'],
  compuesto: 'Monóxido de carbono (CO)',
  imagen: 'https://www.paramedic.com.ar/wp-content/uploads/2022/05/portada-monoxido_Mesa-de-trabajo-1.jpg',
  definicion: 'Gas tóxico incoloro e inodoro, producto de combustión incompleta.',
  curioso: 'Se une a la hemoglobina más fácilmente que el oxígeno, lo que lo hace peligroso.'
},
{
  elementos: ['H', 'N'],
  compuesto: 'Hidrazina (N₂H₄)',
  imagen: 'https://www.shutterstock.com/image-vector/lewis-structure-hydrazine-n2h4-scientific-260nw-2229842605.jpg',
  definicion: 'Líquido incoloro usado como combustible en cohetes y reactores químicos.',
  curioso: 'Es altamente reactiva y se usa en sistemas de propulsión espacial.'
},
{
  elementos: ['Li', 'O'],
  compuesto: 'Óxido de litio (Li₂O)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2022/11/oxido-de-litio.jpg',
  definicion: 'Compuesto blanco formado por litio y oxígeno, usado en cerámica y vidrio.',
  curioso: 'Es altamente reactivo y se usa en baterías de litio.'
},
{
  elementos: ['Ba', 'Cl'],
  compuesto: 'Cloruro de bario (BaCl₂)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2022/11/cloruro-de-bario.jpg',
  definicion: 'Sal blanca soluble en agua, usada en laboratorios y fuegos artificiales.',
  curioso: 'Produce una llama verde brillante al quemarse.'
},
{
  elementos: ['Zn', 'S'],
  compuesto: 'Sulfuro de zinc (ZnS)',
  imagen: 'https://photonexport.com/wp-content/uploads/2022/05/ZINC.jpg',
  definicion: 'Compuesto blanco usado en pantallas fluorescentes y pinturas luminiscentes.',
  curioso: 'Brilla en la oscuridad cuando se activa con luz ultravioleta.'
},
{
  elementos: ['Cu', 'O'],
  compuesto: 'Óxido de cobre (CuO)',
  imagen: 'https://image.made-in-china.com/202f0j00NKWkYwlswqbV/99-Cuo-Cupric-Oxide-Copper-Oxide-Copper-II-Oxide-CAS-1317-38-0.webp',
  definicion: 'Sólido negro formado por cobre y oxígeno, usado como pigmento y catalizador.',
  curioso: 'Es responsable del color verdoso de estatuas de cobre envejecidas.'
},
{
  elementos: ['Si', 'O'],
  compuesto: 'Dióxido de silicio (SiO₂)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2019/12/600px-Silicon_dioxide-2D-dimensions.jpg',
  definicion: 'Mineral abundante en la corteza terrestre, base del vidrio y arena.',
  curioso: 'El cuarzo es una forma cristalina de este compuesto.'
},
{
  elementos: ['P', 'O'],
  compuesto: 'Pentóxido de fósforo (P₂O₅)',
  imagen: 'https://image.made-in-china.com/202f0j00aWcuQqhGJVoJ/Indutrial-Grade-P2o5-Phosphorus-Pentoxide-Used-for-Raw-Materials.jpg',
  definicion: 'Compuesto blanco altamente higroscópico, usado como desecante.',
  curioso: 'Absorbe agua tan rápido que puede generar calor al contacto.'
},
{
  elementos: ['Mg', 'Cl'],
  compuesto: 'Cloruro de magnesio (MgCl₂)',
  imagen: 'https://m.media-amazon.com/images/I/91JHrjU4FnL._AC_SL1500_.jpg',
  definicion: 'Sal blanca usada como suplemento mineral y descongelante.',
  curioso: 'Se extrae del agua de mar y se usa en tofu japonés.'
},
{
  elementos: ['Al', 'O'],
  compuesto: 'Óxido de aluminio (Al₂O₃)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2018/03/oxido-de-aluminio-esquema-lifeder-min.jpg',
  definicion: 'Compuesto duro y resistente, base del corindón y zafiro.',
  curioso: 'Se usa en papel de lija y como aislante eléctrico.'
},
{
  elementos: ['K', 'I'],
  compuesto: 'Yoduro de potasio (KI)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2020/02/Jodid_draseln%C3%BD_480px.jpg',
  definicion: 'Sal blanca usada en medicina y fotografía.',
  curioso: 'Se administra en emergencias nucleares para proteger la tiroides.'
},
{
  elementos: ['Ca', 'O'],
  compuesto: 'Óxido de calcio (CaO)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2018/04/apariencia-del-oxido-de-calcio-min-1024x682.jpg',
  definicion: 'Sustancia blanca conocida como cal viva, usada en construcción.',
  curioso: 'Reacciona violentamente con agua, liberando calor.'
},
{
  elementos: ['Fe', 'S'],
  compuesto: 'Sulfuro de hierro (FeS)',
  imagen: 'https://7cad390533514c32acc8-75d23ce06fcfaf780446d85d50c33f7b.ssl.cf6.rackcdn.com/sc/1686907293-normal-VD0819-1.jpg',
  definicion: 'Compuesto negro formado por hierro y azufre, presente en minerales.',
  curioso: 'Se forma en reacciones de laboratorio con olor a huevo podrido.'
},
{
  elementos: ['Na', 'O'],
  compuesto: 'Óxido de sodio (Na₂O)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2019/04/oxido-de-sodio.jpg',
  definicion: 'Compuesto blanco que reacciona con agua para formar hidróxido de sodio.',
  curioso: 'Es altamente reactivo y se usa en síntesis química.'
},
{
  elementos: ['Cl', 'C'],
  compuesto: 'Tetracloruro de carbono (CCl₄)',
  imagen: 'https://www.shutterstock.com/image-vector/carbon-tetrachloride-ccl4-structural-chemical-600w-1696837474.jpg',
  definicion: 'Líquido incoloro usado como disolvente y en extintores antiguos.',
  curioso: 'Es tóxico y su uso está restringido por razones ambientales.'
},
{
  elementos: ['H', 'S'],
  compuesto: 'Sulfuro de hidrógeno (H₂S)',
  imagen: 'https://img.freepik.com/fotos-premium/formula-molecular-sulfuro-hidrogeno_698953-14232.jpg',
  definicion: 'Gas incoloro con olor a huevo podrido, formado por hidrógeno y azufre.',
  curioso: 'Es venenoso en altas concentraciones pero también se produce en el cuerpo humano.'
},
{
  elementos: ['Ca', 'S'],
  compuesto: 'Sulfuro de calcio (CaS)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2020/02/Calcium-sulfide-3D-ionic.jpg',
  definicion: 'Sólido blanco usado en luminiscencia y pigmentos.',
  curioso: 'Puede emitir luz tras ser expuesto a radiación.'
},
{
  elementos: ['Mg', 'S'],
  compuesto: 'Sulfuro de magnesio (MgS)',
  imagen: 'https://www.molinosycia.com/wp-content/uploads/2020/11/molinos-y-cia-productos-fertilizantes-hidrosolubles-sulfato-de-magnesio-heptahidratado-1.png',
  definicion: 'Compuesto blanco usado en cerámica y materiales luminiscentes.',
  curioso: 'Se descompone fácilmente en presencia de humedad.'
},
{
  elementos: ['Al', 'S'],
  compuesto: 'Sulfuro de aluminio (Al₂S₃)',
  imagen: 'https://structimg.guidechem.com/6/18/8357.png',
  definicion: 'Sólido blanco que reacciona con agua liberando gas H₂S.',
  curioso: 'Se usa en síntesis química y semiconductores.'
},
{
  elementos: ['K', 'S'],
  compuesto: 'Sulfuro de potasio (K₂S)',
  imagen: 'https://structimg.guidechem.com/9/21/8420.png',
  definicion: 'Sal blanca que reacciona con agua formando hidróxido y H₂S.',
  curioso: 'Es altamente soluble y se usa en procesos industriales.'
},
{
  elementos: ['Zn', 'Cl'],
  compuesto: 'Cloruro de zinc (ZnCl₂)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2020/04/ZnCl2.jpg',
  definicion: 'Sal blanca usada como fundente en soldadura y en baterías.',
  curioso: 'Es higroscópico y se disuelve fácilmente en agua.'
},
{
  elementos: ['Cu', 'Cl'],
  compuesto: 'Cloruro de cobre (CuCl₂)',
  imagen: 'https://heegermaterials.com/8674-large_default/copperii-chloride-cucl2-cas-10125-13-0.jpg',
  definicion: 'Cristales verdes usados como fungicida y en pigmentos.',
  curioso: 'Produce una llama azul verdosa al quemarse.'
},

{
  elementos: ['Li', 'Cl'],
  compuesto: 'Cloruro de litio (LiCl)',
  imagen: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Lithium-chloride-3D-ionic.png',
  definicion: 'Sal blanca formada por litio y cloro, usada en aire acondicionado y cerámica.',
  curioso: 'Es altamente higroscópico y se disuelve fácilmente en agua.'
},
{
  elementos: ['Ba', 'O'],
  compuesto: 'Óxido de bario (BaO)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2019/11/BaO.jpg',
  definicion: 'Sólido blanco usado en catálisis y fabricación de vidrio.',
  curioso: 'Reacciona con agua formando hidróxido de bario.'
},
{
  elementos: ['Zn', 'O'],
  compuesto: 'Óxido de zinc (ZnO)',
  imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Zinc_oxide.jpg',
  definicion: 'Polvo blanco usado en cosméticos, protectores solares y cerámica.',
  curioso: 'Tiene propiedades antibacterianas y se usa en pomadas para la piel.'
},
{
  elementos: ['Cu', 'S'],
  compuesto: 'Sulfuro de cobre (CuS)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2019/06/sulfuro-de-cobre-1.jpg',
  definicion: 'Mineral negro usado en minería y semiconductores.',
  curioso: 'Es uno de los principales minerales de extracción de cobre.'
},
{
  elementos: ['Si', 'Cl'],
  compuesto: 'Tetracloruro de silicio (SiCl₄)',
  imagen: 'https://www.shutterstock.com/shutterstock/photos/1696831507/display_1500/stock-vector-silicon-tetrachloride-sicl-structural-chemical-formula-and-molecule-model-chemistry-education-1696831507.jpg',
  definicion: 'Líquido incoloro usado en la producción de fibras ópticas.',
  curioso: 'Reacciona violentamente con agua, liberando ácido clorhídrico.'
},
{
  elementos: ['P', 'Cl'],
  compuesto: 'Tricloruro de fósforo (PCl₃)',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VOMlEh74vb9FrDAK6xx9bJe4fnWbOCHkdg&s',
  definicion: 'Líquido incoloro usado como reactivo en síntesis orgánica.',
  curioso: 'Es tóxico y debe manejarse con precaución en laboratorio.'
},
{
  elementos: ['Al', 'Br'],
  compuesto: 'Bromuro de aluminio (AlBr₃)',
  imagen: 'https://7cad390533514c32acc8-75d23ce06fcfaf780446d85d50c33f7b.ssl.cf6.rackcdn.com/sc/1615359059-normal-Aluminum%20Bromide.jpg',
  definicion: 'Compuesto blanco usado como catalizador en química orgánica.',
  curioso: 'Es sensible a la humedad y se descompone fácilmente.'
},
{
  elementos: ['K', 'Cl'],
  compuesto: 'Cloruro de potasio (KCl)',
  imagen: 'https://heka.mx/wp-content/uploads/2023/10/kelefusin-cloruro-potasio-10ml-50-ampolletas-pisa.jpg',
  definicion: 'Sal blanca usada como fertilizante y suplemento de potasio.',
  curioso: 'Se usa como sustituto de la sal común en dietas bajas en sodio.'
},
{
  elementos: ['Ca', 'Br'],
  compuesto: 'Bromuro de calcio (CaBr₂)',
  imagen: 'https://www.shutterstock.com/shutterstock/photos/1904252848/display_1500/stock-vector-calcium-bromide-cabr-molecule-simple-molecular-formula-consisting-of-calcium-bromine-elements-1904252848.jpg',
  definicion: 'Sal blanca usada en fluidos de perforación y medicina.',
  curioso: 'Es altamente soluble y se usa en soluciones salinas.'
},
{
  elementos: ['Mg', 'Br'],
  compuesto: 'Bromuro de magnesio (MgBr₂)',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnv-r5AcojOg-ser6NC_Ieu5mBzCJELMaOQQ&s',
  definicion: 'Sal blanca usada en síntesis química y medicina.',
  curioso: 'Se emplea como fuente de bromuro en reacciones orgánicas.'
},

{
  elementos: ['Li', 'Br'],
  compuesto: 'Bromuro de litio (LiBr)',
  imagen: 'https://m.media-amazon.com/images/I/61GXfTWlZdL._UF894,1000_QL80_.jpg',
  definicion: 'Sal blanca usada en aire acondicionado y medicina.',
  curioso: 'Es altamente higroscópico y se usa como desecante.'
},
{
  elementos: ['Ba', 'Br'],
  compuesto: 'Bromuro de bario (BaBr₂)',
  imagen: 'https://www.shutterstock.com/image-photo/babr2-barium-bromide-cas-10553318-260nw-2319445719.jpg',
  definicion: 'Sal blanca usada en fotografía y medicina.',
  curioso: 'Produce una llama verde brillante al quemarse.'
},
{
  elementos: ['Zn', 'Br'],
  compuesto: 'Bromuro de zinc (ZnBr₂)',
  imagen: 'https://7cad390533514c32acc8-75d23ce06fcfaf780446d85d50c33f7b.ssl.cf6.rackcdn.com/sc/1686729875-normal-BR1717-1.jpg',
  definicion: 'Compuesto usado como reactivo en síntesis orgánica.',
  curioso: 'Es soluble en agua y se usa en baterías.'
},
{
  elementos: ['Cu', 'Br'],
  compuesto: 'Bromuro de cobre (CuBr₂)',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_oyzjhPIWkhRDSDKdfHF-5tBwRR3i0-9sA&s',
  definicion: 'Cristales verdes usados en láseres y pigmentos.',
  curioso: 'Produce una llama azul verdosa al quemarse.'
},
{
  elementos: ['Si', 'Br'],
  compuesto: 'Tetrabromuro de silicio (SiBr₄)',
  imagen: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Silicon-tetrabromide-2D-A.png',
  definicion: 'Líquido incoloro usado en química orgánica.',
  curioso: 'Reacciona violentamente con agua, liberando ácido bromhídrico.'
},
{
  elementos: ['P', 'Br'],
  compuesto: 'Tribromuro de fósforo (PBr₃)',
  imagen: 'https://imgen4.guidechem.com/img/images/2024/5/8/0165603010.png',
  definicion: 'Líquido amarillo usado como reactivo en síntesis orgánica.',
  curioso: 'Es tóxico y debe manejarse con precaución.'
},
{
  elementos: ['Al', 'I'],
  compuesto: 'Yoduro de aluminio (AlI₃)',
  imagen: 'https://quimins.wordpress.com/wp-content/uploads/2018/10/yodo-y-aluminio.jpg?w=360',
  definicion: 'Compuesto blanco usado como catalizador.',
  curioso: 'Es sensible a la humedad y se descompone fácilmente.'
},
{
  elementos: ['K', 'F'],
  compuesto: 'Fluoruro de potasio (KF)',
  imagen: 'https://www.lifeder.com/wp-content/uploads/2019/01/455px-Potassium-fluoride-unit-cell-3D-ionic.jpg',
  definicion: 'Sal blanca usada en grabado de vidrio y síntesis química.',
  curioso: 'Es corrosiva y debe manejarse con cuidado.'
},
{
  elementos: ['Ca', 'F'],
  compuesto: 'Fluoruro de calcio (CaF₂)',
  imagen: 'https://am-material.com/wp-content/uploads/2024/05/CaF2-powder-1024x683.png',
  definicion: 'Mineral conocido como fluorita, usado en óptica y metalurgia.',
  curioso: 'Puede emitir luz bajo radiación ultravioleta.'
},
{
  elementos: ['Mg', 'F'],
  compuesto: 'Fluoruro de magnesio (MgF₂)',
  imagen: 'https://ecdn6.globalso.com/upload/p/612/image_product/2023-12/658d4a3093c9359481.jpg',
  definicion: 'Cristal transparente usado en óptica y recubrimientos antirreflectantes.',
  curioso: 'Es resistente a la corrosión y a la radiación UV.'
},

{
  elementos: ['Li', 'F'],
  compuesto: 'Fluoruro de litio (LiF)',
  imagen: 'https://www.altichem.es/FICHIERS/produit/10/img/fiche_produit_lithium_LiF.jpg',
  definicion: 'Cristal blanco usado en óptica y cerámica.',
  curioso: 'Es transparente a los rayos ultravioleta profundos.'
},
{
  elementos: ['Ba', 'F'],
  compuesto: 'Fluoruro de bario (BaF₂)',
  imagen: 'https://wavelength-oe.com/wp-content/uploads/Optical-Materials-IR-Materials-Barium-Fluoride.png',
  definicion: 'Cristal usado en óptica infrarroja y láseres.',
  curioso: 'Tiene propiedades luminiscentes y se usa en detectores.'
},
{
  elementos: ['Zn', 'F'],
  compuesto: 'Fluoruro de zinc (ZnF₂)',
  imagen: 'https://ecdn6.globalso.com/upload/p/2347/image_other/2024-11/zinc-fluoride-1.jpg',
  definicion: 'Compuesto blanco usado en cerámica y vidrios especiales.',
  curioso: 'Es menos soluble que otros fluoruros metálicos.'
},
{
  elementos: ['Cu', 'F'],
  compuesto: 'Fluoruro de cobre (CuF₂)',
  imagen: 'https://thumbs.dreamstime.com/b/fluoruro-de-cobre-compuesto-qu%C3%ADmico-n%C3%BAmero-cas-301125915.jpg',
  definicion: 'Cristal azul usado en química inorgánica.',
  curioso: 'Es corrosivo y se descompone con humedad.'
},
{
  elementos: ['Si', 'F'],
  compuesto: 'Tetrafluoruro de silicio (SiF₄)',
  imagen: 'https://imgen4.guidechem.com/img/images/2024/9/26/0110004494.jpg',
  definicion: 'Gas incoloro usado en grabado de vidrio.',
  curioso: 'Reacciona con agua formando ácido fluorosilícico.'
},
{
  elementos: ['P', 'F'],
  compuesto: 'Pentafluoruro de fósforo (PF₅)',
  imagen: 'https://imgen4.guidechem.com/img/images/2024/9/26/0104605627.jpg',
  definicion: 'Gas tóxico usado como reactivo en química orgánica.',
  curioso: 'Tiene geometría molecular trigonal bipiramidal.'
},
{
  elementos: ['Al', 'F'],
  compuesto: 'Fluoruro de aluminio (AlF₃)',
  imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbbQ7zqX4xtiBn3mRK7heJBzG6ybgPXkQIw&s',
  definicion: 'Sólido blanco usado en la producción de aluminio.',
  curioso: 'Reduce el punto de fusión de la alúmina en electrólisis.'
},
{
  elementos: ['K', 'I'],
  compuesto: 'Yoduro de potasio (KI)',
  imagen: 'https://adbaquim.com/media/com_eshop/products/resized/yoduro-de-potasio-500x500.jpg',
  definicion: 'Sal blanca usada en medicina y fotografía.',
  curioso: 'Protege la tiroides en emergencias nucleares.'
},
{
  elementos: ['Ca', 'I'],
  compuesto: 'Yoduro de calcio (CaI₂)',
  imagen: 'https://m.media-amazon.com/images/I/51cTBX0wtTL._AC_UF1000,1000_QL80_.jpg',
  definicion: 'Sal blanca usada en medicina y síntesis química.',
  curioso: 'Es soluble en agua y se usa como suplemento mineral.'
},
{
  elementos: ['Mg', 'I'],
  compuesto: 'Yoduro de magnesio (MgI₂)',
  imagen: 'https://7cad390533514c32acc8-75d23ce06fcfaf780446d85d50c33f7b.ssl.cf6.rackcdn.com/sc/1740736360-normal-23-magnesium-iodide-mgi2-cas10377-58-9.jpg',
  definicion: 'Sal blanca usada en química orgánica.',
  curioso: 'Se descompone fácilmente en presencia de humedad.'
}
];



const estilosPorTipo = {
  'Metal alcalino': { backgroundColor: '#ADD8E6' },
  'Metal alcalinotérreo': { backgroundColor: '#B0E0E6' },
  'Metal de transición': { backgroundColor: '#D8BFD8' },
  'No metal': { backgroundColor: '#FFFFE0' },
  'Gas noble': { backgroundColor: '#FFDAB9' },
  'Metaloide': { backgroundColor: '#98FB98' },
  'Halógeno': { backgroundColor: '#FFB6C1' },
  'Post-metal': { backgroundColor: '#E6E6FA' }
};

const getPosicion = (grupo, periodo) => {
  const tamaño = 50;
  const margen = 8;
  return {
    top: (periodo - 1) * (tamaño + margen),
    left: OFFSET_X + (grupo - 1) * (tamaño + margen)
  };
};

const FichaMovil = ({ el, onPress, agregarAReaccion, zonaRef }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        const handle = findNodeHandle(zonaRef.current);
        if (handle) {
          UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            const dentroZona =
              gesture.moveY > pageY &&
              gesture.moveY < pageY + height &&
              gesture.moveX > pageX &&
              gesture.moveX < pageX + width;

            if (dentroZona) {
              agregarAReaccion(el);
              pan.setValue({ x: 0, y: 0 });
            }
          });
        }
      }
    })
  ).current;

  const posicion = getPosicion(el.grupo, el.periodo);
  const estilo = estilosPorTipo[el.tipo] || { backgroundColor: '#ccc' };

  return (    
    <Animated.View
      style={[
        styles.ficha,
        estilo,
        {
          position: 'absolute',
          top: posicion.top,
          left: posicion.left,
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }
      ]}
      {...responder.panHandlers}
    >
      <TouchableOpacity onPress={() => onPress(el)}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.simbolo}>{el.simbolo}</Text>
          <Text style={styles.numero}>{el.numero}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Laboratorio({navigation}) {

  const [elementoActivo, setElementoActivo] = useState(null);
  const [fichasEnZona, setFichasEnZona] = useState([]);
  const [combinacionActiva, setCombinacionActiva] = useState(null);
  const [mostrarBotonCombinar, setMostrarBotonCombinar] = useState(false);
  const zonaRef = useRef(null);

  const agregarAReaccion = (ficha) => {
  setFichasEnZona(prev => {
    const yaEsta = prev.find(f => f.simbolo === ficha.simbolo);
    if (yaEsta || prev.length >= 2) return prev;
    const nuevas = [...prev, ficha];
    if (nuevas.length === 2) setMostrarBotonCombinar(true);
    return nuevas;
  });
};

const removerDeReaccion = (ficha) => {
  setFichasEnZona(prev => {
    const nuevas = prev.filter(f => f.simbolo !== ficha.simbolo);
    if (nuevas.length < 2) setMostrarBotonCombinar(false);
    return nuevas;
  });
};

  const combinarFichas = () => {
    const claves = fichasEnZona.map(f => f.simbolo).sort();
    const match = combinaciones.find(c =>
      c.elementos.sort().join(',') === claves.join(',')
    );
    if (match) {
      setCombinacionActiva(match);
    } else {
      alert('No hay reacción posible entre estos elementos.');
    }
    setMostrarBotonCombinar(false);
  };

  const resetearZona = () => {
    setFichasEnZona([]);
    setCombinacionActiva(null);
    setMostrarBotonCombinar(false);
  };

  return (
    <PantallaBase navigation={navigation}>
    
      <Text style={styles.titulo}>Tabla Periódica Interactiva</Text>

      <ScrollView horizontal contentContainerStyle={styles.tabla}>
        {elementos.map((el) => (
          <FichaMovil
            key={el.simbolo}
            el={el}
            onPress={setElementoActivo}
            agregarAReaccion={agregarAReaccion}
            zonaRef={zonaRef}
          />
        ))}

        
      </ScrollView>

     <View ref={zonaRef}>
  <View style={styles.zonaReaccion}>
    <Text style={styles.zonaTexto}>Zona de reacción (arrastra aquí)</Text>
    
    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
      {fichasEnZona.map((el, index) => (
        <TouchableOpacity 
          key={index}
          onPress={() => {
            setElementoActivo(el);
            removerDeReaccion(el);
          }} 
          style={[styles.fichaZona, estilosPorTipo[el.tipo] || { backgroundColor: '#ccc' }]}
        >
          <Text style={styles.simbolo}>{el.simbolo}</Text>
        </TouchableOpacity>
      ))}
    </View>
    
    {mostrarBotonCombinar && (
      <TouchableOpacity onPress={combinarFichas} style={styles.botonCombinar}>
        <Text style={styles.botonTexto}>⚗️ Combinar elementos</Text>
      </TouchableOpacity>
    )}

    {fichasEnZona.length > 0 && (
      <Text style={styles.instruccion}>
        💡 Toca cualquier elemento para devolverlo
      </Text>
    )}
  </View>
</View>

      {/* Modal de ficha */}
      <Modal visible={!!elementoActivo} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            {elementoActivo && (
              <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.modalSimbolo}>{elementoActivo.simbolo}</Text>
                <Text style={styles.modalNombre}>{elementoActivo.nombre}</Text>
                <Text style={styles.modalNumero}>N° {elementoActivo.numero}</Text>
                <Image source={{ uri: elementoActivo.imagen }} style={styles.modalImagen} />
                <Text style={styles.modalDefinicion}>{elementoActivo.definicion}</Text>
                <Text style={styles.modalCurioso}>💡 {elementoActivo.curioso}</Text>
                <TouchableOpacity onPress={() => setElementoActivo(null)}>
                  <Text style={styles.cerrar}>Cerrar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de combinación */}
      <Modal visible={!!combinacionActiva} transparent animationType="fade">
        <View style={styles.modalFondo}>
          <View style={styles.modalCompuesto}>
            <Text style={styles.compNombre}>{combinacionActiva?.compuesto}</Text>
            <Image source={{ uri: combinacionActiva?.imagen }} style={styles.compImagen} />
            <Text style={styles.compDef}>{combinacionActiva?.definicion}</Text>
            <Text style={styles.compCurioso}>💡 {combinacionActiva?.curioso}</Text>
            <TouchableOpacity onPress={resetearZona}>
              <Text style={styles.cerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </PantallaBase>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  tabla: {
    minWidth: 1200, // ajusta según el ancho total de tu tabla
    height: 600,
    paddingBottom: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  ficha: {
    width: 50,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  simbolo: {
    fontWeight: 'bold',
    fontSize: 14
  },
  numero: {
    fontSize: 10
  },
  zonaReaccion: {
    width: '90%',
    minHeight: 100,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00796b',
    padding: 10
  },
  zonaTexto: {
    fontSize: 12,
    marginBottom: 6,
    color: '#00796b'
  },
  fichaZona: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333'
  },
  botonCombinar: {
    backgroundColor: '#00796b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContenido: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center'
  },
  modalSimbolo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  modalNombre: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  modalNumero: {
    fontSize: 14,
    marginBottom: 8
  },
  modalImagen: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginBottom: 10
  },
  modalDefinicion: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
    color: '#444'
  },
  modalCurioso: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
    marginBottom: 10
  },
  modalCompuesto: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center'
  },
  compNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6
  },
  compImagen: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginBottom: 10
  },
  compDef: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
    color: '#444'
  },
  compCurioso: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
    marginBottom: 10
  },
  cerrar: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 10
  }
});