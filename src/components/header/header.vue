<template>
	<div class="header">
		<div class="content-warpper">
			<div class="avater">
				<img :src="seller.avatar" width="64" height="64" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}
				</div>
				<div v-if="seller.supports" class="suppot">
					<span class="icon" :class="classMap[seller.supports[1].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>

			</div>
			<div v-if="seller.supports" class="support-count" @click="showdetall">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-warpper">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar"width="100%" height="100%"/>
		</div>
		<transition name="fade" mode ='out-in'>
		<div class="detall" v-show="detallshow" @click="showdetall">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-warpper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>	
					<ul v-if="seller.supports" class="supports">
						<li class="supports-item" v-for="(item,index) in seller.supports">
							<span class="icon" :class="classMap[seller.supports[index].type]"></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>			
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click.stop="showdetall">
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	export default {
	name: 'v-header',
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			detallshow: false
		}
	},
	methods: {
		showdetall() {
			this.detallshow = !this.detallshow
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'specia']
	},
	components: {
		star
	}
	}
</script>

<style lang="stylus" scoped="scoped">
@import "../../common/styles/mixin.styl"
.header
	position: relative
	overflow:hidden
	color: #fff
	background:rgba(7, 17, 27, 0.5)
	.content-warpper
		font-size:0
		padding:24px 12px 18px 24px
		position: relative
	.avater
		display:inline-block
		vertical-align:top
		img
			border-radius: 2px
	.content
		display:inline-block
		margin-left:16px
		font-size:14px
	.title
		margin:2px 0 8px
	.brand
		display:inline-block
		vertical-align:top
		width:30px
		height:18px
		bg-image('brand')
		background-size: 30px 18px
		background-repeat: no-repeat
	.name
		margin-left:6px
		font-size:16px
		line-height:18px
		font-weight:bold
	.description
		margin-bottom: 10px
		line-height: 12px
		font-size: 12px
	.support
	.icon
		display:inline-block
		width: 12px
		height: 12px
		margin-right: 4px
		background-size: 12px 12px
		background-repeat: no-repeat
		&.decrease
			bg-image('decrease_1')
		&.discount
			bg-image('discount_1')
		&.guarantee
			bg-image('guarantee_1')	
		&.invoice
			bg-image('invoice_1')	
		&.specia
			bg-image('special_1')
	.text
		line-height: 12px
		font-size: 12px
	.support-count
		position:absolute
		right: 12px
		bottom: 14px
		padding: 0 8px
		height: 24px
		line-height: 24px
		border-radius: 14px
		background: rgba(0, 0, 0, 0.2)
		text-align: center
		.count
			font-size: 10px
			vertical-align:top
		.icon-keyboard_arrow_right
			margin-left: 2px
			line-height: 24px
			font-size: 10px
	.bulletin-warpper
		position:relative
		height: 28px
		line-height: 28px
		padding: 0 22px
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
		word-spacing: -4px
		background: rgba(7, 17, 27, 0.2)
		.bulletin-title
			vertical-align: top
			margin-top: 8px
			display: inline-block
			word-spacing:0
			width: 22px
			height: 12px
			bg-image('bulletin')
			background-size: 22px 12px
			background-repeat: no-repeat
		.bulletin-text
			margin: 0 4px
			font-size: 10px
		.icon-keyboard_arrow_right
			position: absolute
			font-size: 10px
			right: 12px
			top: 8px
	.background
		position: absolute
		top: 0
		left: 0
		z-index:-1
		width: 100%
		height:100%
		filter: blur(10px)
	.detall
		position: fixed
		top: 0
		left: 0
		z-index: 100
		width: 100%
		height: 100%
		overflow: auto
		background: rgba(7, 17, 27, 0.8)
		transition: all 0.5s
		backdrop-filter: blur(10px)
		&.fade-enter-active
			opacity: 1
			background: rgba(7, 17, 27, 0.8)
		&.fade-leave-active, &.fade-enter
			opacity: 0
			background: rgba(7, 17, 27, 0)
		.detail-wrapper
			width: 100%
			min-height: 100%
			.detail-main
				margin-top:64px
				padding-bottom: 64px
				.name
					line-height: 16px
					text-align: center
					font-size: 16px
					font-weight: 700
				.star-warpper
					margin-top: 18px
					padding: 2px 0
					text-align: center
				.title
					display:flex
					margin: 28px auto 24px auto
					width: 80%
				.line
					flex: 1
					position: relative
					top: -6px
					border-bottom: 1px solid rgba(255, 255, 255, 0.2)
				.text
					padding: 0 12px
					font-size: 14px
					font-weight: 700
				.supports
					width: 80%
					margin: 0 auto
				.bulletin
					width: 80%
					margin: 0 auto
					.content
						padding: 0 12px
						line-height: 24px
						font-size: 12px
					.supports-item
						padding: 0 12px
						margin-bottom: 12px
						word-spacing: -3px						
						&:last-child
							margin-bottom: 0
						.icon
							display: inline-block
							vertical-align: top
							width:16px
							height:16px
							margin-right: 6px
							word-spacing: 0
							background-size: 16px 16px
							background-repeat:no-repeat
							&.decrease
								bg-image('decrease_2')
							&.discount
								bg-image('discount_2')
							&.guarantee
								bg-image('guarantee_2')	
							&.invoice
								bg-image('invoice_2')	
							&.specia
								bg-image('special_2')
						.text
							line-height: 16px
							padding: 0
							font-size: 12px
		.detail-close
				position:relative
				width: 32px
				height 32px
				margin:-64px auto 0 
				clear:both
				font-size:32px
	
		
</style>