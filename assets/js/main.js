// Add header
document.addEventListener('DOMContentLoaded', function () {
  fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))
})

// Vue

var app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Red Grapes',
        short_text: 'Sweet and juicy red grapes.',
        image: 'assets/images/red_grapes.jpg',
        desc: 'Delicious red grapes, perfect for snacking or making wine.',
        characteristics: {
          resistance: 'HR: ToMV:0-2; Fol: 1,2; Ve/Vd; IR: TYLCV',
          plant: [
            'Strong vigor that provides good leaf coverage.',
            'Very high productivity with good fruit setting.',
            'Early matured variety.'
          ],
          fruit: [
            'Long shelf life on plant and post harvest.',
            'Nice shiny attractive deep red color.',
            'Average fruit size: 140 – 160 grams.'
          ],
          cycle: ['Spring', 'Fall', 'Winter'],
          color: 'Red'
        }
      },
      {
        id: 2,
        title: 'Green Grapes',
        short_text: 'Crisp and refreshing green grapes.',
        image: 'assets/images/green_grapes.jpg',
        desc: 'Green grapes with a perfect balance of sweetness and tartness.',
        characteristics: {
          resistance: 'HR: ToMV:0-2; Fol: 1,2; Ve/Vd; IR: TYLCV',
          plant: [
            'Moderate vigor with compact growth.',
            'Good disease resistance.',
            'Late matured variety.'
          ],
          fruit: [
            'Firm texture with excellent shelf life.',
            'Bright green skin with natural shine.',
            'Average fruit size: 120 – 140 grams.'
          ],
          cycle: ['Summer', 'Fall'],
          color: 'Green'
        }
      },
      {
        id: 3,
        title: 'Black Grapes',
        short_text: 'Rich and flavorful black grapes.',
        image: 'assets/images/black_grapes.jpg',
        desc: 'Ideal for making juice, jam, or enjoying fresh.',
        characteristics: {
          resistance: 'HR: ToMV:0-2; Fol: 1,2; Ve/Vd; IR: TYLCV',
          plant: [
            'Strong vines with good adaptability.',
            'High resistance to common pests.',
            'Produces large clusters.'
          ],
          fruit: [
            'Dark purple to black skin.',
            'Juicy with a deep, rich flavor.',
            'Average fruit size: 130 – 150 grams.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Black'
        }
      },
      {
        id: 4,
        title: 'Sauvignon Blanc',
        short_text: 'A crisp and aromatic white grape.',
        image: 'assets/images/sauvignon_blanc.jpg',
        desc: 'Known for its refreshing acidity and flavors of green apple, lime, and tropical fruit.',
        characteristics: {
          resistance: 'HR: Powdery Mildew; IR: Botrytis',
          plant: [
            'Moderate vigor with controlled growth.',
            'Good resistance to fungal diseases.',
            'Thrives in cool climates.'
          ],
          fruit: [
            'Pale green to golden skin.',
            'High acidity with fresh citrus notes.',
            'Average fruit size: 110 – 130 grams.'
          ],
          cycle: ['Fall', 'Winter'],
          color: 'Light Green'
        }
      },
      {
        id: 5,
        title: 'Pinot Noir',
        short_text: 'A delicate and elegant red grape.',
        image: 'assets/images/pinot_noir.jpg',
        desc: 'Famous for its light body, bright acidity, and flavors of red berries and earthy notes.',
        characteristics: {
          resistance: 'HR: Downy Mildew; IR: Phylloxera',
          plant: [
            'Compact vines with small leaves.',
            'Requires careful pruning.',
            'Sensitive to climate variations.'
          ],
          fruit: [
            'Thin skin with a delicate texture.',
            'Flavors of cherry, raspberry, and earthy tones.',
            'Average fruit size: 100 – 120 grams.'
          ],
          cycle: ['Spring', 'Fall'],
          color: 'Ruby Red'
        }
      }
    ],
    product: null,
    cart: [],
    contactFields: {
      name: '',
      companyName: '',
      position: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      youAre: 'seedProducer',
      other: '',
      interest: '',
      captcha: ''
    },
    orderSummary: null,
    orderProducts: []
  },
  mounted: function () {
    const prodId = window.localStorage.getItem('prod')
    if (prodId) {
      this.product = this.products.find(p => p.id == prodId)
    }
    this.getCart()
  },
  methods: {
    addItem: function (id) {
      window.localStorage.setItem('prod', id)
    },

    addToCartAndGo () {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.includes(this.product.id)) {
        cart.push(this.product.id)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      window.location.href = 'contact-us.html'
    },

    getCart () {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || []
      this.cart = this.products.filter(p => cartIds.includes(p.id))
    },

    removeFromCart (id) {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || []
      cartIds = cartIds.filter(pId => pId !== id)
      localStorage.setItem('cart', JSON.stringify(cartIds))
      this.getCart()
    },

    makeOrder () {
      this.contactFields = {
        name: this.$refs.name.value,
        companyName: this.$refs.companyName.value,
        position: this.$refs.position.value,
        city: this.$refs.city.value,
        country: this.$refs.country.value,
        phone: this.$refs.phone.value,
        email: this.$refs.email.value,
        youAre: this.$refs.youAre.value,
        other: this.$refs.other.value,
        interest: this.$refs.interest.value,
        captcha: this.$refs.captcha.value
      }

      if (!this.contactFields.name || !this.contactFields.email) {
        alert('Please fill in the required fields: Name and Email.')
        return
      }
      if (this.cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.')
        return
      }

      this.orderProducts = [...this.cart]

      this.cart = []
      localStorage.removeItem('cart')

      this.orderSummary = { ...this.contactFields }

      this.$refs.contactForm.reset()
    }
  }
})
