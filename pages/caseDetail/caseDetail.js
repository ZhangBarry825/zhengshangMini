// pages/caseDetail/caseDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMenuShow: false,
        articleDetail: {}
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
    goToCaseDetail(item) {
        //console.log(item, 123)
        let groupName = item.currentTarget.dataset.item.groupName
        let caseName = item.currentTarget.dataset.item.caseName

        let path = '/pages/caseDetail/caseDetail?caseName=' + caseName + '&groupName=' + groupName
        //console.log(path, 123)
        app.navigateTo(path)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options, 123)
        this.setData({
            caseName: options.caseName,
            groupName: options.groupName
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this
        // customerCase/customerCasepageDetail
        app.fetchData('/customerCase/customerCasepageDetail', 'get', {
            caseName: that.data.caseName,
            caseGroupName: that.data.groupName
        }).then(res => {
            //console.log(res, 123)
            that.setData({
                articleDetail: res.data
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