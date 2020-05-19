// pages/newsCenter/newsCenter.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMenuShow: false,
        nowGroup: 0,
        hasNextPage: false,
        pageNum: 1,
        pageSize: 6
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
    changeButton(data) {
        let nowGroup = data.currentTarget.dataset.index

        this.fetchCaseList(nowGroup)

        this.setData({
            nowGroup: nowGroup,
            pageNum: 1
        })
    },
    fetchCaseList(index) {
        let that = this
        app.fetchData('/newsPageDetail/getNewsPageDetail', 'get', {
            pageNum: 1,
            pageSize: that.data.pageSize,
            newsGroupName: that.data.groups[index]
        }).then(res => {
            if (res.data) {
                //console.log(res.data, 852)
                that.setData({
                    news: res.data.list,
                    hasNextPage: res.data.hasNextPage
                })
            } else {
                that.setData({
                    news: [],
                    hasNextPage: false
                })
            }

        })
    },
    goNewsDetail(data) {
        let title = data.currentTarget.dataset.title
        let path = '/pages/newsDetail/newsDetail?title=' + title
        app.navigateTo(path)
    },
    showMore() {
        let that = this
        //console.log("hasNextPage:", that.data.hasNextPage)
        if (!that.data.hasNextPage) {
            wx.showToast({
                title: '暂无更多',
                image: '../../static/images/info.png',
                duration: 2000,
                mask: false,
            })
        } else {
            app.fetchData('/newsPageDetail/getNewsPageDetail', 'get', {
                pageNum: that.data.pageNum + 1,
                pageSize: that.data.pageSize,
                caseGroupName: that.data.groups[that.data.nowGroup]
            }).then(res => {
                let news = that.data.news
                news = news.concat(res.data.list)
                that.setData({
                    news: news,
                    hasNextPage: res.data.hasNextPage,
                    pageNum: that.data.pageNum + 1,
                })
            })
        }
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
        let that = this
        app.fetchData('/newsPageDetail/getNewsGroupName', 'get').then(res => {
            //console.log(res.data, 500)
            that.setData({
                groups: res.data
            })
        })

        app.fetchData('/newsPageDetail/getNewsPageDetail', 'get').then(res => {
            //console.log(res.data, 500)
            that.setData({
                news: res.data.list,
                hasNextPage: res.data.hasNextPage
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