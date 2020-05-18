// pages/home/home.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        buttonSelected:false,
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3','demo-text-4'],
        indicatorDots: true, //是否显示面板指示点
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,

        nowGroup:0,

        services:[],
        customerCase:[],


        isMenuShow:false,
    },
    selectGroup(num){
        console.log(num.currentTarget)
        this.setData({
            nowGroup:parseInt(num.currentTarget.id)
        })
        wx.navigateTo({
            url: '/pages/cases/cases?group='+num.currentTarget.id,
        })

    },
    goToNewsDetail(item){

        let path='/pages/newsDetail/newsDetail?title='+item.currentTarget.dataset.item.title
        console.log(path,123)
        app.navigateTo(path)
    },
    goHome(){
        console.log('回到主页')
        app.goHome()
    },

    goToCases(){
        app.navigateTo('/pages/cases/cases')
    },
    goToCaseDetail(item){
        let groupName=this.data.customerCase[this.data.nowGroup].groupName
        let caseName=this.data.customerCase[this.data.nowGroup].caseGroup[item.currentTarget.id].caseName

        let path='/pages/caseDetail/caseDetail?caseName='+caseName+'&groupName='+groupName
        console.log(path,123)
        app.navigateTo(path)
    },
    showMenu(){
        let that=this
        this.setData({
            isMenuShow:!that.data.isMenuShow
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that=this
        app.fetchData('/index/getSlideshow','get').then(res=>{
            this.setData({
                background:res.data
            })
        })
        app.fetchData('/index/getOurService','get').then(res=>{
            this.setData({
                services:res.data
            })
        })
        app.fetchData('/index/getCustomerCase','get').then(res=>{
            console.log(res.data,123)
            this.setData({
                customerCase:res.data
            })
        })
        app.fetchData('/index/getOurAdvantages','get').then(res=>{
            console.log(res.data,'advantages')
            this.setData({
                advantages:res.data
            })
        })
        app.fetchData('/index/getNews','get').then(res=>{
            console.log(res.data,'getNews')
            this.setData({
                news:res.data.rightNews
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