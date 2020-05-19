// pages/newsDetail/newsDetail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
/**
 * WxParse.wxParse(bindName , type, data, target,imagePadding)
 * 1.bindName绑定的数据名(必填)
 * 2.type可以为html或者md(必填)
 * 3.data为传入的具体数据(必填)
 * 4.target为Page对象,一般为this(必填)
 * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
 */

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMenuShow: false,
        title: '',
        articalDetail: ''
    },
    showMenu() {
        let that = this
        this.setData({
            isMenuShow: !that.data.isMenuShow
        })
    },
    goHome() {
        app.goHome()
    },
    goToBusinessArea() {
        app.navigateTo('/pages/businessArea/businessArea')
    },
    goToNewsCenter() {
        app.navigateTo('/pages/newsCenter/newsCenter')
    },
    goToCases() {
        app.navigateTo('/pages/cases/cases?group=0')
    },
    goToAboutUs() {
        app.navigateTo('/pages/aboutUs/aboutUs')
    },
    goToContactUs() {
        app.navigateTo('/pages/contactUs/contactUs')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options.title, 123)
        this.setData({
            title: options.title
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this
        app.fetchData('/newsPageDetail/getNewsText', 'get', {
            title: that.data.title
        }).then(res => {
            // console.log(res.data,'getNewsText')
            WxParse.wxParse('article', 'html', res.data, that, 5);
            this.setData({
                articalDetail: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})