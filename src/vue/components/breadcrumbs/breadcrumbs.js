export default {
  props: ['items_list'],
  data: () => ({
    items: [
      {
        text: 'Главная',
        name: 'home',
        disabled: false,
      }
    ]
  }),
  beforeMount: function (){
    const items = this.items;

    this.items_list.forEach( function(element, index) {
      items.push(element)
    });
  }
}