import './scss/index.scss'
const _ = require('lodash');
const dataJSON = require('@/static/data.json');

const data = JSON.parse(JSON.stringify(dataJSON))

const app = () => {
  const renderFilter = () => {
    // группировка по категориям для вывода типов брендов
    const filters = _.groupBy(data, item => item.Manufacturer_category)
    // надо сделать массивы брендов, разбитые по категориям
    const brandslist = {}
    for (const element in filters) {
      if (element) {
        brandslist[element] = filters[element].map(item => ({'id': item.Manufacturer_ID, 'name': item.Manufacturer}))
      }
    }
    // надо удалить дубликаты
    const brands = {}
    for (const element in brandslist) {
      if (element) {
      brands[element] = brandslist[element].filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id && t.name === value.name
        ))
      )
      }
    }
    let $filters = ``
    for (const element in brands) {
      if (element) {
        let arr = ``
        for (const item in brands[element]) {
          if (item) {
            arr += `
                <div class="instance__item">
                  <label for="cbox-${brands[element][item].id}">
                    <input 
                      type="checkbox" id="cbox-${brands[element][item].id}" 
                      value=""
                    ><span>${brands[element][item].name}</span>
                  </label>
                </div>
            `
          }
        }
        $filters += `
          <div class='filter__item'>
            <div class='instance'>
              <div class='instance__header'>${element}</div>
                <div class="instance__content">
                  ${arr}
                </div>
              </div>   
            </div>
          </div>`
      }
    }
    document.getElementById('js-filter').innerHTML = $filters
  }

  renderFilter()
}

app()


