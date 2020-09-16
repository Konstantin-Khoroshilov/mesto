import kazan from '../images/kazan.jpg';
import dagestan from '../images/dagestan.jpg';
import murmanskaya from '../images/murmanskaya-oblast.jpg';
import elbrus from '../images/elbrus.jpg';
import dombai from  '../images/dombai.jpg';
import karachaevsk from  '../images/karachaevsk.jpg';

//массив с названиями мест и ссылками на изображения
const cards = [
  {
    name: 'Казань',
    link: kazan,
    alt: 'Большой покрытый зеленью холм на берегу водоёма'
  },
  {
    name: 'Республика Дагестан',
    link: dagestan,
    alt: 'Вершина горы в облаках на фоне закатного неба'
  },
  {
    name: 'Мурманская область',
    link: murmanskaya,
    alt: 'Вид с вершины снежной горы на водную гладь и холмы у подножия'
  },
  {
    name: 'Гора Эльбрус',
    link: elbrus,
    alt: 'Холмистая местность с далёкой вершиной на фоне'
  },
  {
    name: 'Домбай',
    link: dombai,
    alt: 'Хвойная рощица на холме'
  },
  {
    name: 'Карачаево-Черкессия',
    link: karachaevsk,
    alt: 'Покрытые снегом горы с зелёными соснами на фоне голубого неба'
  }
];

export default cards;