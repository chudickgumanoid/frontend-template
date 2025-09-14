import { cloneDeep } from "lodash";

export function createPrototypeObject(
  prototypes,
  initialProperties,
  modificator = (obj) => obj
) {
  const _initialState = Symbol("initialState");

  // Если prototypes не является массивом, оборачиваем его в массив
  if (!Array.isArray(prototypes)) {
    prototypes = [prototypes];
  }

  // добавляем метод reset в первый прототип для возврата стэйта к начальному состоянию из локального  реестра   Symbol
  Object.defineProperty(prototypes[0], "reset", {
    value() {
      if (!this.isInitial) {
        Object.assign(this, cloneDeep(this[_initialState]));
        // TODO: Надо придумать как при такой реализации вытаскивать имя обьетка
        console.log("Object reset to initial state:");

        // TODO: Если в прототипе есть метод initialize он будет вызван
        if (typeof this.initialize === "function") {
          this.initialize();
        }
      }
    },
    enumerable: true,
  });
  // Создаем пустой объект, объединяя все прототипы
  const obj = Object.create(Object.assign({}, ...prototypes));

  modificator(obj);
  obj[_initialState] = cloneDeep(initialProperties);
  // Инициализируем свойства из initialProperties
  Object.assign(obj, initialProperties);

  return obj;
}
