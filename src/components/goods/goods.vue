<template>
	<div>
	  <div class="goods">
	 		<div class="menu-warpper" ref='menuwarpper'>
	 			<ul>
	 				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="_selectMenu(index,$event)">
	 					<span class="text border-1px">
	 						<span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
	 					</span>
	 				</li>
	 			</ul>
	 		</div>
	 		<div class="foods-warpper" ref='foodwarpper'>
	 			<ul>
	 				<li v-for="item in goods" class="food-list food-list-hook">
	 					<h1 class="title">{{item.name}}</h1>
	 					<ul>
	 						<li @click="_selectFoods(food,$event)" v-for="food in item.foods" class="food-item border-1px">
	 								<div class="icon">
	 									<img :src="food.icon" width="57" height="57" />
	 								</div>
	 								<div class="content">
	 									<h2 class="name">{{food.name}}</h2>
	 									<p class="dese">{{food.description}}</p>
	 									<div class="exter">
	 										<span class="count">月售：{{food.sellCount}}份</span><!--
	  						--><span>好评率：{{food.rating}}%</span>
	 									</div>
	 									<div class="price">
	 										<span class="now">￥{{food.price}}</span>
	 										<span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
	 									</div>
	 									<div class="cartcontrol-warpper">
	 										<cartcontrol :food='food' @cardadd='_drop' ></cartcontrol>
	 									</div>
	 								</div>
	 						</li>
	 					</ul>
	 				</li>
	 			</ul>
	 		</div>
	 		<shpocart :select-foods='selectFoods' :deliver-price='seller.deliveryPrice' :min-price='seller.minPrice' ref='shopcart' ></shpocart>
	  </div>
		<food :food="selectedFood" ref='food' @cardadd = '_drop'></food>
	 </div>
</template>

<script>
import axios from 'axios'
import BetScoll from 'better-scroll'
import shpocart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'
const ERR_OK = 0
export default {
	props: {
		seller: {
			Object
		}
	},
	data () {
    return {
			goods: [],
			listheight: [],
			scrollY: 0,
			selectedFood: {}
    }
  },
  components: {
		shpocart,
		cartcontrol,
		food
  },
  computed: {
		currentIndex() {
			for (let i = 0; i < this.listheight.length; i++) {
				let lenght1 = this.listheight[i]
				let length2 = this.listheight[i + 1]
				if (!length2 || (this.scrollY >= lenght1 && this.scrollY < length2)) {
					return i
				}
			}
			return 0
		},
		selectFoods() {
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
  methods: {
		_initscoll() {
			if (!this.menuScroll) {
				this.menuScroll = new BetScoll(this.$refs.menuwarpper, {
				click: true
				})
			} else {
				this.menuScroll.refresh()
			}
			if (!this.foodScroll) {
				this.foodScroll = new BetScoll(this.$refs.foodwarpper, {
					click: true,
					probeType: 3
				})
			} else {
				this.foodScroll.refresh()
			}
		this.foodScroll.on('scroll', (pos) => {
			this.scrollY = Math.abs(Math.round(pos.y))
		})
		},
		_calculateHeight() {
			let footList = this.$refs.foodwarpper.getElementsByClassName('food-list-hook')
			let height = 0
			let foodlength = footList.length
			this.listheight.push(height)
			for (let i = 0; i < foodlength; i++) {
				let item = footList[i]
				height += item.clientHeight
				this.listheight.push(height)
			}
		},
		_selectMenu(index, event) {
			if (!event._constructed) {
				return
			}
			let footList = this.$refs.foodwarpper.getElementsByClassName('food-list-hook')
			let el = footList[index]
			this.foodScroll.scrollToElement(el, 300)
		},
		_selectFoods(food, event) {
			if (!event._constructed) {
				return
			}
			this.selectedFood = food
			this.$refs.food.show()
		},
		_drop(tag) {
//			异步执行动画
			this.$nextTick(() => {
				this.$refs.shopcart.drop(tag)
			})
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'specia']
		axios.get('/api/goods').then((rep) => {
			if (rep.data.errno === ERR_OK) {
				this.goods = rep.data.data
				this.$nextTick(() => {
				this._initscoll()
				this._calculateHeight()
				})
			}
		})
  }
}
</script>
<style lang="stylus" rel="stylusheet/stylus">
	@import "../../common/styles/mixin.styl"
	.goods
		position:absolute
		top: 174px
		bottom: 46px
		width: 100%
		display:flex
		overflow:hidden
		.menu-warpper
			flex:0 0 80px
			text-align:center
			width: 80px
			background: #f3f5f7
			.menu-item
				display:table
				height: 54px
				width: 56px
				line-height: 14px
				padding: 0 12px
				&.current
					position:relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none()
			.icon
				display:inline-block
				vertical-align: top
				width:12px
				height:12px
				margin-right: 2px
				word-spacing: 0
				background-size: 12px 12px
				background-repeat:no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image('discount_3')
				&.guarantee
					bg-image('guarantee_3')	
				&.invoice
					bg-image('invoice_3')	
				&.specia
					bg-image('special_3')
			.text
				width: 56px
				vertical-align: middle
				display:table-cell
				font-size: 12px
				border-1px(rgba(7, 17, 27, 0.1))
		.foods-warpper
				flex: 1
				.title
					padding-left: 14px
					height: 26px
					line-height: 26px
					border-left: 2px solid #d9dde1
					color: rgb(147, 153, 159)
					background: #f3f5f7
					font-size: 12px
				.food-item
					display: flex
					margin: 18px
					padding-bottom: 18px
					border-1px(rgba(7, 17, 27, 0.1))
					&:last-child
						margin-bottom: 0
						border-none()
					.icon
						flex: 0 0 57px
						margin-right: 10px
					.content
						flex: 1
						.name
							margin: 2px 0 8px 
							height: 14px
							line-height: 14px
							font-size: 14px
							color: rgb(7, 17, 27)
						.dese,.exter
							font-size: 10px
							color: rgb(147, 153, 159)
						.dese
							margin-bottom: 8px
							line-height: 12px
						.exter
							line-height: 10px
							.count
								margin-right: 12px
						.price
							font-weight: 700
							line-height: 24px
							.now
								margin-right: 8px
								font-size: 14px
								color: rgb(240, 20, 20)
							.old
								text-decoration: line-through
								font-size: 10px
						.cartcontrol-warpper
							position: absolute
							right: 0
							bottom: 12px
							
</style>
