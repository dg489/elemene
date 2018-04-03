<template>
	<div class="cartcontrol">
	<transition name="fade">
		<div class="cart-decrsase" v-show="food.count>0" @click.stop="decrCart">
			<i class="icon-remove_circle_outline inner"></i>		
		</div>
	</transition><!--
		--><div class="cart-count" v-show="food.count>0">{{food.count}}</div><!--
		--><div class="cart-add" @click.stop="addCart">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count ++
				}
				this.$emit('cardadd', event.target)
			},
			decrCart() {
				if (this.food.count) {
					this.food.count --
				}
			}
		}
	}
</script>

<style lang="stylus">
	.cartcontrol
		.cart-decrsase
			display: inline-block
			padding: 6px
			transition: all .4s linear
			.inner
				display: inline-block
				font-size: 24px
				line-height: 24px
				color: rgb(0, 160, 220)
				transform: rotate(0)
			&.fade-enter-active
				opacity: 1
				transform: translate3d(0, 0, 0)
			&.fade-leave-active, &.fade-enter
				opacity: 0							
				transform: translate3d(24px, 0, 0)
				.inner				
					transform: rotate(180deg)
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			font-size: 10px
			text-align: center
			color: rgb(147, 153, 159)
		.cart-add
			display: inline-block
			padding: 6px
			font-size: 24px
			line-height: 24px
			color: rgb(0, 160, 220)	
</style>